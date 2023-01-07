import React from 'react'

import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from './Button'

export default {
  component: Button,

  argTypes: {},
} as ComponentMeta<typeof Button>

export const Primary: ComponentStory<typeof Button> = ({ bar }) => (
  <Button foo={'a'}>Button</Button>
)
