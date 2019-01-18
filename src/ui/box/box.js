import capabilities from '../../core/capabilities'
import hBox from './hbox.vue'
import hBoxLegacy from './hbox-legacy.vue'
import vBox from './vbox.vue'
import vBoxLegacy from './vbox-legacy.vue'

let hbox
let vbox

if (capabilities.flexSupported) {
  hbox = hBox
  vbox = vBox
} else {
  hbox = hBoxLegacy
  vbox = vBoxLegacy
}

export default {
  hbox,
  vbox,
}
