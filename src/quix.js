// polyfills
import 'es6-promise/auto'

// popper.js
import { createPopper } from '@popperjs/core'

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
import HBox from './ui/box/hbox.vue'
import VBox from './ui/box/vbox.vue'
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
    SubMenu,
  },
  install(V) {
    this.$Vue = V

    // class merge stategy
    this.$Vue.config.optionMergeStrategies.qxClass = (toVal, fromVal) => {
      if (fromVal) {
        if (toVal) {
          return `${toVal} ${fromVal}`
        }
        return fromVal
      }
      return toVal
    }

    // governance merge stategy
    this.$Vue.config.optionMergeStrategies.governance = (toVal, fromVal) => {
      const to = toVal || {}
      const from = fromVal || {}
      return { ...to, ...from, superGov: to }
    }

    // directives
    V.directive('movable', VMovable)
    V.directive('visible', VVisible)
    V.directive('focus', VFocus)

    // core components
    V.component('qx-app', App)
    V.component('qx-rect', Rect)

    // scroller
    V.component('qx-scroller', Scroller)

    // common
    V.component('qx-label', Label)
    V.component('qx-image', Image)
    V.component('qx-icon', Icon)
    V.component('qx-button', Button)
    V.component('qx-iframe', IFrame)
    V.component('qx-a', Anchor)

    // input
    V.component('qx-form', Form)
    V.component('qx-text-input', TextInput)
    V.component('qx-checkbox', CheckBox)
    V.component('qx-radio', Radio)
    V.component('qx-text-area', TextArea)
    V.component('qx-slider', Slider)

    // box
    V.component('qx-hbox', HBox)
    V.component('qx-vbox', VBox)
    V.component('qx-flowbox', FlowBox)

    // splitter
    V.component('qx-hsplitter', HSplitter)
    V.component('qx-vsplitter', VSplitter)

    // overlay
    V.component('qx-overlay', Overlay)

    // menu
    V.component('qx-contextmenu', ContextMenu)
    V.component('qx-menu-bar', MenuBar)
    V.component('qx-menu', Menu)
    V.component('qx-sub-menu', SubMenu)
  },
  createPopper,
  reactive,
}

export default Quix
