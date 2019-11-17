import { configure, addParameters, addDecorator } from '@storybook/react'
import { themes, create } from '@storybook/theming'

import { withContexts } from '@storybook/addon-contexts/react'
import { withInfo } from '@storybook/addon-info' // we will define the contextual setups later in API section
import { contexts } from './contexts'

addDecorator(withContexts(contexts))
addDecorator(withInfo)

addParameters({
  backgrounds: [
    { name: 'default', value: '#fff', default: true },
    { name: 'facebook', value: '#3b5998' },
  ],
  options: {
    panelPosition: 'right',
    theme: create({
      ...themes.dark,
      brandImage:
        'https://developers.google.com/site-assets/developers_64dp.png?hl=zh-tw',
    }),
  },
})

configure(require.context('../components', true, /story\.(tsx|mdx)?$/), module)
