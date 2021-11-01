import { readFileSync } from "fs";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";

const rglr = readFileSync(
  `${__dirname}/../_fonts/Satoshi-Regular.woff2`
).toString("base64");

const bold = readFileSync(`${__dirname}/../_fonts/Satoshi-Bold.woff2`).toString(
  "base64"
);
const black = readFileSync(
  `${__dirname}/../_fonts/Satoshi-Black.woff2`
).toString("base64");

function getCss(r: string, g: string, b: string) {
  return `
    @font-face {
        font-family: 'Satoshi-Regular';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Satoshi-Bold';
        font-style:  normal;
        font-weight: black;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Satoshi-Black';
        font-style:  normal;
        font-weight: black;
        src: url(data:font/woff2;charset=utf-8;base64,${black}) format('woff2');
    }

    body {
      padding: 0;
      margin: 0;
    }

    .main-container {
      background-color: white;
      width: 2048px;
      height: 1075px;
    }
    .top-container {
      width: 100%;
      height: calc(60% - 10px);
      // background-color: rgba(${r}, ${g}, ${b},0.0425);
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .ath-logo-container {
      position: absolute;
      right: 100px;
      top: 70px;
    }
    .ath-logo {
      height: 250px;
      width: 250px;
    }
    .asset-logo-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .bottom-container {
      width: 100%;
      height: calc(40% - 10px);
      background-color: rgba(${r}, ${g}, ${b},0.085);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .bottom-container-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      max-width: 1024px;
      text-align: center;
    }
    .coloured-line {
      width: 100%;
      height: 20px;
      background-color: rgba(${r}, ${g}, ${b}, 1);
    }
    .asset-symbol {
      font-family: Satoshi-Black;
      font-size: 180px;
      line-height: 200px;
      margin: 0;
      margin-top: -36px;
      padding: 0;
    }
    .asset-ath {
      font-family: Satoshi-Black;
      font-size: 150px;
      margin: 0;
      padding: 0;
      max-width: 1024px;
      padding-bottom: 24px;
    }
    .asset-name {
      font-family: Satoshi-Bold;
      color: #666666;
      font-size: 72px;
      line-height: 96px;
      margin: 0;
      padding: 0;
    }
}`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { assetSymbol, assetName, r, g, b, image } = parsedReq;
  return `
  <!DOCTYPE html>
  <html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(r, g, b)}
    </style>
    <body class="main-container">
      <div class="ath-logo-container">
        <div class="ath-logo">
          <svg width="100%" height="100%" viewBox="0 0 2778 2778" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
            <g transform="matrix(2.77778,0,0,2.77778,-9752.05,-47111.1)">
              <g id="ath_final_wordmark_light" transform="matrix(0.260417,0,0,0.462963,3510.74,16960)">
                <rect x="0" y="0" width="3840" height="2160" style="fill:none;"/>
                <g id="ath-wordmark" serif:id="ath wordmark" transform="matrix(7.86616,0,0,4.42472,-892.748,-66976.8)">
                  <g id="bottomguide">
                  </g>
                  <g transform="matrix(344.59,0,0,326.106,100.809,15526)">
                    <path d="M0.562,0.013L0.44,0.013L0.44,-0.067C0.425,-0.042 0.401,-0.023 0.37,-0.008C0.339,0.006 0.306,0.013 0.269,0.013C0.22,0.013 0.178,0.002 0.143,-0.021C0.108,-0.045 0.082,-0.076 0.063,-0.116C0.045,-0.156 0.037,-0.202 0.038,-0.253C0.039,-0.305 0.049,-0.35 0.068,-0.388C0.087,-0.426 0.114,-0.456 0.148,-0.477C0.183,-0.498 0.223,-0.509 0.269,-0.509C0.306,-0.509 0.34,-0.501 0.371,-0.485C0.403,-0.47 0.425,-0.447 0.44,-0.418L0.44,-0.509L0.562,-0.509L0.562,0.013ZM0.297,-0.097C0.325,-0.097 0.349,-0.103 0.37,-0.116C0.391,-0.129 0.408,-0.146 0.419,-0.169C0.43,-0.192 0.436,-0.218 0.436,-0.247C0.436,-0.277 0.43,-0.303 0.419,-0.326C0.408,-0.349 0.391,-0.366 0.37,-0.378C0.349,-0.391 0.325,-0.397 0.297,-0.397C0.269,-0.397 0.245,-0.391 0.224,-0.378C0.203,-0.365 0.187,-0.348 0.176,-0.325C0.165,-0.302 0.16,-0.276 0.16,-0.247C0.16,-0.218 0.165,-0.192 0.176,-0.169C0.187,-0.146 0.203,-0.129 0.224,-0.116C0.245,-0.103 0.269,-0.097 0.297,-0.097Z" style="fill-rule:nonzero;"/>
                  </g>
                  <g transform="matrix(344.59,0,0,344.59,299.896,15530.3)">
                    <path d="M0.012,-0.494L0.322,-0.494L0.322,-0.393L0.012,-0.393L0.012,-0.494ZM0.228,0L0.106,0L0.106,-0.619L0.228,-0.619L0.228,0Z" style="fill-rule:nonzero;"/>
                  </g>
                  <g transform="matrix(344.59,0,0,344.59,396.123,15530.3)">
                    <path d="M0.193,-0L0.071,-0L0.071,-0.744L0.193,-0.744L0.193,-0.431C0.209,-0.456 0.231,-0.475 0.259,-0.489C0.287,-0.502 0.319,-0.509 0.354,-0.509C0.418,-0.509 0.465,-0.49 0.495,-0.453C0.524,-0.415 0.539,-0.365 0.539,-0.304L0.539,-0L0.418,-0L0.418,-0.275C0.418,-0.302 0.415,-0.323 0.408,-0.339C0.401,-0.355 0.393,-0.367 0.382,-0.376C0.371,-0.385 0.36,-0.391 0.349,-0.394C0.337,-0.397 0.326,-0.398 0.315,-0.398C0.302,-0.398 0.288,-0.396 0.274,-0.392C0.259,-0.388 0.246,-0.381 0.234,-0.372C0.222,-0.362 0.212,-0.349 0.205,-0.333C0.197,-0.317 0.193,-0.297 0.193,-0.272L0.193,-0Z" style="fill-rule:nonzero;"/>
                  </g>
                  <g transform="matrix(-0.0363477,-4.45131e-18,4.03287e-17,-0.329309,687.186,15863.8)">
                    <rect x="2353.03" y="1012.95" width="544.81" height="127.661" style="fill:white;fill-opacity:0;"/>
                  </g>
                </g>
                <g id="Logomark">
                </g>
                <g transform="matrix(-3.03494,-2.09066e-16,3.17232e-16,-1.4571,9887.66,2081.78)">
                  <g id="Logomark1" serif:id="Logomark">
                    <rect x="2353.03" y="1012.95" width="544.81" height="127.661" style="fill:rgb(${r},${g},${b});"/>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div class="top-container">
        <div class="asset-logo-container">
          <img
            class="asset-logo"
            alt="${sanitizeHtml(assetName)} logo"
            src="${image}"
            width="400"
            height="400"
          />
        </div>
      </div>
      <div class="coloured-line"></div>
      <div class="bottom-container">
        <div class="bottom-container-content">
          <div class="asset-symbol">${sanitizeHtml(assetSymbol)}</div>
          <div class="asset-name">${sanitizeHtml(assetName)}</div>
        </div>
      </div>
    </body>
  </html>`;
}
