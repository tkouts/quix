import path from 'path'

const vueDir = path.dirname(require.resolve('vue'))

export default {
  vue: `${vueDir}/vue.esm`,
}
