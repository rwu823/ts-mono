import { action, actions } from '@storybook/addon-actions'
import { boolean, number, text } from '@storybook/addon-knobs'
import React from 'react'

import Button from '.'
// import page from './doc.mdx'

export default {
  component: Button,
  title: `UI|Button`,
}

export const normalText = () => {
  const name = text('name', 'James')
  const age = number('age', 23)
  const isDone = boolean('done', false)
  return (
    <Button onClick={action('clicked')}>
      {name} - {age} - {String(isDone)}
    </Button>
  )
}

normalText.story = {
  parameters: {
    docs: {
      // page,
    },
  },
}

export const withSomeEmoji = () => (
  <Button {...actions('onClick', 'onMouseOver')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
)
