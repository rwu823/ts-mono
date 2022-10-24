import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    globalSetup: [],
    include: ['exams/**/*.spec.ts'],
    exclude: [
      '**/{node_modules,dist,cypress,out}/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
    coverage: {
      reporter: ['json', 'html'],
    },
  },
})
