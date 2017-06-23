export default function visible (el, binding) {
  const value = binding.value
  const elm = el
  if (value === true) {
    elm.style.visibility = 'visible'
  } else {
    elm.style.visibility = 'hidden'
  }
}
