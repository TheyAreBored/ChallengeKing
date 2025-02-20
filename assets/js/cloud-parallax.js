window.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY;

    document.querySelector('.cloud_small').style.transform = `translateY(${scrollPosition * 0.3}px)`;
    document.querySelector('.cloud_medium').style.transform = `translateY(${scrollPosition * 0.5}px)`;
    document.querySelector('.cloud_large').style.transform = `translateY(${scrollPosition * 0.7}px)`;
    
});
