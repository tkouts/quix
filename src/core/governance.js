export function convertBoxMetric(val) {
  if (val) {
    if (val.split) {
      return val.split(' ').map(parseFloat)
    }
    return val
  }
  return null
}

export default {
  width(child) {
    return child.width
  },

  height(child) {
    return child.height
  },

  minWidth(child) {
    return child.minWidth
  },

  minHeight(child) {
    return child.minHeight
  },

  top(child) {
    return child.top
  },

  left(child) {
    return child.left
  },

  right(child) {
    return child.right
  },

  bottom(child) {
    return child.bottom
  },

  padding(child) {
    return convertBoxMetric(child.padding)
  },

  margin(child) {
    return convertBoxMetric(child.margin)
  },

  border(child) {
    return convertBoxMetric(child.border)
  },
}
