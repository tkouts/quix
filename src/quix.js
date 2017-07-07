// polyfills
import 'es6-promise/auto'
// ajax
import axios from 'axios'
import 'pepjs'

// directives
import VMovable from './directives/movable'
import VVisible from './directives/visible'

import './utils/polyfills'
import { reactive } from './core/runtime'

// core components
import rect from './ui/rect.vue'
import app from './ui/app.vue'
// scroller
import scroller from './ui/scroller/scroller.vue'
// common
import label from './ui/common/label.vue'
import image from './ui/common/image.vue'
import icon from './ui/common/icon.vue'
import button from './ui/common/button.vue'
import iframe from './ui/common/iframe.vue'
// input
import form from './ui/input/form.vue'
import textinput from './ui/input/text-input.vue'
import checkbox from './ui/input/checkbox.vue'
import radio from './ui/input/radio.vue'
import textarea from './ui/input/text-area.vue'
import slider from './ui/input/slider.vue'
// box
import box from './ui/box/box'
import flowbox from './ui/box/flowbox.vue'
// splitter
import hsplitter from './ui/splitter/hsplitter.vue'
import vsplitter from './ui/splitter/vsplitter.vue'
import splitterhandle from './ui/splitter/splitter-handle.vue'
// overlay
import overlay from './ui/overlay/overlay.vue'
// menu
import contextmenu from './ui/menu/context-menu.vue'
import menubar from './ui/menu/menu-bar.vue'
import menu from './ui/menu/menu.vue'
import submenu from './ui/menu/sub-menu.vue'

let Vue = null

export default {
  components: {},
  init (V) {
    Vue = V
    // directives
    Vue.directive('movable', VMovable)
    Vue.directive('visible', VVisible)

    // core components
    const App = Vue.extend(app)
    Vue.component('qx-app', App)
    const Rect = Vue.extend(rect)
    Vue.component('qx-rect', Rect)

    // scroller
    const Scroller = Vue.extend(scroller)
    Vue.component('qx-scroller', Scroller)

    // common
    const Label = Vue.extend(label)
    const Image = Vue.extend(image)
    const Icon = Vue.extend(icon)
    const Button = Vue.extend(button)
    const IFrame = Vue.extend(iframe)
    Vue.component('qx-label', Label)
    Vue.component('qx-image', Image)
    Vue.component('qx-icon', Icon)
    Vue.component('qx-button', Button)
    Vue.component('qx-iframe', IFrame)

    // input
    const Form = Vue.extend(form)
    const TextInput = Vue.extend(textinput)
    const CheckBox = Vue.extend(checkbox)
    const Radio = Vue.extend(radio)
    const TextArea = Vue.extend(textarea)
    const Slider = Vue.extend(slider)
    Vue.component('qx-form', Form)
    Vue.component('qx-text-input', TextInput)
    Vue.component('qx-checkbox', CheckBox)
    Vue.component('qx-radio', Radio)
    Vue.component('qx-text-area', TextArea)
    Vue.component('qx-slider', Slider)

    // box
    const HBox = Vue.extend(box.hbox)
    const VBox = Vue.extend(box.vbox)
    const FlowBox = Vue.extend(flowbox)
    Vue.component('qx-hbox', HBox)
    Vue.component('qx-vbox', VBox)
    Vue.component('qx-flowbox', FlowBox)

    // splitter
    const HSplitter = Vue.extend(hsplitter)
    const VSplitter = Vue.extend(vsplitter)
    const SplitterHandle = Vue.extend(splitterhandle)
    Vue.component('qx-hsplitter', HSplitter)
    Vue.component('qx-vsplitter', VSplitter)

    // overlay
    const Overlay = Vue.extend(overlay)
    Vue.component('qx-overlay', Overlay)

    // menu
    const ContextMenu = Vue.extend(contextmenu)
    const MenuBar = Vue.extend(menubar)
    const Menu = Vue.extend(menu)
    const SubMenu = Vue.extend(submenu)
    Vue.component('qx-contextmenu', ContextMenu)
    Vue.component('qx-menu-bar', MenuBar)
    Vue.component('qx-menu', Menu)
    Vue.component('qx-sub-menu', SubMenu)

    this.components = {
      Rect,
      App,
      // scroller
      Scroller,
      // common
      Label,
      Image,
      Icon,
      Button,
      IFrame,
      // input
      Form,
      TextInput,
      CheckBox,
      Radio,
      TextArea,
      Slider,
      // box
      VBox,
      HBox,
      FlowBox,
      // splitter
      HSplitter,
      VSplitter,
      SplitterHandle,
      // overlay
      Overlay,
      // menu
      ContextMenu,
      MenuBar,
      Menu,
      SubMenu
    }
  },
  app (opts, theme = null) {
    let options = opts
    if (theme) {
      const mounted = options.mounted
      options = Object.assign(options, {
        mounted () {
          this.$root.app.theme = Object.assign(this.$root.app.theme, theme)
          if (mounted) {
            mounted.call(this)
          }
        }
      })
    }
    return new Vue(options)
  },
  ajax: axios,
  reactive
}
