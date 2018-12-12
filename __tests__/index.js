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
  it('returns next weekend', () => {
    const from = new Date(2018, 11, 10)
    for (let i = 0; i < 2; i++) {
      expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() + 12 + i), from)).toBe('next weekend')
    }
  })
  it('returns this month', () => {
    const from = new Date(2018, 11, 10)
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() + 14), from)).toBe('this month')
  })
  it('returns next month', () => {
    const from = new Date(2018, 5, 15)
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth() + 1, from.getDate()), from)).toBe('next month')
  })
  it('returns this year', () => {
    const from = new Date(2018, 5, 15)
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth() + 2, from.getDate()), from)).toBe('this year')
  })
  it('returns next year', () => {
    const from = new Date(2018, 5, 15)
    expect(dateCategory(new Date(from.getFullYear() + 1, from.getMonth(), from.getDate()), from)).toBe('next year')
  })
  it('returns later', () => {
    const from = new Date(2018, 5, 15)
    expect(dateCategory(new Date(from.getFullYear() + 2, from.getMonth(), from.getDate()), from)).toBe('later')
  })
  it('returns last week', () => {
    const from = new Date(2018, 5, 15)
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() - 7), from)).toBe('last week')
  })
  it('returns last weekend', () => {
    const from = new Date(2018, 5, 15)
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() - 6), from)).toBe('last weekend')
  })
  it('returns earlier this week', () => {
    const from = new Date(2018, 5, 15)
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() - 2), from)).toBe('earlier this week')
  })
  it('returns earlier this month', () => {
    const from = new Date(2018, 5, 15)
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() - 14), from)).toBe('earlier this month')
  })
  it('returns last month', () => {
    const from = new Date(2018, 5, 15)
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth() - 1, from.getDate()), from)).toBe('last month')
  })
  it('returns earlier this year', () => {
    const from = new Date(2018, 5, 15)
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth() - 2, from.getDate()), from)).toBe('earlier this year')
  })
  it('returns last year', () => {
    const from = new Date(2018, 5, 15)
    expect(dateCategory(new Date(from.getFullYear() - 1, from.getMonth(), from.getDate()), from)).toBe('last year')
  })
  it('returns earlier', () => {
    const from = new Date(2018, 5, 15)
    expect(dateCategory(new Date(from.getFullYear() - 2, from.getMonth(), from.getDate()), from)).toBe('earlier')
  })
  it('returns next month when going from dec to jan', () => {
    const from = new Date(2018, 11, 31)
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() + 15), from)).toBe('next month')
  })
  it('returns last month when going from jan to dec', () => {
    const from = new Date(2018, 0, 1)
    expect(dateCategory(new Date(from.getFullYear(), from.getMonth(), from.getDate() - 15), from)).toBe('last month')
  })
})
