document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".hidden"); // Wrapper divs
    const images = document.querySelectorAll(".fly-in-left, .fly-in-right, .fly-in-bottom"); // Images

    function updateElements() {
        const windowHeight = window.innerHeight;

        // Animate wrapper divs
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            let progress = (windowHeight - rect.top) / (windowHeight * 0.4);
            progress = Math.min(Math.max(progress, 0), 1);

            section.style.opacity = progress; // Fade in wrapper div
        });

        // Animate images separately when they enter viewport
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const imgProgress = (windowHeight - rect.top) / (windowHeight * 0.4);
            const isVisible = rect.top < windowHeight * 1; // 60% into viewport

            if (isVisible) {
                img.style.opacity = 1;
                img.style.transform = "translate(0, 0)";
            } else {
                img.style.opacity = Math.min(Math.max(imgProgress, 0), 1);

                if (img.classList.contains("fly-in-left")) {
                    img.style.transform = `translateX(${(1 - imgProgress) * -100}%)`;
                } else if (img.classList.contains("fly-in-right")) {
                    img.style.transform = `translateX(${(1 - imgProgress) * 100}%)`;
                } else if (img.classList.contains("fly-in-bottom")) {
                    img.style.transform = `translateY(${(1 - imgProgress) * 100}%)`; // Move up from below
                }
            }
        });
    }

    function animateOnLoad() {
        setTimeout(updateElements, 50);
    }

    animateOnLoad();
    window.addEventListener("scroll", updateElements);
    window.addEventListener("resize", updateElements);
});
