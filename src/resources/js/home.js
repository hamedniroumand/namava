import Splide from '@splidejs/splide';


document.addEventListener("DOMContentLoaded", () => {
    new Splide( '.splide', {
        direction: 'rtl',
        perPage: 3,
        perMove : 3,
        // height: '250px',
        fixedWidth: '30%',
        gap: '2rem',
        padding: '2rem',
        pagination: false,
        autoWidth: false,
        cover: true,
        breakpoints: {
            1280: {
                fixedWidth: 0,
                perPage: 2,
            },
            800: {
                fixedWidth: 0,
                perPage: 1,
            },
        }
    }).mount();
    let currentActiveIndex = 0;
    
    let headerWrapper = document.querySelectorAll(".header-wrapper");

    headerWrapper = Array.from(headerWrapper);
    headerWrapper[currentActiveIndex].classList.add("active")
    
    let headerWrapperLength = headerWrapper.length - 1;

    setInterval(() => {
        headerWrapper[currentActiveIndex].classList.remove("active");
        if(headerWrapperLength == currentActiveIndex) {
            currentActiveIndex = 0;
        } else {
            currentActiveIndex += 1;
        }        
        headerWrapper[currentActiveIndex].classList.add("active");
    }, 7000);
});
