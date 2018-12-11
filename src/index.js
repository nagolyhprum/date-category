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

const getDay = date => (date.getDay() + 6) % 7 // WEEK STARTS ON MONDAY

const isThisWeek = (test, from) => {
  const day = getDay(from)
  const time = (7 - day) * ONE_DAY
  const diff = test - from
  return diff >= 0 && diff < time
}

const isNextWeek = (test, from) => {
  const day = getDay(from)
  const nextWeek = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 7 - day)
  const time = 7 * ONE_DAY
  const diff = test - nextWeek
  return diff >= 0 && diff < time
}

const getToday = () => add(new Date())

export default (test, from = getToday()) => {
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
  if(test.getMonth() === from.getMonth()) {
    return 'this month'
  }
}
