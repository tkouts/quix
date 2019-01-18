import capabilities from '../../core/capabilities'

export default {
  computeStyle: {
    gpuAcceleration: !!capabilities.transform3d,
  },
  hide: {
    enabled: false,
  },
  scrollerHide: {
    order: 810,
    enabled: true,
    fn: (data) => {
      const refVm = data.instance.reference.__vue__
      if (refVm) {
        const { scrollParent } = refVm
        if (scrollParent) {
          const dt = data
          const scrollOffsets = scrollParent.$el.getBoundingClientRect()
          const refRect = data.offsets.reference
          if (
            refRect.bottom < scrollOffsets.top
            || refRect.left > scrollOffsets.right
            || refRect.top > scrollOffsets.bottom
            || refRect.right < scrollOffsets.left
          ) {
            // Avoid unnecessary DOM access if visibility hasn't changed
            if (dt.hide === true) {
              return dt
            }
            dt.hide = true
            dt.attributes['x-out-of-boundaries'] = ''
          } else {
            // Avoid unnecessary DOM access if visibility hasn't changed
            if (dt.hide === false) {
              return dt
            }
            dt.hide = false
            dt.attributes['x-out-of-boundaries'] = false
          }
        }
      }
      return data
    },
  },
}
