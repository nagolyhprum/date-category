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

export default (test, from = new Date()) => {
  if (match(test, from)) {
    return 'today'
  }
  if (match(add(test, { date: 1 }), from)) {
    return 'yesterday'
  }
  if (match(add(test, { date: -1 }), from)) {
    return 'tomorrow'
  }
}
