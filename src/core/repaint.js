import capabilities from './capabilities'

let repaintStack = []

export function updateGeometry (comp, computes) {
  const component = comp
  const parent = component.container

  // outer-width
  if (computes.ow || computes.ir || computes.iw) {
    component.rect.ow = component.$el.offsetWidth
  }
  // outer-height
  if (computes.oh || computes.ib || computes.ih) {
    component.rect.oh = component.$el.offsetHeight
  }
  // inner-width
  if (computes.iw) {
    const offset = component.paddingLeft + component.paddingRight +
      component.borderLeft + component.borderRight
    component.rect.iw = component.rect.ow - offset
    if (component.rect.iw < 0) {
      component.rect.iw = 0
    }
  }
  // inner-height
  if (computes.ih) {
    const offset = component.paddingTop + component.paddingBottom +
      component.borderTop + component.borderBottom
    component.rect.ih = component.rect.oh - offset
    if (component.rect.ih < 0) {
      component.rect.ih = 0
    }
  }
  // inner-top
  if (computes.it || computes.ib) {
    component.rect.it = component.$el.offsetTop - parent.paddingTop
    // console.log(this.$el.offsetTop, parent.paddingTop, parent)
    if (capabilities.borderIncludedInOffsets && !component.abs) {
      component.rect.it -= parent.borderTop
    }
  }
  // inner-bottom
  if (computes.ib) {
    component.rect.ib = component.rect.it + component.rect.oh
  }
  // inner-left
  if (computes.il || computes.ir) {
    component.rect.il = component.$el.offsetLeft - parent.paddingLeft
    if (capabilities.borderIncludedInOffsets && !component.abs) {
      component.rect.il -= parent.borderLeft
    }
  }
  // inner-right
  if (computes.ir) {
    component.rect.ir = component.rect.il + component.rect.ow
  }
}

function shouldUpdate (comp) {
  const computes = comp.app.dynamic.components[comp._uid].computes
  let update = false
  if (!!computes.oh || !!computes.ih || !!computes.sh || !!computes.it || computes.ib) {
    update = comp.hasVariableHeight ||
      (comp.rect.ih == null || comp.rect.oh == null || comp.rect.sh == null ||
       comp.rect.it == null || comp.rect.ib == null)
  }
  if (!update && (!!computes.ow || !!computes.iw || !!computes.sw ||
      !!computes.il || !!computes.ir)) {
    update = comp.hasVariableWidth ||
      (comp.rect.iw == null || comp.rect.ow == null || comp.rect.sw == null ||
       comp.rect.il == null || comp.rect.ir == null)
  }
  return update
}

export function repaint () {
  // console.log(this, this.app)
  const dynamic = this.app.dynamic.components
  const dynamicKeys = Object.keys(dynamic)
  const totalDynamic = dynamicKeys.length
  const forUpdate = []

  // get contained componens
  for (let i = 0; i < totalDynamic; i += 1) {
    const uid = dynamicKeys[i]
    const comp = dynamic[uid].c
    if ((this === this.app || this.$el.contains(comp.$el)) &&
        shouldUpdate(comp)) {
      forUpdate.push(comp)
    }
  }

  const updateLength = forUpdate.length
  for (let i = 0; i < updateLength; i += 1) {
    const comp = forUpdate[i]
    updateGeometry(comp, dynamic[comp._uid].computes)
  }
}

function normalizeStack () {
  const normalized = [repaintStack[0]]
  for (let i = 1; i < repaintStack.length; i += 1) {
    const comp = repaintStack[i]
    let added = false
    for (let j = 0; j < normalized.length; j += 1) {
      const norm = normalized[j]
      if (norm.$el.contains(comp.$el)) {
        added = true
        break
      } else if (comp.$el.contains(norm.$el)) {
        normalized[j] = comp
        added = true
        break
      }
    }
    if (!added) {
      normalized.push(comp)
    }
  }
  // console.log(repaintStack.length, normalized.length)
  normalized.map(c => repaint.call(c))
  // reset stack
  repaintStack = []
}

export function componentUpdated () {
  if (repaintStack.some(c => c.$el.contains(this.$el))) {
    // console.log('skipping', this._uid)
    return
  }
  // console.log('updating', this._uid)
  if (this.app.ready && this !== this.app) {
    if (repaintStack.length === 0) {
      this.$nextTick(normalizeStack)
    }
    // inProgress[this.repaintBox._uid] = true
    repaintStack.push(this.repaintBox)
  }
}
