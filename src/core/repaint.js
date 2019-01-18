import capabilities from './capabilities'

let repaintStack = []

function inPixels(style, property) {
  const prop = style.getPropertyValue(property)
  if (prop) {
    return +(prop.slice(0, -2))
  }
  return 0
}

export function updateGeometry(comp, computes) {
  const el = comp.$el
  if (el.offsetParent != null || el.offsetHeight > 0 || el.offsetWidth > 0) {
    // const component = comp
    const { rect } = comp
    let computedStyle = null

    // outer-width
    if (computes.ow || computes.ir || computes.iw) {
      rect.ow = el.offsetWidth
    }
    // outer-height
    if (computes.oh || computes.ib || computes.ih) {
      rect.oh = el.offsetHeight
    }

    if (computes.iw || computes.pl || computes.pr || computes.bl || computes.br) {
      computedStyle = window.getComputedStyle(el)
      if (computes.iw || computes.pl) {
        rect.pl = inPixels(computedStyle, 'padding-left')
      }
      if (computes.iw || computes.pr) {
        rect.pr = inPixels(computedStyle, 'padding-right')
      }
      if (computes.iw || computes.bl) {
        rect.bl = inPixels(computedStyle, 'border-left-width')
      }
      if (computes.iw || computes.br) {
        rect.br = inPixels(computedStyle, 'border-right-width')
      }
    }

    if (computes.ih || computes.pt || computes.pb || computes.bt || computes.bb) {
      computedStyle = computedStyle || window.getComputedStyle(el)
      if (computes.ih || computes.pt) {
        rect.pt = inPixels(computedStyle, 'padding-top')
      }
      if (computes.ih || computes.pb) {
        rect.pb = inPixels(computedStyle, 'padding-bottom')
      }
      if (computes.ih || computes.bt) {
        rect.bt = inPixels(computedStyle, 'border-top-width')
      }
      if (computes.ih || computes.bb) {
        rect.bb = inPixels(computedStyle, 'border-bottom-width')
      }
    }

    // inner-width
    if (computes.iw) {
      const offset = rect.pl + rect.pr + rect.bl + rect.br
      rect.iw = rect.ow - offset
      if (rect.iw < 0) {
        rect.iw = 0
      }
    }
    // inner-height
    if (computes.ih) {
      const offset = rect.pt + rect.pb + rect.bt + rect.bb
      rect.ih = rect.oh - offset
      if (rect.ih < 0) {
        rect.ih = 0
      }
    }

    // offsets
    if (computes.it || computes.ib || computes.il || computes.ir) {
      const { container } = comp
      // inner-top
      if (computes.it || computes.ib) {
        rect.it = el.offsetTop - container.paddingTop()
        if (capabilities.borderIncludedInOffsets && !comp.abs) {
          rect.it -= container.borderTop()
        }
      }
      // inner-bottom
      if (computes.ib) {
        rect.ib = rect.it + rect.oh
      }
      // inner-left
      if (computes.il || computes.ir) {
        rect.il = el.offsetLeft - container.paddingLeft()
        if (capabilities.borderIncludedInOffsets && !comp.abs) {
          rect.il -= container.borderLeft()
        }
      }
      // inner-right
      if (computes.ir) {
        rect.ir = rect.il + rect.ow
      }
    }
    // console.log(comp.$el, `${JSON.stringify(rect)}`)
  }
}

function shouldUpdate(comp) {
  const { computes } = comp.app.dynamic.components[comp._uid]
  let update = false
  if (!!computes.oh || !!computes.ih || !!computes.it || !!computes.ib) {
    update = comp.hasVariableHeight
      || (comp.rect.ih == null || comp.rect.oh == null
          || comp.rect.it == null || comp.rect.ib == null)
  }
  if (!update && (!!computes.ow || !!computes.iw || !!computes.il || !!computes.ir)) {
    update = comp.hasVariableWidth
      || (comp.rect.iw == null || comp.rect.ow == null
          || comp.rect.il == null || comp.rect.ir == null)
  }
  if (!update && (!!computes.pl || !!computes.pr || !!computes.pt || !!computes.pb
                  || !!computes.bl || !!computes.br || !!computes.bt || !!computes.bb)) {
    update = true
  }
  return update
}

export function repaint() {
  // console.log(this, this.app)
  const dynamic = this.app.dynamic.components
  const dynamicKeys = Object.keys(dynamic)
  const totalDynamic = dynamicKeys.length
  const forUpdate = []

  // get contained componens
  for (let i = 0; i < totalDynamic; i += 1) {
    const uid = dynamicKeys[i]
    const comp = dynamic[uid].c
    if ((this === this.app || this.$el.contains(comp.$el)) && shouldUpdate(comp)) {
      forUpdate.push(comp)
    }
  }

  const updateLength = forUpdate.length
  for (let i = 0; i < updateLength; i += 1) {
    const comp = forUpdate[i]
    updateGeometry(comp, dynamic[comp._uid].computes)
  }
}

function normalizeStack() {
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

export function componentUpdated() {
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
