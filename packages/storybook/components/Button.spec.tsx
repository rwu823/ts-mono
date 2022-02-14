// import React from 'react'

import { fireEvent } from '@testing-library/react'

import Button from './Button'

describe('Test Button Spec:', () => {
  it('test fail', async () => {
    render(<Button />)
    expect(1).toBe(1)
  })

  it('can render and update a counter', () => {
    render(<Button />)
    expect(firstChild).toBeTruthy()
  })

  it('Button should have `btn` className', async () => {
    render(<Button />)
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

    fireEvent.click(firstChild)

    expect(onClick).toBeCalled()
  })
})
