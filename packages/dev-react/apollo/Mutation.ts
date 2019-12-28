import gql from 'graphql-tag'
import { Mutation } from './types'

export const QUERY_TODO_LIST = gql`
  query {
    todoList @client {
      __typename
      id
      isDone
      name
    }
  }
`

export const QUERY_USER = gql`
  query {
    name @client
    age @client
  }
`
const TODO_ITEM = 'TODO_ITEM'

export type TodoItem = {
  __typename: typeof TODO_ITEM
  id: string
  isDone: boolean
  name: string
}

export const toggleTodo: Mutation<Pick<TodoItem, 'id'>> = (
  _,
  vars,
  { cache },
) => {
  const id = `${TODO_ITEM}:${vars.id}`

  const { isDone } = cache.readFragment({
    id,
    fragment: gql`
      fragment Todo on ${TODO_ITEM} {
        isDone
      }
    `,
  }) as Pick<TodoItem, 'isDone'>

  cache.writeData({ id, data: { isDone: !isDone } })

  return null
}

export const addTodo: Mutation<Pick<TodoItem, 'name'>> = (
  _,
  todo,
  { cache },
) => {
  const { todoList = [] } =
    cache.readQuery<{ todoList: TodoItem[] }>({
      query: QUERY_TODO_LIST,
    }) || {}

  const data = {
    todoList: [
      ...todoList,
      {
        __typename: TODO_ITEM,
        id: String(Date.now()),
        isDone: false,
        ...todo,
      },
    ],
  }

  cache.writeQuery({
    query: QUERY_TODO_LIST,
    data,
  })

  return null
}
