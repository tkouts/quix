const prefixes = ['Webkit', 'Moz', 'O', 'ms']
const camelRe = /-([a-z]|[0-9])/ig
const el = document.createElement('div')
let checkNativeSupport = () => false

if ('CSS' in window && window.CSS.supports) {
  // Check the standard method first
  checkNativeSupport = window.CSS.supports.bind(window.CSS)
} else if (window.supportsCSS) {
  // Check for Opera's native method
  checkNativeSupport = window.supportsCSS
}

function toCamelCase(prop) {
  return prop.replace(camelRe, (all, char) => `${char}`.toUpperCase())
}

function canSetProperty(prop, camel, value) {
  const support = camel in el.style
  if (value === 'inherit') {
    return support
  }
  el.style.cssText = `${prop}:${value}`
  return support && el.style[camel] !== ''
}

export default function isStyleSupported(prop, value = 'inherit') {
  // Check native methods first
  let support = checkNativeSupport(prop, value)
  if (support) {
    return true
  }

  let camel = toCamelCase(prop)
  const capitalized = camel.charAt(0).toUpperCase() + camel.slice(1)
  let length = prefixes.length - 1

  // Check if the property/value can be applied to an element
  support = canSetProperty(prop, camel, value)
  while (length && !support) {
    // We repeat the previous steps here, this time trying
    // each vendor prefix to determine support
    const prefixed = `-${prefixes[length].toLowerCase()}-${prop}`
    support = checkNativeSupport(prefixed, value)
    if (!support) {
      camel = prefixes[length] + capitalized
      support = canSetProperty(prefixed, camel, value)
    }
    length -= 1
  }
  return support
}
