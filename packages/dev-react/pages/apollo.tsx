import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styled, { css } from 'styled-components'
import { withApollo } from '../apollo'
import { QUERY_TODO_LIST, QUERY_USER, TodoItem } from '../apollo/Mutation'
import { useInput } from '../hooks'

const Div = styled.div`
  ${() => css``}
`

type Props = {}

const TOGGLE_TODO = gql`
  mutation {
    toggleTodo(id: $id) @client
  }
`
const ADD_TODO = gql`
  mutation {
    addTodo(name: $name) @client
  }
`

const User: React.FC = () => {
  const { data } = useQuery<{ name: string; age: string }>(QUERY_USER)
  const getColor = () => Math.floor(Math.random() * 255)

  const style = {
    color: `rgb(${getColor()},${getColor()},${getColor()})`,
  }
  return (
    <div>
      <pre style={style}>
        <code>{JSON.stringify(data)}</code>
      </pre>
    </div>
  )
}

const TodoList: React.FC<{}> = () => {
  const client = useApolloClient()
  const input = useInput()
  const { data } = useQuery<{ todoList: TodoItem[] }>(QUERY_TODO_LIST)
  const [addTodo] = useMutation(ADD_TODO)
  const [toggleTodo] = useMutation(TOGGLE_TODO)

  return (
    <>
      <h1
        onClick={() => {
          addTodo({
            variables: {
              name: input.props.value,
            },
          })
        }}
      >
        Add todo
      </h1>
      <input type="text" {...input.props} />
      <ul>
        {data &&
          data.todoList.map(todo => (
            <li
              key={todo.id}
              onClick={() =>
                toggleTodo({
                  variables: {
                    id: todo.id,
                  },
                })
              }
            >
              {todo.name} - {String(todo.isDone)}
            </li>
          ))}
      </ul>
    </>
  )
}

const ApolloPage: NextPage<Props> = () => {
  return (
    <Div>
      <Head>
        <title>Apollo - Page</title>
      </Head>
      <Link href="/">
        <a href="/home">go home</a>
      </Link>

      <User />
      <TodoList />
    </Div>
  )
}

export default withApollo(ApolloPage)
