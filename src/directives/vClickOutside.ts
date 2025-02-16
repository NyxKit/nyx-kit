import type { DirectiveBinding, ObjectDirective } from 'vue'

interface ClickOutsideElement extends HTMLElement {
  __clickOutsideHandler__?: (event: Event) => void
}

const vClickOutside: ObjectDirective = {
  beforeMount(el: ClickOutsideElement, binding: DirectiveBinding<(event: Event) => void>) {
    const handler = (event: Event) => {
      if (!el.contains(event.target as Node) && typeof binding.value === 'function') {
        binding.value(event)
      }
    }

    // Use el.ownerDocument instead of global document
    const doc = el.ownerDocument || document
    el.__clickOutsideHandler__ = handler
    doc.addEventListener('click', handler, binding.modifiers.capture)
  },

  beforeUnmount(el: ClickOutsideElement, binding: DirectiveBinding) {
    if (el.__clickOutsideHandler__) {
      const doc = el.ownerDocument || document
      doc.removeEventListener('click', el.__clickOutsideHandler__, binding.modifiers.capture)
      delete el.__clickOutsideHandler__
    }
  },
}

export default vClickOutside
