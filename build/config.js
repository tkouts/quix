import vue from 'rollup-plugin-vue'
import alias from 'rollup-plugin-strict-alias'
import buble from 'rollup-plugin-buble'
import { eslint } from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import { uglify } from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'

// Post CSS plugins
import filter from 'postcss-filter-plugins'
import cssnext from 'postcss-cssnext'
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
        cssnext({
          browsers: [
            '> 1%',
            'last 2 versions',
            'Firefox ESR',
            'Opera 12.1',
            'ie >= 9',
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
    sourceMap: process.env.NODE_ENV === 'development',
  },
}
