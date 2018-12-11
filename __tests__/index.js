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
  it('returns this week', () => {
    const from = new Date(2018, 11, 10)
    for (let i = 0; i < 3; i++) {
      expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() + 2 + i), from)).toBe('this week')
    }
  })
  it('returns this weekend', () => {
    const from = new Date(2018, 11, 10)
    for (let i = 0; i < 2; i++) {
      expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() + 5 + i), from)).toBe('this weekend')
    }
  })
  it('returns next week', () => {
    const from = new Date(2018, 11, 10)
    for (let i = 0; i < 5; i++) {
      expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() + 7 + i), from)).toBe('next week')
    }
  })
})
