window.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY;

    // Select ALL elements and loop through them
    document.querySelectorAll('.cloud_small').forEach(function(cloud) {
        cloud.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    });

    document.querySelectorAll('.cloud_medium').forEach(function(cloud) {
        cloud.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });

    document.querySelectorAll('.cloud_large').forEach(function(cloud) {
        cloud.style.transform = `translateY(${scrollPosition * 0.7}px)`;
    });
});
