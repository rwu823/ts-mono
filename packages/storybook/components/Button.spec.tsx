// import '@jest-env/env'
import React from 'react'

import { fireEvent } from '@testing-library/react'

import Button from './Button'

describe('Test Button Spec:', () => {
  beforeEach(() => {
    render(<Button />)
  })

  it('can render and update a counter', () => {
    expect(firstChild).toBeTruthy()
  })

  it('Button should have `btn` className', async () => {
    expect(firstChild).toHaveClass('btn')
  })

  it('click button', () => {
    const onClick = jest.fn()
    render(
      <Button onClick={onClick}>
        <p>click me</p>
      </Button>,
    )

    expect(firstChild).toHaveTextContent('click me')

    act(() => {
      fireEvent.click(firstChild)
    })

    expect(onClick).toBeCalled()
  })
})
