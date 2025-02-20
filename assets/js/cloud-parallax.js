window.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY;

    document.querySelector('.cloud_verysmall').style.transform = `translateY(${scrollPosition * 0.6}px)`;
    document.querySelector('.cloud_small').style.transform = `translateY(${scrollPosition * 0.7}px)`;
    document.querySelector('.cloud_medium').style.transform = `translateY(${scrollPosition * 0.8}px)`;
    document.querySelector('.cloud_large').style.transform = `translateY(${scrollPosition * 0.9}px)`;
    
});
