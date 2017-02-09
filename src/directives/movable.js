import capabilities from '../core/capabilities'

const moveInfo = {
  startX: null,
  startY: null,
  el: null
}

function onPointerMove (evt) {
  let newX
  let newY
  const el = moveInfo.el

  // console.log('getting from vue', el)
  const value = el.$qx_movable.value
  const arg = el.$qx_movable.arg
  // console.log(binding);
  if (!arg || arg === 'horizontal') {
    newX = evt.pageX - moveInfo.startX
    if (typeof value.minX !== 'undefined' && newX < value.minX) {
      newX = value.minX
    } else if (typeof value.maxX !== 'undefined' && newX > value.maxX) {
      newX = value.maxX
    }
  }
  if (!arg || arg === 'vertical') {
    newY = evt.pageY - moveInfo.startY
    if (typeof value.minY !== 'undefined' && newY < value.minY) {
      newY = value.minY
    } else if (typeof value.maxY !== 'undefined' && newY > value.maxY) {
      newY = value.maxY
    }
  }
  const cr = new CustomEvent('move', {
    cancelable: true,
    detail: {
      x: newX,
      y: newY,
      source: el.__vue__
    }
  })
  el.dispatchEvent(cr)
}

function onPointerUp (evt) {
  document.removeEventListener('pointermove', onPointerMove, true)
  document.removeEventListener('pointerup', onPointerUp, true)
  // TODO: replace with CustomEvent
  moveInfo.el.__vue__.$emit('endmove', evt)
}

function onPointerDown (evt) {
  let offsetLeft = this.__vue__.getInnerLeft()
  let offsetTop = this.__vue__.getInnerTop()
  if (!this.__vue__.abs) {
    // calculate existing offsets
    const parent = this.__vue__.$parent
    const t = this.style.top
    const l = this.style.left
    this.style.top = null
    this.style.left = null
    offsetLeft -= (this.offsetLeft - parent.paddingLeft)
    offsetTop -= (this.offsetTop - parent.paddingTop)
    if (capabilities.borderIncludedInOffsets) {
      offsetLeft -= parent.borderLeft
      offsetTop -= parent.borderTop
    }
    this.style.top = t
    this.style.left = l
  }
  // update move info
  moveInfo.startX = evt.pageX - offsetLeft
  moveInfo.startY = evt.pageY - offsetTop
  moveInfo.el = this
  document.addEventListener('pointermove', onPointerMove, true)
  document.addEventListener('pointerup', onPointerUp, true)
  evt.preventDefault()
  evt.stopPropagation()
}

export default {
  bind (el, binding) {
    // el.addEventListener('click', onClick)
    el.addEventListener('pointerdown', onPointerDown)
    const element = el
    element.$qx_movable = {
      arg: binding.arg,
      value: binding.value || {}
    }
  },
  unbind (el) {
    // el.removeEventListener('click', onClick);
    // console.log('removing from vue', el.__vue__)
    const element = el
    element.removeEventListener('pointerdown', onPointerDown)
    delete element.$qx_movable
  }
}
