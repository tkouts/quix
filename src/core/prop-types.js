// common prop types

export function mutableInt (dflt = 0) {
  return {
    type: [String, Number],
    convert: parseInt,
    default: dflt,
    mutable: true
  }
}

export function mutableString (dflt = '', allowedValues = []) {
  const propDef = {
    type: String,
    mutable: true
  }
  if (dflt) {
    propDef.default = dflt
  }
  if (allowedValues.length) {
    propDef.validator = val => allowedValues.indexOf(val) > -1
  }
  return propDef
}

export const mutableBoolean = {
  type: Boolean,
  mutable: true
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

export const cssBox = {
  type: [String, Array],
  mutable: true,
  convert: convertBoxMetric
}

export const dynamicAttribute = {
  type: [String, Number, Function],
  mutable: true
}

export function mutablePatcher (options) {
  const $options = options
  $options.mProps = {}
  // patch $options with computed properties for mutable props
  Object.keys($options.props).forEach((propName) => {
    const propDef = $options.props[propName]
    if (propDef.mutable) {
      const computedName = `$${propName}`
      $options.computed[computedName] = {
        get () {
          let setProp = this.mProps[propName]
          // console.log(setProp === undefined)
          if (setProp === undefined) {
            if (propDef.convert && this[propName] !== undefined) {
              return propDef.convert(this[propName])
            }
            setProp = this[propName]
          }
          if (propDef.get) {
            return propDef.get.call(this, setProp)
          }
          return setProp
        },
        set (val) {
          if (propDef.set) {
            this.mProps[propName] = propDef.set.call(this, val)
          } else {
            this.mProps[propName] = val
          }
        }
      }
      $options.mProps[propName] = undefined
    }
  })
}
