import isStyleSupported from '../utils/style-supported'

function borderIncludedInOffset () {
  const div = document.createElement('div')
  div.className = 'qxw'
  div.style.borderWidth = '1px'
  div.appendChild(document.createElement('div'))
  document.documentElement.appendChild(div)
  const isIncluded = (div.firstChild.offsetTop === 1)
  document.documentElement.removeChild(div)
  return isIncluded
}

function getScrollBarSize () {
  const div = document.createElement('div')
  document.documentElement.appendChild(div)
  const w1 = div.clientWidth
  div.style.overflow = 'scroll'
  const size = w1 - div.clientWidth
  document.documentElement.removeChild(div)
  return size
}

function supportsCSSVariables () {
  const color = 'rgb(0, 0, 0)'
  const el = document.createElement('span')

  el.style.setProperty('--color', color)
  el.style.setProperty('background', 'var(--color)')
  document.documentElement.appendChild(el)

  const styles = getComputedStyle(el)
  const doesSupport = styles.backgroundColor === color
  document.documentElement.removeChild(el)
  return doesSupport
}

export default {
  flexSupported: isStyleSupported('display', 'flex'),
  cssPointerEvents: isStyleSupported('pointer-events', 'auto'),
  cssVariables: supportsCSSVariables(),
  transform3d: isStyleSupported('transform', 'translateZ(0)') ? ' translateZ(0)' : '',
  borderIncludedInOffset: borderIncludedInOffset(),
  placeholders: document.createElement('INPUT').placeholder !== undefined,
  scrollBarSize: getScrollBarSize()
}
