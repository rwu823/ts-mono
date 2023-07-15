"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const makeSchema_js_1 = require("../libs/makeSchema.js");
exports.default = (0, makeSchema_js_1.makeSchema)(/* GraphQL */ `
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
`);
