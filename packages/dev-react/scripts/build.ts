import fg from 'fast-glob'

Promise.all([
  fg(['*', '!.next', '!node_modules', '!out'], { onlyDirectories: true }),
  fg(['*'], { onlyFiles: true }),
]).then(([dirs, files]) => {
  console.log([...dirs, ...files].join(' '))
})
