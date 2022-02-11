import React from 'react'

// import  from '@storybook/react'
import Button from './Button'
// import page from './doc.mdx'

export default {
  component: Button,
  title: `UI/Button`,
}

type NormalTextProps = {
  name: string
  age: number
  isDone: boolean
}
export const normalText = ({ name, age, isDone }: NormalTextProps) => (
  <Button>
    {name} - {age} - {String(isDone)}
  </Button>
)

normalText.parameters = {
  jest: ['Button.spec'],
}

normalText.args = {
  name: 'James',
  age: 23,
  isDone: false,
} as NormalTextProps

export const withSomeEmoji = () => (
  <Button>
    <span aria-label="so cool" role="img">
      😀 😎 👍 💯
    </span>
  </Button>
)
