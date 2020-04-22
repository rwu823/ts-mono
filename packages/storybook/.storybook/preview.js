import { addDecorator, addParameters } from '@storybook/react'
// import { withInfo } from '@storybook/addon-info'
import { withContexts } from '@storybook/addon-contexts/react'
import centered from '@storybook/addon-centered/react'

import { withTests } from '@storybook/addon-jest'
import { withKnobs } from '@storybook/addon-knobs'

import results from './jest-test-results.json'

import { contexts } from './contexts'

addDecorator(withContexts(contexts))
addDecorator(centered)
addDecorator(withTests({ results }))
addDecorator(withKnobs)
// addDecorator(withInfo)

addParameters({
  jest: ['spec.tsx'],
  backgrounds: [
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' },
  ],
})
