const funCache = {}

function getAxis(prop) {
  if (prop === 'top' || prop === 'bottom' || prop === 'height' || prop === 'minHeight') {
    return 'y'
  }
  return 'x'
}

function isPercentage(value) {
  return typeof value === 'string' && value.slice(-1) === '%'
}

export default function calc(prop, value) {
  let computed = value
  if (!Number.isNaN(Number(computed)) && computed != null) {
    computed = `${Math.round(computed)}px`
  } else if (funCache[computed]) {
    computed = calc.call(this, prop, funCache[computed].call(this, prop))
  } else if (typeof value === 'function') {
    computed = calc.call(this, prop, computed.call(this, prop))
  } else if (isPercentage(computed)) {
    const axis = getAxis(prop)
    const { parent } = this
    const { root } = parent.$refs
    if (root) {
      const rootEl = root.$el || root
      if (this.$el !== rootEl && rootEl.contains(this.$el)) {
        if (axis === 'y' && !parent.autoHeight && !parent._retainPercentageY) {
          return `${Math.round(parent.innerHeight() * (+(computed.slice(0, -1)) / 100))}px`
        }
        if (!parent.autoWidth && !parent._retainPercentageX) {
          return `${Math.round(parent.innerWidth() * (+(computed.slice(0, -1)) / 100))}px`
        }
      }
    }
    // else if (axis === 'x' && this.parent.autoWidth) {
    //   return null
    // } else if (axis === 'y' && this.parent.autoHeight) {
    //   return null
    // }
  } else if (typeof computed === 'string' && computed.startsWith('=>')) {
    // unregistered function
    // eslint-disable-next-line no-new-func
    const func = new Function(`return ${computed.slice(3)}`)
    funCache[computed] = func
    return calc.call(this, prop, computed)
  }
  return computed
}

Object.assign(funCache, {
  center(prop) {
    const axis = getAxis(prop)
    const { parent } = this
    if (this.abs) {
      if (axis === 'x') {
        if (!this.width || parent.$refs.root) {
          return ((parent.outerWidth() - parent.borderLeft() - parent.borderRight())
            - this.outerWidth()) / 2
        }
        return `calc((100% - ${calc.call(this, prop, this.width)}) / 2)`
      }
      if (!this.height || parent.$refs.root) {
        return ((parent.outerHeight() - parent.borderTop() - parent.borderBottom())
          - this.outerHeight()) / 2
      }
      return `calc((100% - ${calc.call(this, prop, this.height)}) / 2)`
    }
    // relative positioned
    switch (prop) {
    case 'bottom':
      return -(((parent.innerHeight() + this.outerHeight()) / 2)
        - this.innerBottom() - +(this.$el.style.bottom.slice(0, -2)))
    case 'right':
      return -(((parent.innerWidth() + this.outerWidth()) / 2)
        - this.innerRight() - +(this.$el.style.right.slice(0, -2)))
    case 'top':
      return ((parent.innerHeight() - this.outerHeight()) / 2)
        - (this.innerTop() - +(this.$el.style.top.slice(0, -2)))
    default:
      return ((parent.innerWidth() - this.outerWidth()) / 2)
        - (this.innerLeft() - +(this.$el.style.left.slice(0, -2)))
    }
  },
  'inner-end': function innerEnd(prop) {
    const { parent } = this
    if (this.abs) {
      const axis = getAxis(prop)
      if (axis === 'y') {
        return parent.paddingBottom()
      }
      return parent.paddingRight()
    }
    // relative positioned
    switch (prop) {
    case 'bottom':
      return -parent.innerHeight() + this.innerBottom() + +(this.$el.style.bottom.slice(0, -2))
    case 'right':
      return -parent.innerWidth() + this.innerRight() + +(this.$el.style.right.slice(0, -2))
    case 'top':
      return parent.innerHeight() - (this.innerTop() - +(this.$el.style.top.slice(0, -2)))
    default:
      return parent.innerWidth() - (this.innerLeft() - +(this.$el.style.left.slice(0, -2)))
    }
  },
  contain(prop) {
    const axis = getAxis(prop)
    if (axis === 'y') {
      return Math.max(
        ...this.children.filter(c => c.abs).map(c => c.innerBottom()),
      ) + this.borderTop() + this.borderBottom() + this.paddingTop() + this.paddingBottom()
    }
    return Math.max(
      ...this.children.filter(c => c.abs).map(c => c.innerRight()),
    ) + this.borderLeft() + this.borderRight() + this.paddingLeft() + this.paddingRight()
  },
})
