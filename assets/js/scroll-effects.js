document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".hidden") // Each wrapper div
  const windowHeight = window.innerHeight

  function updateElements() {
    const scrollTop = window.scrollY

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      const elementHeight = rect.height

      // Progress: 0 when fully out of view (below), 1 when 40% through div
      let progress = (windowHeight - rect.top) / (windowHeight * 0.4)
      progress = Math.min(Math.max(progress, 0), 1) // Keep within 0-1 range

      // Ensure full opacity & no movement when fully in view
      if (rect.top >= 0 && rect.bottom <= windowHeight) {
        progress = 1
      }

      // Apply transformations
      section.style.opacity = progress

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

  function animateOnLoad() {
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect()

      if (rect.top < windowHeight) {
        // Apply transition instantly for visible sections
        section.style.transition =
          "opacity 0.6s ease-out, transform 0.6s ease-out"
        section.style.opacity = 1
        section.style.transform = "translateX(0)" // Reset position

        section.querySelectorAll(".fly-in-left").forEach((el) => {
          el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
          el.style.opacity = 1
          el.style.transform = "translateX(0)"
        })

        section.querySelectorAll(".fly-in-right").forEach((el) => {
          el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
          el.style.opacity = 1
          el.style.transform = "translateX(0)"
        })
      }
    })
  }

  // Run the on-load animation
  animateOnLoad()

  // Run scroll-based animations
  window.addEventListener("scroll", updateElements)
  updateElements() // Run on load to set initial positions
})
