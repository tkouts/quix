import path from 'path'

const vueDir = path.dirname(require.resolve('vue'))
const iScrollDir = path.dirname(require.resolve('iscroll'))

export default {
  vue: `${vueDir}/vue.esm`,
  iscroll: `${iScrollDir}/iscroll-probe`,
}
