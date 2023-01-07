import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerCompileClass,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  // presets: [presetUno({}), presetAttributify()],
  safelist: [],
  theme: {
    breakpoints: {},
    colors: {
      veryCool: '#0000ff', // class="text-very-cool"
      brand: {
        primary: 'hsla(var(--hue, 217), 78%, 51%)', //class="bg-brand-primary"
      },
    },
  },
  rules: [],
  transformers: [
    // transformerCompileClass({ classPrefix: 'ai', trigger: ':' }),
    transformerVariantGroup({}),
  ],
  shortcuts: [{ 'flex-center': 'flex justify-center items-center' }],
  // preprocess: (matcher) => {
  //   return matcher.startsWith('ai-') ? matcher.slice(7) : undefined // ignore
  // },
})
