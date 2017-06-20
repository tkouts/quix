function getThemeSetting (child, setting) {
  const compName = child.$options.name
  if ((compName in child.app.theme) && (setting in child.app.theme[compName])) {
    return child.app.theme[compName][setting]
  }
  return null
}

function convertBoxMetric (val) {
  if (val) {
    if (val.split) {
      return val.split(' ').map(parseFloat)
    }
    return val
  }
  return null
}

export default {
  width (child) {
    return child.width
  },

  height (child) {
    return child.height
  },

  minWidth (child) {
    return child.minWidth
  },

  minHeight (child) {
    return child.minHeight
  },

  top (child) {
    return child.top
  },

  left (child) {
    return child.left
  },

  right (child) {
    return child.right
  },

  bottom (child) {
    return child.bottom
  },

  padding (child) {
    let padding = child.padding
    if (padding == null) {
      padding = getThemeSetting(child, 'padding')
    }
    return convertBoxMetric(padding)
  },

  margin (child) {
    return convertBoxMetric(child.margin)
  },

  border (child) {
    let border = child.border
    if (border == null) {
      border = getThemeSetting(child, 'border')
    }
    return convertBoxMetric(border)
  }
}
