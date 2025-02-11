document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".hidden"); // Each wrapper div
    const images = document.querySelectorAll(".fly-in-left, .fly-in-right"); // Image elements

    function updateElements() {
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            
            // Progress: 0 when fully out of view, 1 when 40% into the div
            let progress = (windowHeight - rect.top) / (windowHeight * 0.4);
            progress = Math.min(Math.max(progress, 0), 1); 

            section.style.opacity = progress; // Fade in wrapper div

            section.querySelectorAll(".fly-in-left, .fly-in-right").forEach(el => {
                el.style.opacity = progress;
                el.style.transform = `translateX(${(1 - progress) * (el.classList.contains("fly-in-left") ? -100 : 100)}%)`;
            });
        });

        // Handle images separately to delay their animation until visible
        images.forEach(img => {
            const rect = img.getBoundingClientRect();

            // Only animate when the image is at least 40% visible
            if (rect.top < windowHeight * 0.6) {
                img.style.opacity = 1;
                img.style.transform = "translateX(0)";
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
