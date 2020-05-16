import { atom } from 'recoil'

export const name = atom({
  key: 'name',
  default: 'rocky',
})

export const age = atom({
  key: 'age',
  default: 23,
})

export const todoList = atom({
  key: 'todoList',
  default: [],
})
