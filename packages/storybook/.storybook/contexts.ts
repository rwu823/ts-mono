import { themes } from '@storybook/theming'
import Button from '../components/Button'

export const contexts = [
  {
    icon: 'eye', // a icon displayed in the Storybook toolbar to control contextual props
    title: 'Themes', // an unique name of a contextual environment
    components: [
      Button,
      // an array of components that is going to be injected to wrap stories
      /* Styled-components ThemeProvider, */
      /* Material-ui ThemeProvider, */
    ],
    params: [
      // an array of params contains a set of predefined `props` for `components`
      {
        name: 'Light Theme',
        props: { theme: themes.light /* : your dark theme */ },
      },
      {
        name: 'Dark Theme',
        props: { theme: themes.dark /* : your light theme */ },
        default: true,
      },
    ],
    options: {
      deep: true, // pass the `props` deeply into all wrapping components
      disable: false, // disable this contextual environment completely
      cancelable: false, // allow this contextual environment to be opt-out optionally in toolbar
    },
  },
  /* ... */ // multiple contexts setups are supported
]
