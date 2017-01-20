<template>
  <div class="qxw"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <slot></slot>
  </div>
</template>

<script>
import { dynamicAttribute, cssBox, distinctValues } from '../core/prop-types'
import { reactive, geometryWatcher } from '../core/runtime'
import { componentUpdated } from '../core/repaint'
import RectGovernance from '../core/governance'
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

export default {
  name: 'qx-rect',
  class: {},
  governance: RectGovernance,
  props: {
    // Position
    left: dynamicAttribute,
    right: dynamicAttribute,
    top: dynamicAttribute,
    bottom: dynamicAttribute,
    abs: Boolean,

    // Size
    width: dynamicAttribute,
    height: dynamicAttribute,
    minWidth: dynamicAttribute,
    minHeight: dynamicAttribute,

    // Box
    noClip: Boolean,
    padding: cssBox,
    margin: cssBox,
    border: cssBox,

    // Box flex
    flex: Number,
    flexAlign: distinctValues('', ['start', 'end', 'center', 'stretch']),

    disabled: Boolean
  },
  data () {
    return {
      ready: false,
      parent: null,
      children: [],
      custom: {},
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
    // define app
    this.app = this.$parent.app
  },
  beforeMount () {
    if (this.$parent.children) {
      this.$parent.children.push(this)
    }
    this.parent = this.$parent
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
      this.children.forEach(
        (c) => {
          const ch = c
          ch.parent = this
        })
    }
    this.ready = true
  },
  updated: componentUpdated,
  computed: {
    paddingTop () {
      return getBoxMetric(this.computedPadding, 0)
    },
    paddingRight () {
      return getBoxMetric(this.computedPadding, 1)
    },
    paddingBottom () {
      return getBoxMetric(this.computedPadding, 2)
    },
    paddingLeft () {
      return getBoxMetric(this.computedPadding, 3)
    },
    borderTop () {
      return getBoxMetric(this.computedBorder, 0)
    },
    borderRight () {
      return getBoxMetric(this.computedBorder, 1)
    },
    borderBottom () {
      return getBoxMetric(this.computedBorder, 2)
    },
    borderLeft () {
      return getBoxMetric(this.computedBorder, 3)
    },
    classes () {
      const cssClass = {
        abs: this.abs,
        'no-clip': this.noClip,
        disabled: this.disabled
      }
      if (this.flexAlign && this.$parent.orientation && !this.$parent.flow) {
        cssClass[`self-align-${this.flexAlign}`] = true
      }
      return Object.assign(cssClass, this.$options.class)
    },
    sizeStyle: reactive(function sizeStyle () {
      const styleObj = {}
      if (this.computedWidth) styleObj.width = calc.call(this, 'width', this.computedWidth)
      if (this.computedHeight) styleObj.height = calc.call(this, 'height', this.computedHeight)
      if (this.computedMinWidth) styleObj.minWidth = calc.call(this, 'minWidth', this.computedMinWidth)
      if (this.computedMinHeight) styleObj.minHeight = calc.call(this, 'minHeight', this.computedMinHeight)
      return styleObj
    }, {}),
    positionStyle: reactive(function positionStyle () {
      const styleObj = {}
      if (this.computedLeft) styleObj.left = calc.call(this, 'left', this.computedLeft)
      if (this.computedRight) styleObj.right = calc.call(this, 'right', this.computedRight)
      if (this.computedTop) styleObj.top = calc.call(this, 'top', this.computedTop)
      if (this.computedBottom) styleObj.bottom = calc.call(this, 'bottom', this.computedBottom)
      return styleObj
    }, {}),
    boxStyle () {
      const styleObj = {}
      // console.log('margin', this)
      // if ('margin' in this.$parent.childGovernance)
      if (this.computedMargin) styleObj.margin = getCssBoxMetric(this.computedMargin)
      // console.log('border', this)
      if (this.computedBorder) styleObj.borderWidth = getCssBoxMetric(this.computedBorder)
      if (capabilities.flexSupported && this.flex) {
        // const autoSizeParent = this.$parent.orientation === 'h' ?
        // this.$parent.autoWidth : this.$parent.autoHeight
        // if (!autoSizeParent) {
        styleObj.flex = this.flex
        // }
      }
      return styleObj
    },
    paddingStyle () {
      const styleObj = {}
      // console.log('padding', this)
      if (this.computedPadding) styleObj.padding = getCssBoxMetric(this.computedPadding)
      return styleObj
    },
    // governance
    governance () {
      if (this.ready && this.parent.ready && this.parent.$refs.root &&
          this.$el.contains(this.parent.$refs.root.$el)) {
        return RectGovernance
      }
      return this.parent.$options.governance
    },
    computedWidth () {
      return this.governance.width(this)
    },
    computedHeight () {
      return this.governance.height(this)
    },
    computedMinWidth () {
      return this.governance.minWidth(this)
    },
    computedMinHeight () {
      return this.governance.minHeight(this)
    },
    computedTop () {
      return this.governance.top(this)
    },
    computedLeft () {
      return this.governance.left(this)
    },
    computedBottom () {
      return this.governance.bottom(this)
    },
    computedRight () {
      return this.governance.right(this)
    },
    computedMargin () {
      return this.governance.margin(this)
    },
    computedPadding () {
      return this.governance.padding(this)
    },
    computedBorder () {
      return this.governance.border(this)
    },
    // DOM
    firstChild () {
      return this.children[0]
    },
    previousSibling () {
      if (this.$parent.children) {
        const parentChildren = this.$parent.children
        const index = parentChildren.indexOf(this)
        if (index > 0) {
          return parentChildren[index - 1]
        }
      }
      return null
    },
    nextSibling () {
      if (this.$parent.children) {
        const parentChildren = this.$parent.children
        const index = parentChildren.indexOf(this)
        if (index < parentChildren.length - 1) {
          return parentChildren[index + 1]
        }
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
      if (this.parent === this.$root && this.width == null) {
        return false
      }
      return ((this.$parent.orientation === 'v' || this.abs) && this.width == null) ||
        this.width === 'contain' || this.minWidth === 'contain'
    },
    autoHeight () {
      if (this.parent === this.$root && this.height == null) {
        return false
      }
      return this.height == null || this.height === 'contain' || this.minHeight === 'contain'
    },
    hasVariableWidth () {
      if (this.parent === this.$root && this.width == null) {
        return true
      }
      if (this.parent.hasVariableWidth) {
        return (!this.abs && this.width == null) || isNaN(this.width) || this.flex
      }
      return false
    },
    hasVariableHeight () {
      if (this.parent === this.$root && this.height == null) {
        return true
      }
      if (this.parent.hasVariableHeight) {
        return isNaN(this.height) || this.flex
      }
      return false
    },
    shouldUpdateParent () {
      // if (this.hasVariableWidth || this.hasVariableHeight) {
      if (this.abs) {
        return this.height === 'contain' || this.minHeight === 'contain' ||
          this.width === 'contain' || this.minWidth === 'contain'
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
    // custom props bag
    setCustom (key, value) {
      this.$set(this.custom, key, value)
    },
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
