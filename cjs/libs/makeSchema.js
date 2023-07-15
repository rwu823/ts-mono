"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSchema = void 0;
const makeSchema = (typeDef, resolvers) => {
    return {
        typeDefs: [typeDef],
        resolvers: resolvers ?? {},
    };
};
exports.makeSchema = makeSchema;
