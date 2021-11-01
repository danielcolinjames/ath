"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const marked_1 = __importDefault(require("marked"));
const sanitizer_1 = require("./sanitizer");
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text) => twemoji.parse(text, twOptions);
const rglr = fs_1.readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString("base64");
const bold = fs_1.readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString("base64");
const mono = fs_1.readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString("base64");
function getCss(theme, fontSize, images, widths, heights) {
    let background = "#eee";
    let foreground = "#111";
    if (theme === "dark") {
        background = "#fefefe";
        foreground = "#111";
    }
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: black;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    .body-left {
        background: ${background};
        background-size: 100px 100px;
        background-image: ${getImage(images[0], widths[0], heights[0])};
        height: 100vh;
        display: flex;
        max-width: 0vw;
        margin: 0 auto;
        text-align: left;
        align-items: center;
        justify-content: center;
    }
    .body-class {
        background: ${background};
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        max-width: 50vw;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper-left {
      padding-top: 50px;
      width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
    }

    .logo {
        margin: 0 15px 0;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        // margin: 80px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading-main {
        font-family: 'Inter', sans-serif;
        font-size: 64px;
        margin-bottom: -36px;
        font-weight: 300;
        text-align: center;
        color: #888888;
        line-height: 1;
    }
    .heading-symbol {
      font-family: 'Inter', sans-serif;
        font-size: 200px;
        font-style: normal;
        color: #333;
        // line-height: 1;
        text-align: center;
        margin-top: 44px;
        margin-bottom: -64px;
        margin-left: -10px;
    }
    .heading-subtitle {
        font-family: 'Inter', sans-serif;
        // font-size: ${sanitizer_1.sanitizeHtml(fontSize)};
        font-size: 72px;
        font-style: normal;
        color: ${foreground ? "#555" : "#555"};
        line-height: 1;
    }`;
}
function getHtml(parsedReq) {
    const { text, symbol, theme, md, fontSize, images, widths, heights, cornerLogo, hideHeader, centered, } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize, images, widths, heights)}
    </style>
    <body class="${centered ? "body-class" : "body-left"}">
        <div>
          <div class="spacer">
            <div class="${centered ? "logo-wrapper" : "logo-wrapper-left"}">
                ${images
        .map((img, i) => getPlusSign(i) + getImage(img, widths[i], heights[i]))
        .join("")}
            </div>
            <div class="heading-symbol">${sanitizer_1.sanitizeHtml(symbol)}
            </div>
            <div class="heading-subtitle">${emojify(md ? marked_1.default(text) : sanitizer_1.sanitizeHtml(text))}
            </div>
            ${hideHeader || true
        ? ""
        : '<div class="heading-main">All-Time High</div>'}
            <div style="display:flex;align-items:center;justify-content:center;">
              ${cornerLogo
        ? '<img src="https://ath.ooo/images/ath-tp.png" style="height:200px;margin-top:50px;width:auto;" />'
        : ""}
            </div>
        </div>
    </body>
</html>`;
}
exports.getHtml = getHtml;
function getImage(src, width = "auto", height = "350") {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizer_1.sanitizeHtml(src)}"
        width=${width ? "300" : "300"}
        height=${height ? "300" : "300"}
    />`;
}
function getPlusSign(i) {
    return i === 0 ? "" : '<div class="plus">+</div>';
}
//# sourceMappingURL=template copy.js.map