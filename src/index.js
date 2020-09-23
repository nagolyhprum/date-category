import languages from './languages'

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

const getLanguage = options => {
  if (options instanceof Date) {
    return languages.en
  }
  return languages[options.language] || languages.en
}

export const getCategories = (language = 'en') => {
  const lang = getLanguage(language)
  return [
    lang.before,
    lang.last.year,
    lang.earlier.this.year,
    lang.last.month,
    lang.earlier.this.month,
    lang.last.week,
    lang.last.weekend,
    lang.earlier.this.week,
    lang.yesterday,
    lang.today,
    lang.tomorrow,
    lang.this.week,
    lang.this.weekend,
    lang.next.week,
    lang.next.weekend,
    lang.this.month,
    lang.next.month,
    lang.this.year,
    lang.next.year,
    lang.after
  ]
}

export default (test, options = getToday()) => {
  const from = getFrom(options)
  const language = getLanguage(options)
  if (match(test, from)) {
    return language.today
  }
  if (match(add(test, { date: 1 }), from)) {
    return language.yesterday
  }
  if (match(add(test, { date: -1 }), from)) {
    return language.tomorrow
  }
  if (isThisWeek(test, from)) {
    if (test < from) {
      return language.earlier.this.week
    }
    if ([6, 0].includes(test.getDay())) {
      return language.this.weekend
    }
    return language.this.week
  }
  if (isNextWeek(test, from)) {
    if ([6, 0].includes(test.getDay())) {
      return language.next.weekend
    }
    return language.next.week
  }
  if (isLastWeek(test, from)) {
    if ([6, 0].includes(test.getDay())) {
      return language.last.weekend
    }
    return language.last.week
  }
  if (getMonth(test) === getMonth(from)) {
    if (test < from) {
      return language.earlier.this.month
    }
    return language.this.month
  }
  if (getMonth(test) - 1 === getMonth(from)) {
    return language.next.month
  }
  if (getMonth(test) + 1 === getMonth(from)) {
    return language.last.month
  }
  if (test.getFullYear() - from.getFullYear() <= -2) {
    return language.before
  }
  if (test.getFullYear() - from.getFullYear() >= 2) {
    return language.after
  }
  if (test.getFullYear() - 1 === from.getFullYear()) {
    return language.next.year
  }
  if (test.getFullYear() + 1 === from.getFullYear()) {
    return language.last.year
  }
  if (test.getFullYear() === from.getFullYear()) {
    if (test < from) {
      return language.earlier.this.year
    }
    return language.this.year
  }
}
