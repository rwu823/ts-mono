import React from 'react'
import { action, actions } from '@storybook/addon-actions'
import { text, number, boolean } from '@storybook/addon-knobs'

// @ts-ignore
import page from './story.mdx'

import Button from '.'

export default {
  component: Button,
  title: `Components|Button`,

  parameters: {
    componentSubtitle: 'Handy status label',
    docs: { page },
  },
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
    options: {
      selectedPanel: 'storybook/docs/panel',
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

// export const mdxTest = () => {
//   return (
//     <Preview>
//       <Story name="all checkboxes">
//         <Button {...actions('onClick', 'onMouseOver')}>
//           <span role="img" aria-label="so cool">
//             😀 😎 👍 💯
//           </span>
//         </Button>
//       </Story>
//     </Preview>
//   )
// }
