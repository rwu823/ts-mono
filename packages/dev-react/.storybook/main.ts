/* eslint-disable filenames/match-exported */
import type { StorybookConfig } from '@storybook/core-common'

const config: StorybookConfig = {
  framework: '@storybook/react',
  addons: ['@storybook/addon-essentials', '@storybook/addon-links'],
  features: {
    babelModeV7: true,
  },
  stories: [
    {
      // 👇 The directory field sets the directory your stories
      directory: '../components',
      // 👇 The titlePrefix field will generate automatic titles for your stories
      titlePrefix: 'UI',
      // 👇 Storybook will load all files that contain the stories extensio
      files: '*.stories.*',
    },
  ],

  // babel: async (options: any) => ({
  //   ...options,
  //   plugins: ['macros', ...options.plugins],
  // }),

  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need
    // Return the altered config
    return config
  },

  typescript: {
    check: false,
    // checkOptions: {},
    // reactDocgen: 'react-docgen-typescript',
    // reactDocgenTypescriptOptions: {
    //   shouldExtractLiteralValuesFromEnum: true,
    //   propFilter: (prop) =>
    //     prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    // },
  },

  refs: {
    'design-system': {
      title: 'Design System',
      url: 'https://5ccbc373887ca40020446347-yldsqjoxzb.chromatic.com',
    },

    aixon: {
      title: 'Aixon',
      url: 'https://storage.cloud.google.com/appier-design-system/rocky/PROJ-19775-storybook/index.html',
    },
  },
}

export default config
