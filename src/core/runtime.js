import { updateGeometry } from './repaint'

let reactiveFunctionCounter = 0
const reactiveStack = []

class PartialComponents {
  constructor (reactiveFunctionId) {
    this.components = {}
    this.rId = reactiveFunctionId
  }

  add (component, compute) {
    const componentId = component._uid
    let entry = this.components[componentId]
    if (!entry) {
      entry = {
        c: component,
        computes: {},
        count: 1
      }
      entry.computes[compute] = 1
      this.components[componentId] = entry
    } else if (!entry.computes[compute]) {
      entry.computes[compute] = 1
      entry.count += 1
    }
  }
}

export class MasterComponents {
  constructor () {
    this.partials = {}
    this.components = {}
  }

  add (partial) {
    if (this.partials[partial.rId]) {
      // remove old partial
      this.remove(partial)
      // delete this.partials[partial.rId]
    }
    this.partials[partial.rId] = partial
    const componentKeys = Object.keys(partial.components)
    for (let i = 0; i < componentKeys.length; i += 1) {
      const uid = componentKeys[i]
      const masterEntry = this.components[uid]
      const entry = partial.components[uid]
      // console.log('adding', entry)
      if (!masterEntry) {
        this.components[uid] = {
          ...entry,
          ...{ computes: { ...entry.computes }}
        }
      } else {
        const computesKeys = Object.keys(entry.computes)
        for (let j = 0; j < computesKeys.length; j += 1) {
          const compute = computesKeys[j]
          if (masterEntry.computes[compute]) {
            masterEntry.computes[compute] += 1
          } else {
            masterEntry.computes[compute] = 1
          }
        }
        masterEntry.count += entry.count
      }
    }
  }

  remove (partial) {
    const componentKeys = Object.keys(partial.components)
    for (let i = 0; i < componentKeys.length; i += 1) {
      const uid = componentKeys[i]
      const masterEntry = this.components[uid]
      const entry = partial.components[uid]
      if (masterEntry) {
        masterEntry.count -= entry.count
        if (masterEntry.count <= 0) {
          delete this.components[uid]
        } else {
          const computesKeys = Object.keys(entry.computes)
          for (let j = 0; j < computesKeys.length; j += 1) {
            const compute = computesKeys[j]
            masterEntry.computes[compute] -= 1
            if (masterEntry.computes[compute] <= 0) {
              delete masterEntry.computes[compute]
            }
          }
        }
      }
    }
  }

  removeComponent (component) {
    const uid = component._uid
    if (this.components[uid]) {
      delete this.components[uid]
      // remove partials
      const partialsKeys = Object.keys(this.partials)
      for (let i = 0; i < partialsKeys.length; i += 1) {
        const partialKey = partialsKeys[i]
        if (partialKey.startsWith(`${uid}/`)) {
          this.remove(this.partials[partialKey])
          delete this.partials[partialKey]
        }
      }
    }
  }
}

export function reactive (func, def) {
  return function reactiveWrapper () {
    if (!this.ready) return def
    // var value, partial;
    const reactiveFunc = func
    if (!reactiveFunc.rId) {
      reactiveFunctionCounter += 1
      reactiveFunc.rId = reactiveFunctionCounter
    }
    const partial = new PartialComponents(`${this._uid}/${reactiveFunc.rId}`)
    reactiveStack.push(partial)
    const value = reactiveFunc.call(this)
    if (Object.keys(partial.components).length > 0) {
      this.app.dynamic.add(partial)
    }
    // console.log(partial.components)
    reactiveStack.pop()
    return value
  }
}

export function geometryWatcher (compute) {
  return function geometryWatcherWrapper () {
    if (!this.ready) return null
    const dynamic = this.app.dynamic.components
    if (reactiveStack.length > 0) {
      reactiveStack[reactiveStack.length - 1].add(this, compute)
    }
    if (!(this._uid in dynamic && compute in dynamic[this._uid].computes)) {
      const computes = {}
      computes[compute] = true
      updateGeometry(this, computes)
    }
    return this.rect[compute]
  }
}
