import gulp from 'gulp'
import cp from 'child_process'

import dateCategory from './src/index.js'

const npm = (cmd, ...args) => program('npm', 'run', cmd, '--', ...args)

const log = (_) => {
  process.stdout.write(_)
  return _
}

const program = (...args) => new Promise((resolve, reject) => {
  console.log(...args)
  const program = cp.spawn(args[0], args.slice(1))
  const out = []
  const err = []
  program.stdout.on('data', it => out.push(log(it.toString())))
  program.stderr.on('data', it => err.push(log(it.toString())))
  program.on('close', code => code ? reject(new Error(err.join(''))) : resolve(out.join('')))
})

const standardFix = () => npm('standard', '--fix')

const standard = () => npm('standard')

const test = () => npm('jest')

const build = () => npm('parcel', 'build', '--no-source-maps', 'src/index.js')

const patch = () => program('npm', 'version', 'patch')

const deploy = () => program('npm', 'publish')

const TWO_YEARS = (365 * 2)

const demo = cb => {
  const from = new Date(2018, 5, 13) // WED
  let last = '???'
  for (var i = -TWO_YEARS; i < TWO_YEARS; i++) {
    const date = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i)
    const category = dateCategory(date, from)
    if (category !== last) {
      console.log(category, date.toDateString())
      last = category
    }
  }
  console.log('DEMO')
  cb()
}

gulp.task('build', build)
gulp.task('fix', standardFix)
gulp.task('test', test)
gulp.task('demo', demo)
gulp.task('deploy', gulp.series(standard, test, patch, deploy))
