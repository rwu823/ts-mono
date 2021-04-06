import { withTests } from '@storybook/addon-jest'
import { addDecorator } from '@storybook/react' // <- or your view layer

import results from './jest-test-results.json'

addDecorator(
  withTests({
    results,
  }),
)

export const parameters = {
  jest: ['spec.tsx'],
  actions: { argTypesRegex: '^on.*', handles: ['mouseover', 'click'] },
}
