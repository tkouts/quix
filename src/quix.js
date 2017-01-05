import Vue from 'vue'
import Vuex from 'vuex'
import 'pepjs'
import './utils/polyfills'

import { reactive } from './core/runtime'

// directives
import movable from './directives/movable'
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
import slider from './ui/input/slider.vue'
// box
import box from './ui/box/box'
import flowbox from './ui/box/flowbox.vue'
// splitter
import hsplitter from './ui/splitter/hsplitter.vue'
import vsplitter from './ui/splitter/vsplitter.vue'
// overlay
import overlay from './ui/overlay/overlay.vue'
// menu
import contextmenu from './ui/menu/context-menu.vue'
import menubar from './ui/menu/menu-bar.vue'
import menu from './ui/menu/menu.vue'
import submenu from './ui/menu/sub-menu.vue'

// quix directives
Vue.directive('movable', movable)

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
const Slider = Vue.extend(slider)
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

export default {
  init (opts, store = null) {
    const options = opts
    if (store) {
      Vue.use(Vuex)
      options.store = Vuex.store(store)
    }
    return new Vue(options)
  },
  component (name, opts) {
    Vue.component(name, opts)
  },
  reactive,
  ui: {
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
    Slider,
    // box
    VBox,
    HBox,
    FlowBox,
    // splitter
    HSplitter,
    VSplitter,
    // overlay
    Overlay,
    // menu
    ContextMenu,
    MenuBar,
    Menu,
    SubMenu
  }
}
