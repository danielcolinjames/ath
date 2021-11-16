"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./_lib/parser");
const chromium_1 = require("./_lib/chromium");
const template_1 = require("./_lib/template");
const isDev = !process.env.AWS_REGION;
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1';
async function handler(req, res) {
    try {
        const parsedReq = parser_1.parseRequest(req);
        const html = template_1.getHtml(parsedReq);
        if (isHtmlDebug) {
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
            return;
        }
        const { fileType } = parsedReq;
        const file = await chromium_1.getScreenshot(html, fileType, isDev);
        res.statusCode = 200;
        res.setHeader('Content-Type', `image/${fileType}`);
        res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
        res.end(file);
    }
    catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
        console.error(e);
    }
}
exports.default = handler;
//# sourceMappingURL=index.js.map