"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chrome_aws_lambda_1 = __importDefault(require("chrome-aws-lambda"));
const exePath = process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
        ? '/usr/bin/google-chrome'
        : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
async function getOptions(isDev) {
    let options;
    if (isDev) {
        options = {
            args: [],
            executablePath: exePath,
            headless: true
        };
    }
    else {
        options = {
            args: chrome_aws_lambda_1.default.args,
            executablePath: await chrome_aws_lambda_1.default.executablePath,
            headless: chrome_aws_lambda_1.default.headless,
        };
    }
    return options;
}
exports.getOptions = getOptions;
//# sourceMappingURL=options.js.map