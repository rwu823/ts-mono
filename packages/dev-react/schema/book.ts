import { makeGraphQLSchema } from '@ts-mono/dev-react/utils/apollo'

export default makeGraphQLSchema(
  (gql) =>
    gql`
      type Query {
        book: Book
      }

      type Book {
        title: String
      }
    `,
  {
    Query: {
      book: () => {},
    },
  },
)
