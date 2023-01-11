export const delay = (time = 3000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve('all done'), time)
  })
