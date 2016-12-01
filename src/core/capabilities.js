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

export default {
  flexSupported: false && isStyleSupported('display', 'flex'),
  cssPointerEvents: isStyleSupported('pointer-events', 'auto'),
  transform3d: isStyleSupported('transform', 'translateZ(0)') ? ' translateZ(0)' : '',
  borderIncludedInOffset: borderIncludedInOffset(),
  scrollBarSize: getScrollBarSize()
}
