import '@testing-library/jest-dom'

import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

let div: HTMLDivElement

global.act = act
global.render = (el: JSX.Element) =>
  act(() => {
    render(el, global.app)

    global.firstChild = global.app.firstChild as HTMLElement
  })

global.unMount = () =>
  act(() => {
    unmountComponentAtNode(global.app)
  })

beforeEach(() => {
  div = document.createElement('div')
  document.body.appendChild(div)

  global.app = div
})

afterEach(() => {
  global.unMount()
})
