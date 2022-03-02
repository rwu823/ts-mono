import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    globalSetup: [],
    exclude: [
      '**/{node_modules,dist,cypress,out}/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
  },
})
