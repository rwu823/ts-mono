import type { DocumentNode } from 'graphql';
export declare const makeSchema: <Resolvers extends Record<string, any>>(typeDef: DocumentNode | string, resolvers?: Resolvers | undefined) => {
    typeDefs: (string | DocumentNode)[];
    resolvers: {};
};
