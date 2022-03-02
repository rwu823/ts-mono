declare namespace NodeJS {
  interface Global {}

  interface Process {}
}

interface Window {}

type OmitType<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
