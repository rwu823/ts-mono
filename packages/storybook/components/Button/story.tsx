import React from 'react'

import { action, actions } from '@storybook/addon-actions'
import { boolean, number, text } from '@storybook/addon-knobs'

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
    notes: 'some documentation here',
    docs: {
      // page,
    },
  },
}

export const withSomeEmoji = () => {
  return (
    <Button {...actions('onClick', 'onMouseOver')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  )
}

withSomeEmoji.story = {
  parameters: {
    notes: /* md */ `
# H1
## H2
### H3
    `,
  },
}
