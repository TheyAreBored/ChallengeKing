window.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY;

    document.querySelector('.cloud-1').style.transform = `translateY(${scrollPosition * 0.6}px)`;
    document.querySelector('.cloud-2').style.transform = `translateY(${scrollPosition * 0.7}px)`;
    document.querySelector('.cloud-3').style.transform = `translateY(${scrollPosition * 0.8}px)`;
});
