export const makeSchema = (typeDef, resolvers) => {
    return {
        typeDefs: [typeDef],
        resolvers: resolvers ?? {},
    };
};
