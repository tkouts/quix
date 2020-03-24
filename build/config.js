import buble from '@rollup/plugin-buble'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import { eslint } from 'rollup-plugin-eslint'
import { uglify } from 'rollup-plugin-uglify'
import vue from 'rollup-plugin-vue'
import alias from 'rollup-plugin-strict-alias'

// Post CSS plugins
import filter from 'postcss-filter-plugins'
import postcssPresetEnv from 'postcss-preset-env'
import inlineSvg from 'postcss-inline-svg'
import cssnano from 'cssnano'

import baseAlias from './alias'

export default {
  input: 'src/quix.js',
  plugins: [
    eslint(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    vue({
      css: false,
      template: {
        preprocessOptions: {
          pug: {
            doctype: 'html',
          },
        },
      },
    }),
    postcss({
      extract: 'dist/quix.css',
      plugins: [
        filter(),
        postcssPresetEnv({
          browsers: [
            '> 1%',
            'last 2 versions',
            'Firefox ESR',
            'ie >= 11',
          ],
        }),
        inlineSvg(),
        cssnano({
          zindex: false,
        }),
      ],
    }),
    buble({
      exclude: ['node_modules/**'],
      objectAssign: 'Object.assign',
    }),
    // transpile pepjs as it contains const statements
    buble({
      include: ['node_modules/pepjs/**'],
    }),
    alias(baseAlias),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    uglify(),
  ],
  // external: [],
  output: {
    file: 'dist/quix.min.js',
    format: 'umd',
    name: 'Quix',
    sourcemap: process.env.NODE_ENV === 'development',
  },
}
