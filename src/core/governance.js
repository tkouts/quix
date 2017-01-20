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

export default class RectGovernance {
  // static calc (child, prop, value) {
  //   return calc.call(child, 'width', value)
  // }

  static width (child) {
    return child.width
    // return this.call(child, 'width', child.width)
  }

  static height (child) {
    return child.height
    // return this.calc(child, 'height', child.height)
  }

  static minWidth (child) {
    return child.minWidth
    // return this.calc(child, 'minWidth', child.minWidth)
  }

  static minHeight (child) {
    return child.minHeight
    // return this.calc(child, 'minHeight', child.minHeight)
  }

  static top (child) {
    return child.top
    // return this.calc(child, 'top', child.top)
  }

  static left (child) {
    return child.left
    // return this.calc(child, 'left', child.left)
  }

  static right (child) {
    return child.right
    // return this.calc(child, 'right', child.right)
  }

  static bottom (child) {
    return child.bottom
    // return this.calc(child, 'bottom', child.bottom)
  }

  static padding (child) {
    let padding = child.padding
    if (padding == null) {
      padding = getThemeSetting(child, 'padding')
    }
    return convertBoxMetric(padding)
  }

  static margin (child) {
    return convertBoxMetric(child.margin)
  }

  static border (child) {
    let border = child.border
    if (border == null) {
      border = getThemeSetting(child, 'border')
    }
    return convertBoxMetric(border)
  }
}
