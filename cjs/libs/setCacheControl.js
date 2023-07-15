"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCacheControl = exports.CacheScope = void 0;
var CacheScope;
(function (CacheScope) {
    CacheScope["PUBLIC"] = "PUBLIC";
    CacheScope["PRIVATE"] = "PRIVATE";
})(CacheScope || (exports.CacheScope = CacheScope = {}));
const setCacheControl = (args) => {
    let string = '';
    for (const [k, v] of Object.entries(args)) {
        string += `${k}: ${v},`;
    }
    return `@cacheControl(${string})`;
};
exports.setCacheControl = setCacheControl;
exports.setCacheControl.minutes = 60;
exports.setCacheControl.hours = exports.setCacheControl.minutes * 60;
exports.setCacheControl.days = exports.setCacheControl.hours * 24;
