declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test' | undefined
  }
}

interface Window {}

type OmitType<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
