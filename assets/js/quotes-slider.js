document.addEventListener("DOMContentLoaded", () => {
  // Grab our quote wrappers and navigation buttons.
  const quotes = document.querySelectorAll(".quote-wrapper");
  const prevBtn = document.getElementById("prev-quote");
  const nextBtn = document.getElementById("next-quote");

  let index = 0;
  let interval = null;
  const slideDuration = 7000; // 7 seconds

  // Function to show the quote at the new index.
  function showQuote(newIndex) {
    quotes[index].classList.remove("active");
    index = (newIndex + quotes.length) % quotes.length;
    quotes[index].classList.add("active");
  }

  // Functions to move to next or previous quote.
  function nextQuote() {
    showQuote(index + 1);
  }
  function prevQuote() {
    showQuote(index - 1);
  }

  // Start auto sliding if not already running.
  function startSlider() {
    if (!interval) {
      interval = setInterval(nextQuote, slideDuration);
    }
  }

  // Stop auto sliding and clear the interval.
  function stopSlider() {
    clearInterval(interval);
    interval = null;
  }

  // Reset the timer: stop any current timer then start a new one.
  function resetAutoSlide() {
    stopSlider();
    startSlider();
  }

  // Intersection observer to pause slider when out of view.
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

  // Swipe detection on touch devices.
  let startX = 0;
  const swipeThreshold = 50;

  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
  }
  function handleTouchMove(e) {
    if (!startX) return;
    let diffX = startX - e.touches[0].clientX;
    if (Math.abs(diffX) > swipeThreshold) {
      // If swiped left, go to next; if right, previous.
      diffX > 0 ? nextQuote() : prevQuote();
      startX = 0; // reset for this gesture
      resetAutoSlide();
    }
  }
  const container = document.querySelector(".quote-container");
  container.addEventListener("touchstart", handleTouchStart);
  container.addEventListener("touchmove", handleTouchMove);

  // Click listeners for the arrow buttons.
  prevBtn.addEventListener("click", () => {
    prevQuote();
    resetAutoSlide();
  });
  nextBtn.addEventListener("click", () => {
    nextQuote();
    resetAutoSlide();
  });

  // Start with the first quote visible and kick off auto-slide.
  quotes[index].classList.add("active");
  startSlider();
});
