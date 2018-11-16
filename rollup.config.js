import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      resolve({ jsnext: true, main: true, browser: true }),
      commonjs(),
      process.env.NODE_ENV === 'production' && uglify()
    ]
  },
  {
    input: 'src/index.js',
    external: ['lodash'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      process.env.node_env === 'production' && uglify()
    ]
  }
]
