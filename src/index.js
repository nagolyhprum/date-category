const add = (date, options = {}) => {
  const mod = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  if (options.date) {
    mod.setDate(mod.getDate() + options.date)
  }
  return mod
}

const match = (a, b) => {
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()
}

const ONE_DAY = (1000 * 60 * 60 * 24)
const ONE_WEEK = 7 * ONE_DAY

const getDay = date => (date.getDay() + 6) % 7 // WEEK STARTS ON MONDAY

const getMonth = date => date.getMonth() + date.getFullYear() * 12

const getWeek = (date, diff = 0) => {
  const day = getDay(date)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7 * diff - day)
}

const isThisWeek = (test, from) => {
  const thisWeek = getWeek(from)
  const diff = test - thisWeek
  return diff >= 0 && diff < ONE_WEEK
}

const isNextWeek = (test, from) => {
  const nextWeek = getWeek(from, 1)
  const diff = test - nextWeek
  return diff >= 0 && diff < ONE_WEEK
}

const isLastWeek = (test, from) => {
  const lastWeek = getWeek(from, -1)
  const diff = test - lastWeek
  return diff >= 0 && diff < ONE_WEEK
}

const getToday = () => add(new Date())

const getFrom = options => {
  if (options instanceof Date) {
    return options
  }
  return options.from || getToday()
}

export default (test, options = getToday()) => {
  const from = getFrom(options)
  if (match(test, from)) {
    return 'today'
  }
  if (match(add(test, { date: 1 }), from)) {
    return 'yesterday'
  }
  if (match(add(test, { date: -1 }), from)) {
    return 'tomorrow'
  }
  if (isThisWeek(test, from)) {
    if (test < from) {
      return 'earlier this week'
    }
    if ([6, 0].includes(test.getDay())) {
      return 'this weekend'
    }
    return 'this week'
  }
  if (isNextWeek(test, from)) {
    if ([6, 0].includes(test.getDay())) {
      return 'next weekend'
    }
    return 'next week'
  }
  if (isLastWeek(test, from)) {
    if ([6, 0].includes(test.getDay())) {
      return 'last weekend'
    }
    return 'last week'
  }
  if (getMonth(test) === getMonth(from)) {
    if (test < from) {
      return 'earlier this month'
    }
    return 'this month'
  }
  if (getMonth(test) - 1 === getMonth(from)) {
    return 'next month'
  }
  if (getMonth(test) + 1 === getMonth(from)) {
    return 'last month'
  }
  if (test.getFullYear() - from.getFullYear() <= -2) {
    return 'earlier'
  }
  if (test.getFullYear() - from.getFullYear() >= 2) {
    return 'later'
  }
  if (test.getFullYear() - 1 === from.getFullYear()) {
    return 'next year'
  }
  if (test.getFullYear() + 1 === from.getFullYear()) {
    return 'last year'
  }
  if (test.getFullYear() === from.getFullYear()) {
    if (test < from) {
      return 'earlier this year'
    }
    return 'this year'
  }
}
