import React from 'react'
import { storiesOf } from '@storybook/react'
import { action, actions } from '@storybook/addon-actions'
import Button from '.'

storiesOf('Button', module)
  .add(
    'with text',
    () => <Button onClick={action('button-clicked')}>Hello Button</Button>,
    {
      notes: '# This is Button Note',
      info: {
        inline: true,
        header: true,
        source: false,
        text: `
### Notes

light button seen on <https://zpl.io/aM49ZBd>

### Usage
~~~js
<PrimaryButton
  label={text('label', 'Enroll')}
  disabled={boolean('disabled',false)}
  onClick={() => alert('hello there')}
/>
~~~
      `,
      },
    },
  )
  .add('with some emoji', () => (
    <Button {...actions('onClick', 'onMouseOver')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
