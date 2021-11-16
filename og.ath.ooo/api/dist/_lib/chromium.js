"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_core_1 = require("puppeteer-core");
const options_1 = require("./options");
let _page;
async function getPage(isDev) {
    if (_page) {
        return _page;
    }
    const options = await options_1.getOptions(isDev);
    const browser = await puppeteer_core_1.launch(options);
    _page = await browser.newPage();
    return _page;
}
async function getScreenshot(html, type, isDev) {
    const page = await getPage(isDev);
    await page.setViewport({ width: 512, height: 267 });
    await page.setContent(html);
    const file = await page.screenshot({ type });
    return file;
}
exports.getScreenshot = getScreenshot;
//# sourceMappingURL=chromium.js.map