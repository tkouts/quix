const moveInfo = {
  startX: null,
  startY: null,
  currentX: null,
  currentY: null,
  vue: null,
}

function onPointerMove(evt) {
  const { vue } = moveInfo
  const el = vue.$el
  const { arg } = el.$qx_movable
  const eventDetails = { e: evt }
  if (!arg || arg === 'horizontal') {
    eventDetails.deltaX = evt.pageX - moveInfo.currentX
    eventDetails.offsetX = evt.pageX - moveInfo.startX
  }
  if (!arg || arg === 'vertical') {
    eventDetails.deltaY = evt.pageY - moveInfo.currentY
    eventDetails.offsetY = evt.pageY - moveInfo.startY
  }

  vue.$emit('move', eventDetails, vue)
  moveInfo.currentX = evt.pageX
  moveInfo.currentY = evt.pageY
  evt.stopPropagation()
  // evt.preventDefault()
}

function onPointerUp() {
  document.removeEventListener('pointermove', onPointerMove, true)
  document.removeEventListener('pointerup', onPointerUp, true)
  moveInfo.vue.$emit('endmove')
}

function onPointerDown(evt) {
  // update move info
  moveInfo.startX = evt.pageX
  moveInfo.currentX = evt.pageX
  moveInfo.startY = evt.pageY
  moveInfo.currentY = evt.pageY
  moveInfo.vue = this.__vue__
  document.addEventListener('pointermove', onPointerMove, true)
  document.addEventListener('pointerup', onPointerUp, true)
  moveInfo.vue.$emit('startmove')
  evt.preventDefault()
  // evt.stopPropagation()
}

export default {
  bind(el, binding) {
    el.addEventListener('pointerdown', onPointerDown)
    const element = el
    element.$qx_movable = {
      arg: binding.arg,
      value: binding.value || {},
    }
  },
  unbind(el) {
    const element = el
    element.removeEventListener('pointerdown', onPointerDown)
    delete element.$qx_movable
  },
}
