import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom'

let div: HTMLDivElement

global.act = act
global.render = (el: JSX.Element) =>
  act(() => {
    render(el, global.app)

    global.firstChild = global.app.firstChild as HTMLElement
  })

beforeEach(() => {
  div = document.createElement('div')
  document.body.appendChild(div)

  global.app = div
})

afterEach(() => {
  document.body.removeChild(div!)

  global.app = null as any
})
