document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".hidden") // Each wrapper div

  function updateElements() {
    const windowHeight = window.innerHeight

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      const elementHeight = rect.height

      // Calculate scroll progress (0 when out of view, 1 when 60% through div)
      let progress = (windowHeight - rect.top) / (windowHeight * 0.4)
      progress = Math.min(Math.max(progress, 0), 1) // Keep within 0-1 range

      // Ensure full opacity & no movement when fully in view
      if (rect.top >= 0 && rect.bottom <= windowHeight) {
        progress = 1 // Force full visibility if the section is fully in view
      }

      // Fade in the whole wrapper div
      section.style.opacity = progress

      // Move inner elements (left & right)
      section.querySelectorAll(".fly-in-left").forEach((el) => {
        el.style.opacity = progress
        el.style.transform = `translateX(${(1 - progress) * -100}%)`
      })

      section.querySelectorAll(".fly-in-right").forEach((el) => {
        el.style.opacity = progress
        el.style.transform = `translateX(${(1 - progress) * 100}%)`
      })
    })
  }

  window.addEventListener("scroll", updateElements)
  updateElements() // Run on load
})
