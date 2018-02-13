// polyfills
import 'es6-promise/auto'
import 'window.requestanimationframe'
// ajax
import axios from 'axios'
// popper.js
import Popper from 'popper.js'

import 'pepjs'
import './utils/polyfills'

// directives
import VMovable from './directives/movable'
import VVisible from './directives/visible'
import VFocus from './directives/focus'

import { reactive } from './core/runtime'

// base component
import Component from './ui/component'
// core components
import Rect from './ui/rect.vue'
import App from './ui/app.vue'
// scroller
import Scroller from './ui/scroller/scroller.vue'
// common
import Label from './ui/common/label.vue'
import Image from './ui/common/image.vue'
import Icon from './ui/common/icon.vue'
import Button from './ui/common/button.vue'
import IFrame from './ui/common/iframe.vue'
import Anchor from './ui/common/anchor.vue'
// input
import Form from './ui/input/form.vue'
import TextInput from './ui/input/text-input.vue'
import CheckBox from './ui/input/checkbox.vue'
import Radio from './ui/input/radio.vue'
import TextArea from './ui/input/text-area.vue'
import Slider from './ui/input/slider.vue'
// box
import Box from './ui/box/box'
import FlowBox from './ui/box/flowbox.vue'
// splitter
import HSplitter from './ui/splitter/hsplitter.vue'
import VSplitter from './ui/splitter/vsplitter.vue'
// overlay
import Overlay from './ui/overlay/overlay.vue'
// menu
import ContextMenu from './ui/menu/context-menu.vue'
import MenuBar from './ui/menu/menu-bar.vue'
import Menu from './ui/menu/menu.vue'
import SubMenu from './ui/menu/sub-menu.vue'

let Vue = null
const HBox = Box.hbox
const VBox = Box.vbox

const Quix = {
  Component,
  components: {
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
    Anchor,
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
    // SplitterHandle,
    // overlay
    Overlay,
    // menu
    ContextMenu,
    MenuBar,
    Menu,
    SubMenu
  },
  init (V) {
    Vue = V
    // directives
    Vue.directive('movable', VMovable)
    Vue.directive('visible', VVisible)
    Vue.directive('focus', VFocus)

    // core components
    Vue.component('qx-app', App)
    Vue.component('qx-rect', Rect)

    // scroller
    Vue.component('qx-scroller', Scroller)

    // common
    Vue.component('qx-label', Label)
    Vue.component('qx-image', Image)
    Vue.component('qx-icon', Icon)
    Vue.component('qx-button', Button)
    Vue.component('qx-iframe', IFrame)
    Vue.component('qx-a', Anchor)

    // input
    Vue.component('qx-form', Form)
    Vue.component('qx-text-input', TextInput)
    Vue.component('qx-checkbox', CheckBox)
    Vue.component('qx-radio', Radio)
    Vue.component('qx-text-area', TextArea)
    Vue.component('qx-slider', Slider)

    // box
    Vue.component('qx-hbox', HBox)
    Vue.component('qx-vbox', VBox)
    Vue.component('qx-flowbox', FlowBox)

    // splitter
    Vue.component('qx-hsplitter', HSplitter)
    Vue.component('qx-vsplitter', VSplitter)

    // overlay
    Vue.component('qx-overlay', Overlay)

    // menu
    Vue.component('qx-contextmenu', ContextMenu)
    Vue.component('qx-menu-bar', MenuBar)
    Vue.component('qx-menu', Menu)
    Vue.component('qx-sub-menu', SubMenu)
  },
  app (opts) {
    return new Vue(opts)
  },
  extend (options) {
    return Vue.extend(options)
  },
  ajax: axios,
  Popper,
  reactive
}

export default Quix
