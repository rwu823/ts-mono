import { addDecorator } from '@storybook/react' // <- or your view layer

export const parameters = {
  actions: { argTypesRegex: '^on.*', handles: ['mouseover', 'click'] },
}
