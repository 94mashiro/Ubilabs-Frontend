export default (sleepTime) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, sleepTime)
  })
}
