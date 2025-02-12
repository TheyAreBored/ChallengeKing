document.addEventListener("DOMContentLoaded", function () {
  const starWrappers = document.querySelectorAll(".star-wrapper"); // Select all star-wrapper elements
  let lastScrollY = window.scrollY;
  let rotationY = Array(starWrappers.length).fill(0); // Initialize an array for all stars' rotations
  let scrollTimeout;
  let lastScrollDirection = 1;    // 1 for scrolling down/right, -1 for up/left

  // A helper to see if the current rotation is nearly “flat” (within ~2°)
  function nearlyFlat(angle) {
    // Normalize angle so remainder is in [0, 180)
    let remainder = ((angle % 180) + 180) % 180;
    return (remainder < 2 || remainder > 178);
  }

  window.addEventListener("scroll", function () {
    // Clear any pending “scroll stop” timeout
    clearTimeout(scrollTimeout);
    
    // Turn off the CSS transition while scrolling for immediate response
    starWrappers.forEach(starWrapper => {
      starWrapper.style.transition = "none";
    });

    let currentScrollY = window.scrollY;
    let scrollDiff = currentScrollY - lastScrollY;

    // Record the direction (if any movement)
    if (scrollDiff > 0) {
      lastScrollDirection = 1;
    } else if (scrollDiff < 0) {
      lastScrollDirection = -1;
    }

    // Update the rotation based on scroll difference for each star.
    starWrappers.forEach((starWrapper, index) => {
      rotationY[index] += scrollDiff * 0.5; // Adjust the multiplier to control the rotation speed
      starWrapper.style.transform = `rotateY(${rotationY[index]}deg)`;
    });

    lastScrollY = currentScrollY;

    // If no scroll events occur for 100ms, assume scrolling has stopped.
    scrollTimeout = setTimeout(() => {
      starWrappers.forEach((starWrapper, index) => {
        let targetRotation;
        if (lastScrollDirection > 0) {
          // If already nearly flat, force the star to continue one full step.
          if (nearlyFlat(rotationY[index])) {
            targetRotation = rotationY[index] + 180;
          } else {
            targetRotation = Math.ceil(rotationY[index] / 180) * 180;
          }
        } else {
          if (nearlyFlat(rotationY[index])) {
            targetRotation = rotationY[index] - 180;
          } else {
            targetRotation = Math.floor(rotationY[index] / 180) * 180;
          }
        }

        // Re-enable the CSS transition so the star “snaps” smoothly.
        starWrapper.style.transition = "transform 1.2s ease-in-out";
        starWrapper.style.transform = `rotateY(${targetRotation}deg)`;
        // Update our rotation tracker for the star
        rotationY[index] = targetRotation;
      });
    }, 100);
  });
});
