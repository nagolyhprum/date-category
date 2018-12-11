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

const isThisWeek = (test, from) => {
  const day = (from.getDay() + 1) % 7 // WEEK STARTS ON MONDAY
  const time = (7 - day) * ONE_DAY
  const diff = test - from
  return diff > 0 && diff < time
}

const getToday = () => {
  const today = new Date()
  today.setMilliseconds(0)
  today.setSeconds(0)
  today.setMinutes(0)
  today.setHours(0)
  return today
}

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
    return 'this week'
  }
}
