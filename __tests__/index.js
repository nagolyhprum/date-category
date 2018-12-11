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
  it('this week', () => {
    const from = new Date('2018-12-10')
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() + 2), from)).toBe('this week')
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() + 3), from)).toBe('this week')
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() + 4), from)).toBe('this week')
  })
  it('this weekend', () => {
    const from = new Date('2018-12-10')
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() + 4), from)).toBe('this weekend')
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() + 5), from)).toBe('this weekend')
  })
})
