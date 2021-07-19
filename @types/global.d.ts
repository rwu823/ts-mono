declare namespace NodeJS {
  interface Global {}

  interface Process {}
}

interface Window {}

type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

type OmitType<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
