import capabilities from '../core/capabilities'

if (typeof Object.assign !== 'function') {
  Object.assign = function assign (target, ...args) {
    if (target === null) {
      throw new TypeError('Cannot convert undefined or null to object')
    }
    const targetObj = Object(target)
    for (let index = 0; index < args.length; index += 1) {
      const source = args[index]
      if (source != null) {
        const sourceKeys = Object.keys(source)
        for (let i = 0; i < sourceKeys.length; i += 1) {
          const key = sourceKeys[i]
          targetObj[key] = source[key]
        }
      }
    }
    return targetObj
  }
}

if (!String.prototype.endsWith) {
  window.String.prototype.endsWith = function endsWith (searchString, position) {
    const subjectString = this.toString()
    let pos = position
    if (typeof pos !== 'number' || !isFinite(pos) || Math.floor(pos) !== pos || pos > subjectString.length) {
      pos = subjectString.length
    }
    pos -= searchString.length
    const lastIndex = subjectString.indexOf(searchString, pos)
    return lastIndex !== -1 && lastIndex === pos
  }
}

if (!String.prototype.startsWith) {
  window.String.prototype.startsWith = function startsWith (searchString, position) {
    const pos = position || 0
    return this.substr(pos, searchString.length) === searchString
  }
}

if (typeof window.CustomEvent !== 'function') {
  const CustomEvent =
  function CustomEvent (event, params = { bubbles: false, cancelable: false, detail: undefined }) {
    const evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
    return evt
  }
  CustomEvent.prototype = Event.prototype
  window.CustomEvent = CustomEvent
}

// required by pep.js on IE9
if (typeof document.contains !== 'function') {
  document.contains = function contains (node) {
    return document.documentElement.contains(node)
  }
}

if (typeof Comment.prototype.contains !== 'function') {
  Comment.prototype.contains = function contains (node) {
    return false
  }
}

// CSS pointer-events Polyfill
if (!capabilities.cssPointerEvents) {
  const mouseEvents = [
    'click',
    'dblclick',
    'pointerdown',
    'pointerup',
    'pointerenter',
    'pointerleave'
  ]
  const passThrough = function passThrough (e) {
    let target = e.target
    let disabled = null
    while (target && !target.__vue__) {
      target = target.parentNode
    }
    // find topmost disabled
    if (target) {
      target = target.__vue__
      while (target) {
        if (target.disabled) {
          disabled = target
        }
        target = target.parent
      }
      if (disabled) {
        // console.log('DISABLED', disabled.$el)
        const origDisplay = disabled.$el.style.visibility
        disabled.$el.style.visibility = 'hidden'

        const underneathElem = document.elementFromPoint(e.clientX, e.clientY)

        // fire the mouse event on the element below
        const evt = new CustomEvent(e.type, {
          cancelable: true,
          bubbles: true
        })
        // Object.assign(evt, e);
        // evt.target = underneathElem;
        // console.log(underneathElem, e.type)
        if (underneathElem) {
          underneathElem.dispatchEvent(evt)
          if (underneathElem.tagName.match(/input|textarea/i) && evt.type === 'pointerdown') {
            underneathElem.focus()
          }
        }
        disabled.$el.style.visibility = origDisplay
        e.stopImmediatePropagation()
        e.preventDefault()
        return false
      }
    }
    return true
  }
  for (let i = 0; i < mouseEvents.length; i += 1) {
    document.addEventListener(mouseEvents[i], passThrough, true)
  }
}

window.nextTick = window.requestAnimationFrame
