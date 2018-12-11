import gulp from 'gulp'

import cp from 'child_process'

function npm (cmd, ...args) {
  return program('npm', 'run', cmd, '--', ...args)
}

function log (_) {
  process.stdout.write(_)
  return _
}

function program (...args) {
  return new Promise((resolve, reject) => {
    console.log(...args)
    const program = cp.spawn(args[0], args.slice(1))
    const out = []
    const err = []
    program.stdout.on('data', it => out.push(log(it.toString())))
    program.stderr.on('data', it => err.push(log(it.toString())))
    program.on('close', code => code ? reject(new Error(err.join(''))) : resolve(out.join('')))
  })
}

function standardFix () {
  return npm('standard', '--fix')
}

function test () {
  return npm('jest')
}

function build () {
  return npm('parcel', 'build', '--no-source-maps', 'src/index.js')
}

gulp.task('build', build)
gulp.task('fix', standardFix)
gulp.task('test', test)
