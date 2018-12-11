import dateCategory from '../src/index.js'

describe('date category', () => {
  it('returns today', () => {
    expect(dateCategory(new Date())).toBe('today')
  })
})
