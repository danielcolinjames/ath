"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};
function sanitizeHtml(html) {
    return String(html).replace(/[&<>"'\/]/g, key => entityMap[key]);
}
exports.sanitizeHtml = sanitizeHtml;
//# sourceMappingURL=sanitizer.js.map