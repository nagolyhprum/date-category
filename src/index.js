export default (to, from = new Date()) => {
  if(to.getDate() === from.getDate() && to.getMonth() === from.getMonth() && to.getFullYear() === from.getFullYear()) {
    return 'today'
  }
}