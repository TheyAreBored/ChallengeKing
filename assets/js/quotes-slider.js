document.addEventListener("DOMContentLoaded", () => {
  const quotes = document.querySelectorAll(".quote-wrapper");
  const slider = document.querySelector(".quote-slider");
  const prevBtn = document.getElementById("prev-quote");
  const nextBtn = document.getElementById("next-quote");
  let index = 0;
  let interval = null;
  const slideDuration = 7000; // 7 seconds

  function showQuote(newIndex) {
    quotes[index].classList.remove("active");
    index = (newIndex + quotes.length) % quotes.length;
    quotes[index].classList.add("active");
    adjustContainerHeight();
  }

  function nextQuote() {
    showQuote(index + 1);
  }

  function prevQuote() {
    showQuote(index - 1);
  }

  function startSlider() {
    if (!interval) {
      interval = setInterval(nextQuote, slideDuration);
    }
  }

  function stopSlider() {
    clearInterval(interval);
    interval = null;
  }

  function resetAutoSlide() {
    stopSlider();
    startSlider();
  }

  // Adjust container height based on the active quote's height.
  function adjustContainerHeight() {
    const activeSlide = document.querySelector(".quote-wrapper.active");
    if (activeSlide) {
      slider.style.height = activeSlide.offsetHeight + "px";
    }
  }

  // Pause the slider if the container is not in the viewport.
  const observer = new IntersectionObserver(
    (entries) => {
      const isVisible = entries[0].isIntersecting;
      if (isVisible) {
        startSlider();
      } else {
        stopSlider();
      }
    },
    { threshold: 0.1 }
  );
  observer.observe(document.querySelector(".quote-container"));

  // Swipe detection for touch devices.
  let startX = 0;
  const swipeThreshold = 50;

  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
  }
  function handleTouchMove(e) {
    if (!startX) return;
    let diffX = startX - e.touches[0].clientX;
    if (Math.abs(diffX) > swipeThreshold) {
      diffX > 0 ? nextQuote() : prevQuote();
      startX = 0;
      resetAutoSlide();
    }
  }
  const container = document.querySelector(".quote-container");
  container.addEventListener("touchstart", handleTouchStart);
  container.addEventListener("touchmove", handleTouchMove);

  // Arrow click listeners.
  prevBtn.addEventListener("click", () => {
    prevQuote();
    resetAutoSlide();
  });
  nextBtn.addEventListener("click", () => {
    nextQuote();
    resetAutoSlide();
  });

  // Initialize: show first quote and adjust container height.
  quotes[index].classList.add("active");
  adjustContainerHeight();
  startSlider();
});
