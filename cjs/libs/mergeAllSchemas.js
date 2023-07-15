"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeAllSchemas = void 0;
const deepmerge_1 = __importDefault(require("deepmerge"));
const mergeAllSchemas = (...schemas) => deepmerge_1.default.all(schemas);
exports.mergeAllSchemas = mergeAllSchemas;
