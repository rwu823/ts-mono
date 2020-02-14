import React from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import Button from '.'

let container: HTMLDivElement

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  // container = null
})

describe('Test Button Spec:', () => {
  it('can render and update a counter', () => {
    // Test first render and componentDidMount
    act(() => {
      render(<Button />, container)
    })
    const button = container.querySelector('button')

    expect(button).toBeTruthy()
  })

  it('try let it fail', async () => {
    expect(1).toBe(1)
  })
})
