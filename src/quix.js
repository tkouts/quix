import Vue from 'vue'
import 'pepjs'
import './utils/polyfills'

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
Vue.component('qx-app', app)
Vue.component('qx-rect', rect)
// scroller
Vue.component('qx-scroller', scroller)
// common
Vue.component('qx-label', label)
Vue.component('qx-image', image)
Vue.component('qx-icon', icon)
Vue.component('qx-button', button)
Vue.component('qx-iframe', iframe)
// input
Vue.component('qx-slider', slider)
// box
Vue.component('qx-hbox', box.hbox)
Vue.component('qx-vbox', box.vbox)
Vue.component('qx-flowbox', flowbox)
// splitter
Vue.component('qx-hsplitter', hsplitter)
Vue.component('qx-vsplitter', vsplitter)
// overlay
Vue.component('qx-overlay', overlay)
// menu
Vue.component('qx-contextmenu', contextmenu)
Vue.component('qx-menu-bar', menubar)
Vue.component('qx-menu', menu)
Vue.component('qx-sub-menu', submenu)

export default {
  init (opts) {
    return new Vue(opts)
  },
  ui: {
    rect,
    app,
    scroller,
    // common
    label,
    image,
    icon,
    button,
    iframe,
    // input
    slider,
    // box
    hbox: box.hbox,
    vbox: box.vbox,
    flowbox,
    // splitter
    hsplitter,
    vsplitter,
    // overlay
    overlay,
    // menu
    contextmenu,
    menubar,
    menu,
    submenu
  }
}
