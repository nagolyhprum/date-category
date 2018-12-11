const ONE_DAY = (1000 * 60 * 60 * 24)

export default (to, from = new Date()) => {
  if(to.getDate() === from.getDate() && to.getMonth() === from.getMonth() && to.getFullYear() === from.getFullYear()) {
    return 'today'
  }
  if((to - from) < ONE_DAY) {
    return 'tomorrow'
  }
}