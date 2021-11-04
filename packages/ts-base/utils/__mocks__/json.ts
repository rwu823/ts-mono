export const parseJSON = jest.fn((injectState = {}) => ({
  name: 'Rocky',
  age: 23,
  ...injectState,
}))
