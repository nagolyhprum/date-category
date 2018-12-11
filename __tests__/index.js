import dateCategory from '../src/index.js'

describe('date category', () => {
  it('returns today', () => {
    expect(dateCategory(new Date())).toBe('today')
  })
  it('returns tomorrow', () => {
    const today = new Date()
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

    expect(dateCategory(tomorrow)).toBe('tomorrow')
  })
  it('returns yesterday', () => {
    const today = new Date()
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)

    expect(dateCategory(yesterday)).toBe('yesterday')
  })
})
