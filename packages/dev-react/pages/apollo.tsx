import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styled, { css } from 'styled-components'
import { withApollo } from '../apollo'
import { QUERY_TODO_LIST, TodoItem } from '../apollo/Mutation'
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

const ApolloPage: NextPage<Props> = () => {
  const client = useApolloClient()
  const input = useInput()
  const { data } = useQuery<{ todoList: TodoItem[] }>(QUERY_TODO_LIST)
  const [addTodo] = useMutation(ADD_TODO)
  const [toggleTodo] = useMutation(TOGGLE_TODO)

  return (
    <Div>
      <Head>
        <title>Apollo - Page</title>
      </Head>
      <Link href="/">
        <a href="/home">go home</a>
      </Link>

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
    </Div>
  )
}

export default withApollo(ApolloPage)
