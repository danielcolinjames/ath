"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMiddlewareRegex = getMiddlewareRegex;
var _routeRegex = require("./route-regex");
function getMiddlewareRegex(normalizedRoute) {
    const result = (0, _routeRegex).getParametrizedRoute(normalizedRoute);
    if ('routeKeys' in result) {
        if (result.parameterizedRoute === '/') {
            return {
                groups: {
                },
                namedRegex: `^/(?!_next).*$`,
                re: new RegExp('^/(?!_next).*$'),
                routeKeys: {
                }
            };
        }
        return {
            groups: result.groups,
            namedRegex: `^${result.namedParameterizedRoute}(?:(/.*)?)$`,
            re: new RegExp(`^${result.parameterizedRoute}(?:(/.*)?)$`),
            routeKeys: result.routeKeys
        };
    }
    if (result.parameterizedRoute === '/') {
        return {
            groups: {
            },
            re: new RegExp('^/.*$')
        };
    }
    return {
        groups: {
        },
        re: new RegExp(`^${result.parameterizedRoute}(?:(/.*)?)$`)
    };
}

//# sourceMappingURL=get-middleware-regex.js.map