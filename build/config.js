import vue from 'rollup-plugin-vue2'
import alias from 'rollup-plugin-strict-alias'
import buble from 'rollup-plugin-buble'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'

// Post CSS plugins
import filter from 'postcss-filter-plugins'
import cssnext from 'postcss-cssnext'
import inlineSvg from 'postcss-inline-svg'
import cssnano from 'cssnano'

import baseAlias from './alias'

export default {
  entry: 'src/quix.js',
  plugins: [
    eslint(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    vue(),
    postcss({
      combineStyleTags: true,
      plugins: [
        filter(),
        cssnext({
          browsers: [
            '> 1%',
            'last 2 versions',
            'Firefox ESR',
            'Opera 12.1',
            'ie >= 9'
          ]
        }),
        inlineSvg(),
        cssnano()
      ]
    }),
    buble({
      exclude: ['node_modules/**']
    }),
    alias(baseAlias),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    uglify()
  ],
  // external: [],
  targets: [{
    dest: 'dist/quix.js',
    format: 'umd',
    moduleName: 'quix',
    sourceMap: process.env.NODE_ENV === 'development'
  }]
}
