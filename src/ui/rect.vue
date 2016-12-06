<template>
  <div class="qxw"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <slot></slot>
  </div>
</template>

<script>
import { dynamicAttribute, cssBox, mutableInt, mutableString, mutablePatcher } from '../core/prop-types'
import { reactive, geometryWatcher } from '../core/runtime'
import { componentUpdated } from '../core/repaint'
import calc from '../core/compute-engine'
import capabilities from '../core/capabilities'

function getBoxMetric (value, index) {
  let ind = index
  if (!value) {
    return 0
  }
  while (ind > value.length - 1) {
    ind = ind === 1 ? 0 : ind - 2
  }
  return value[ind]
}

function getCssBoxMetric (val) {
  if (val) {
    return val.map(v => (isNaN(v) ? v : `${v}px`)).join(' ')
  }
  return null
}

function removeItemFromArray (array, item) {
  const index = array.indexOf(item)
  if (index > -1) {
    array.splice(index, 1)
  }
}

// function hash (s) {
//   return s.split('').reduce((a, b) => {
//     let x = a
//     // eslint-disable-next-line no-bitwise
//     x = ((x << 5) - x) + b.charCodeAt(0)
//     // eslint-disable-next-line no-bitwise
//     return x & x
//   }, 0)
// }

const height = Object.assign({}, dynamicAttribute, {
  get (value) {
    if (!capabilities.flexSupported && this.$parent.orientation) {
      const orient = this.$parent.orientation
      if (orient === 'h' && this.computedFlexAlign === 'stretch' && !value) {
        return '100%'
      }
      if (orient === 'v' && this.$flex && this.$parent.$height) {
        return 'flex-compute'
      }
    }
    return value
  }
})

const width = Object.assign({}, dynamicAttribute, {
  get (value) {
    if (!capabilities.flexSupported && this.$parent.orientation) {
      const orient = this.$parent.orientation
      if (orient === 'v' && this.computedFlexAlign === 'stretch' && !value) {
        return '100%'
      }
      if (orient === 'h' && this.$flex /* && !this.$parent.autoWidth */) {
        return 'flex-compute'
      }
    }
    return value
  }
})

const bottom = Object.assign({}, dynamicAttribute, {
  get (value) {
    if (!capabilities.flexSupported && this.$parent.orientation === 'h' &&
        !this.$parent.flow && this.$parent.$height &&
        (this.computedFlexAlign === 'end' || this.computedFlexAlign === 'center')) {
      // console.log('inner-bottom', this.parent.innerHeight(), this.parent.scrollHeight());
      const heightAvailable = this.$parent.innerHeight +
        this.$parent.paddingTop + this.$parent.paddingBottom
      if (heightAvailable < this.$parent.scrollHeight) {
        // reposition h-box children
        if (this.computedFlexAlign === 'end') {
          return 'inner-end'
        }
        return 'center'
      }
    }
    return value
  }
})

export default {
  name: 'qx-rect',
  class: {},
  props: {
    // Position
    left: dynamicAttribute,
    right: dynamicAttribute,
    top: dynamicAttribute,
    bottom,
    abs: Boolean,

    // Size
    width,
    height,
    minWidth: dynamicAttribute,
    minHeight: dynamicAttribute,

    // Box
    noClip: Boolean,
    padding: cssBox,
    margin: cssBox,
    border: cssBox,

    // Box flex
    flex: mutableInt(),
    flexAlign: mutableString('', ['start', 'end', 'center', 'stretch']),

    disabled: Boolean
  },
  data () {
    return {
      mProps: Object.assign({}, this.$options.mProps),
      ready: false,
      children: [],
      rect: {
        ow: undefined,
        oh: undefined,
        iw: undefined,
        ih: undefined,
        it: undefined,
        ib: undefined,
        ir: undefined,
        il: undefined,
        sh: undefined,
        sw: undefined
      }
    }
  },
  beforeCreate () {
    if (!this.$options.qx__patched) {
      mutablePatcher(this.$options)
      this.$options.qx__patched = true
    }
    // define app
    this.app = this.$parent.app
  },
  beforeMount () {
    if (this.$parent.children) {
      this.$parent.children.push(this)
    }
    // define parent
    if (this._renderProxy._self !== this) {
      this.parent = this._renderProxy._self
    } else {
      this.parent = this.$parent
    }
  },
  beforeDestroy () {
    this.app.dynamic.removeComponent(this)
    if (this.parent.children) {
      removeItemFromArray(this.parent.children, this)
    }
  },
  mounted () {
    // define children
    const root = this.$refs.root
    if (root) {
      if (root.$el) {
        this.children = root.children
      } else {
        // root defined as simple element
        // locate parent component
        let parentElement = root.parentNode
        while (!parentElement.__vue__) {
          parentElement = parentElement.parentNode
        }
        this.children = parentElement.__vue__.children
      }
    }
    this.ready = true
  },
  updated: componentUpdated,
  computed: {
    paddingTop () {
      return getBoxMetric(this.$padding, 0)
    },
    paddingRight: {
      get () {
        return getBoxMetric(this.$padding, 1)
      },
      set (v) {
        // console.log('setting', v)
      }
    },
    paddingBottom () {
      return getBoxMetric(this.$padding, 2)
    },
    paddingLeft () {
      return getBoxMetric(this.$padding, 3)
    },
    borderTop () {
      return getBoxMetric(this.$border, 0)
    },
    borderRight () {
      return getBoxMetric(this.$border, 1)
    },
    borderBottom () {
      return getBoxMetric(this.$border, 2)
    },
    borderLeft () {
      return getBoxMetric(this.$border, 3)
    },
    classes () {
      const cssClass = {
        abs: this.abs,
        'no-clip': this.noClip,
        disabled: this.disabled
      }
      if (this.$flexAlign && this.$parent.orientation && !this.$parent.flow) {
        cssClass[`self-align-${this.$flexAlign}`] = true
      }
      return Object.assign(cssClass, this.$options.class)
    },
    sizeStyle: reactive(function sizeStyle () {
      const styleObj = {}
      if (this.$width) styleObj.width = calc.call(this, 'width', this.$width)
      if (this.$height) styleObj.height = calc.call(this, 'height', this.$height)
      if (this.$minWidth) styleObj.minWidth = calc.call(this, 'minWidth', this.$minWidth)
      if (this.$minHeight) styleObj.minHeight = calc.call(this, 'minHeight', this.$minHeight)
      return styleObj
    }, {}),
    positionStyle: reactive(function positionStyle () {
      const styleObj = {}
      if (this.$left) styleObj.left = calc.call(this, 'left', this.$left)
      if (this.$right) styleObj.right = calc.call(this, 'right', this.$right)
      if (this.$top) styleObj.top = calc.call(this, 'top', this.$top)
      if (this.$bottom) styleObj.bottom = calc.call(this, 'bottom', this.$bottom)
      return styleObj
    }, {}),
    boxStyle () {
      const styleObj = {}
      if (this.$margin) styleObj.margin = getCssBoxMetric(this.$margin)
      if (this.$border) styleObj.borderWidth = getCssBoxMetric(this.$border)
      if (capabilities.flexSupported && this.$flex) {
        // const autoSizeParent = this.$parent.orientation === 'h' ?
        // this.$parent.autoWidth : this.$parent.autoHeight
        // if (!autoSizeParent) {
        styleObj.flex = this.$flex
        // }
      }
      return styleObj
    },
    paddingStyle () {
      const styleObj = {}
      if (this.$padding) styleObj.padding = getCssBoxMetric(this.$padding)
      return styleObj
    },
    computedFlexAlign () {
      if (!capabilities.flexSupported && this.$parent.orientation) {
        return this.$flexAlign || this.$parent.$itemsAlign
      }
      return null
    },
    // DOM
    firstChild () {
      return this.children[0]
    },
    previousSibling () {
      const parentChildren = this.$parent.children
      const index = parentChildren.indexOf(this)
      if (index > 0) {
        return parentChildren[index - 1]
      }
      return null
    },
    nextSibling () {
      const parentChildren = this.$parent.children
      const index = parentChildren.indexOf(this)
      if (index < parentChildren.length - 1) {
        return parentChildren[index + 1]
      }
      return null
    },
    overlays () {
      return this.children.filter(c => c.showOn)
    },
    // Geometry
    outerWidth: geometryWatcher('ow'),
    outerHeight: geometryWatcher('oh'),
    innerWidth: geometryWatcher('iw'),
    innerHeight: geometryWatcher('ih'),
    innerTop: geometryWatcher('it'),
    innerBottom: geometryWatcher('ib'),
    innerRight: geometryWatcher('ir'),
    innerLeft: geometryWatcher('il'),
    scrollHeight: geometryWatcher('sh'),
    scrollWidth: geometryWatcher('sw'),
    // Repaint strategies
    autoWidth () {
      if (this.parent === this.$root && this.$width == null) {
        return false
      }
      return ((this.$parent.orientation === 'v' || this.abs) && this.$width == null) ||
        this.$width === 'contain' || this.$minWidth === 'contain'
    },
    autoHeight () {
      if (this.parent === this.$root && this.$height == null) {
        return false
      }
      return this.$height == null || this.$height === 'contain' || this.$minHeight === 'contain'
    },
    hasVariableWidth () {
      if (this.parent === this.$root && this.$width == null) {
        return true
      }
      if (this.parent.hasVariableWidth) {
        return (!this.abs && this.$width == null) || isNaN(this.$width) || this.$flex
      }
      return false
    },
    hasVariableHeight () {
      if (this.parent === this.$root && this.$height == null) {
        return true
      }
      if (this.parent.hasVariableHeight) {
        return isNaN(this.$height) || this.$flex
      }
      return false
    },
    shouldUpdateParent () {
      // if (this.hasVariableWidth || this.hasVariableHeight) {
      if (this.abs) {
        return this.$height === 'contain' || this.$minHeight === 'contain' ||
          this.$width === 'contain' || this.$minWidth === 'contain'
      }
      return this.$parent.autoWidth || this.$parent.autoHeight
      // }
      // return false
    },
    repaintBox () {
      let box = this.$parent
      // if (this.hasVariableWidth || this.hasVariableHeight) {
      //  box = this.$parent
      while (box !== this.app && box.shouldUpdateParent) {
        box = box.$parent
      }
      // }
      return box
    }
  },
  methods: {
    contains (el) {
      let contains = false
      if (this.overlays.length > 0) {
        contains = this.overlays.some(o => o.contains(el))
      }
      contains = contains || this.$el.contains(el)
      return contains
    },
    // DOM manipulation
    before (Vue, propsData = {}) {
      const el = document.createElement('div')
      this.$el.parentNode.insertBefore(el, this.$el)
      const options = {
        el,
        parent: this.$parent,
        propsData
      }
      const vm = new Vue(options)
      vm.parent = this.parent
      // update parent's children based on DOM order
      this.$parent.children.pop()
      this.$parent.children.splice(this.$parent.children.indexOf(this), 0, vm)
    },
    destroy () {},
    // Geometry
    getInnerLeft: geometryWatcher('il', true),
    getInnerTop: geometryWatcher('it', true),
    getOuterWidth: geometryWatcher('ow', true),
    getOuterHeight: geometryWatcher('oh', true),
    getInnerWidth: geometryWatcher('iw', true),
    getInnerHeight: geometryWatcher('ih', true)
  }
}
</script>

<style>
.qxw {
  display: block;
  border: 0 #000 solid;
  margin: 0;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  line-height: normal;
}

.qxw.abs {
  position: absolute;
}

.qxw.fixed {
  position: fixed;
}

.qxw.no-clip {
  overflow: visible;
}

.qxw.disabled {
  pointer-events: none;
  opacity: .5;
  cursor: default;
}

.qxw.disabled * {
  cursor: default !important;
}

/********************/
/* Helper Classes   */
/********************/

.qxw.text-align-center {
  text-align: center;
}

.qxw.text-align-start {
  text-align: left;
}

.qxw.text-align-end {
  text-align: right;
}

div.valign-container {
  white-space: nowrap;
  height: 100%;
}

div.valign-container:before {
  content: '';
  display: inline-block;
  height: 100%;
  width: 0;
  vertical-align: middle;
}

div.valign-container > .valign-start {
  display: inline-block;;
  vertical-align: top;
}

div.valign-container > .valign-center {
  display: inline-block;
  vertical-align: middle;
}

div.valign-container > .valign-end {
  display: inline-block;
  vertical-align: bottom;
}
</style>
