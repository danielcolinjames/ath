"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _webpack = require("next/dist/compiled/webpack/webpack");
var _utils = require("../../../shared/lib/router/utils");
var _constants = require("../../../shared/lib/constants");
var _constants1 = require("../../../lib/constants");
const PLUGIN_NAME = 'MiddlewarePlugin';
const MIDDLEWARE_FULL_ROUTE_REGEX = /^pages[/\\]?(.*)\/_middleware$/;
class MiddlewarePlugin {
    constructor({ dev  }){
        this.dev = dev;
    }
    createAssets(compilation, assets, envPerRoute) {
        const entrypoints = compilation.entrypoints;
        const middlewareManifest = {
            sortedMiddleware: [],
            middleware: {
            },
            version: 1
        };
        for (const entrypoint of entrypoints.values()){
            const result = MIDDLEWARE_FULL_ROUTE_REGEX.exec(entrypoint.name);
            const location = result ? `/${result[1]}` : null;
            if (!location) {
                continue;
            }
            const files = entrypoint.getFiles().filter((file)=>!file.endsWith('.hot-update.js')
            ).map((file)=>// we need to use the unminified version of the webpack runtime,
                // remove if we do start minifying middleware chunks
                file.startsWith('static/chunks/webpack-') ? file.replace('webpack-', 'webpack-middleware-') : file
            );
            middlewareManifest.middleware[location] = {
                env: envPerRoute.get(entrypoint.name),
                files,
                name: entrypoint.name,
                page: location,
                regexp: (0, _utils).getMiddlewareRegex(location).namedRegex
            };
        }
        middlewareManifest.sortedMiddleware = (0, _utils).getSortedRoutes(Object.keys(middlewareManifest.middleware));
        assets[`server/${_constants.MIDDLEWARE_MANIFEST}`] = new _webpack.sources.RawSource(JSON.stringify(middlewareManifest, null, 2));
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory  })=>{
            const envPerRoute = new Map();
            compilation.hooks.finishModules.tap(PLUGIN_NAME, ()=>{
                const { moduleGraph  } = compilation;
                envPerRoute.clear();
                for (const [name, info] of compilation.entries){
                    if (name.match(_constants1.MIDDLEWARE_ROUTE)) {
                        const middlewareEntries = new Set();
                        const env = new Set();
                        const addEntriesFromDependency = (dep)=>{
                            const module = moduleGraph.getModule(dep);
                            if (module) {
                                middlewareEntries.add(module);
                            }
                        };
                        info.dependencies.forEach(addEntriesFromDependency);
                        info.includeDependencies.forEach(addEntriesFromDependency);
                        const queue = new Set(middlewareEntries);
                        for (const module of queue){
                            const { buildInfo  } = module;
                            if (buildInfo === null || buildInfo === void 0 ? void 0 : buildInfo.usingIndirectEval) {
                                // @ts-ignore TODO: Remove ignore when webpack 5 is stable
                                const error = new _webpack.webpack.WebpackError(`\`eval\` not allowed in Middleware ${name}`);
                                error.module = module;
                                compilation.warnings.push(error);
                            }
                            if ((buildInfo === null || buildInfo === void 0 ? void 0 : buildInfo.nextUsedEnvVars) !== undefined) {
                                for (const envName of buildInfo.nextUsedEnvVars){
                                    env.add(envName);
                                }
                            }
                            const connections = moduleGraph.getOutgoingConnections(module);
                            for (const connection of connections){
                                if (connection.module) {
                                    queue.add(connection.module);
                                }
                            }
                        }
                        envPerRoute.set(name, Array.from(env));
                    }
                }
            });
            const handler = (parser)=>{
                const flagModule = ()=>{
                    parser.state.module.buildInfo.usingIndirectEval = true;
                };
                parser.hooks.expression.for('eval').tap(PLUGIN_NAME, flagModule);
                parser.hooks.expression.for('Function').tap(PLUGIN_NAME, flagModule);
                parser.hooks.expression.for('global.eval').tap(PLUGIN_NAME, flagModule);
                parser.hooks.expression.for('global.Function').tap(PLUGIN_NAME, flagModule);
                const memberChainHandler = (_expr, members)=>{
                    if (!parser.state.module || parser.state.module.layer !== 'middleware') {
                        return;
                    }
                    if (members.length >= 2 && members[0] === 'env') {
                        const envName = members[1];
                        const { buildInfo  } = parser.state.module;
                        if (buildInfo.nextUsedEnvVars === undefined) {
                            buildInfo.nextUsedEnvVars = new Set();
                        }
                        buildInfo.nextUsedEnvVars.add(envName);
                        return true;
                    }
                };
                parser.hooks.callMemberChain.for('process').tap(PLUGIN_NAME, memberChainHandler);
                parser.hooks.expressionMemberChain.for('process').tap(PLUGIN_NAME, memberChainHandler);
            };
            normalModuleFactory.hooks.parser.for('javascript/auto').tap(PLUGIN_NAME, handler);
            normalModuleFactory.hooks.parser.for('javascript/dynamic').tap(PLUGIN_NAME, handler);
            normalModuleFactory.hooks.parser.for('javascript/esm').tap(PLUGIN_NAME, handler);
            // @ts-ignore TODO: Remove ignore when webpack 5 is stable
            compilation.hooks.processAssets.tap({
                name: 'NextJsMiddlewareManifest',
                // @ts-ignore TODO: Remove ignore when webpack 5 is stable
                stage: _webpack.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
            }, (assets)=>{
                this.createAssets(compilation, assets, envPerRoute);
            });
        });
    }
}
exports.default = MiddlewarePlugin;

//# sourceMappingURL=middleware-plugin.js.map