import gulp from 'gulp'

import cp from 'child_process'

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

gulp.task('fix', () => program('npm', 'run', 'standard', '--', '--fix'))

gulp.task('test', () => program('npm', 'run', 'jest'))