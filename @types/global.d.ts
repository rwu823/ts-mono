declare namespace NodeJS {
  interface Global {}

  interface Process {}
}

interface Window {
  ABC: string
}

type Json = string | number | boolean | null | Json[] | { [key: string]: Json }
