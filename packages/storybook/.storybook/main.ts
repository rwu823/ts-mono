export default {
  addons: ['@storybook/addon-essentials', '@storybook/addon-jest'],

  stories: ['../components/**/story.tsx'],

  babel: async (options: any) => ({
    ...options,
    plugins: ['macros', ...options.plugins],
  }),

  typescript: {
    check: false,
    // checkOptions: {},
    // reactDocgen: 'react-docgen-typescript',
    // reactDocgenTypescriptOptions: {
    //   shouldExtractLiteralValuesFromEnum: true,
    //   propFilter: (prop: any) =>
    //     prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    // },
  },
}
