// common prop types

export function distinctValues (dflt = '', allowedValues = []) {
  const propDef = {
    type: String
  }
  if (dflt) {
    propDef.default = dflt
  }
  if (allowedValues.length) {
    propDef.validator = val => allowedValues.indexOf(val) > -1
  }
  return propDef
}

export const cssBox = {
  type: [String, Array]
}

export const dynamicAttribute = {
  type: [String, Number]
}
