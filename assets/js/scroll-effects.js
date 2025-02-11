document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".hidden"); // Wrapper divs
    const images = document.querySelectorAll(".fly-in-left, .fly-in-right"); // Images

    function updateElements() {
        const windowHeight = window.innerHeight;

        // Animate wrapper divs
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            let progress = (windowHeight - rect.top) / (windowHeight * 0.3);
            progress = Math.min(Math.max(progress, 0), 1);

            section.style.opacity = progress; // Fade in wrapper div
        });

        // Animate images separately when they enter viewport
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const imgProgress = (windowHeight - rect.top) / (windowHeight * 0.3);
            const isVisible = rect.top < windowHeight * 0.4; // 60% into viewport

            if (isVisible) {
                img.style.opacity = 1;
                img.style.transform = "translateX(0)";
            } else {
                img.style.opacity = Math.min(Math.max(imgProgress, 0), 1);
                img.style.transform = `translateX(${(1 - imgProgress) * (img.classList.contains("fly-in-left") ? -100 : 100)}%)`;
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
