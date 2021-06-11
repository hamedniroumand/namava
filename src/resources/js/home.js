import $ from "jquery";
import slick from "slick-carousel";

$(document).ready(() => {
    $(".default-row-items").slick({
        rtl: true,
        slidesToShow: 7,
        slidesToScroll: 7,
        dots: false,
        infinite: false,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false,
                },
            },
        ],
    });
    $(".collection-row-items").slick({
        rtl: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
        infinite: false,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                },
            },
        ],
    });
});

var currentActiveIndex = 0;
var isResponsiveMode = false;
var interval = null;

document.addEventListener("DOMContentLoaded", () => {
    const windowWidth = window.innerWidth;
    isResponsiveMode = windowWidth < 500;

    var headerWrapper = document.querySelectorAll(".header-wrapper");
    headerWrapper = Array.from(headerWrapper);

    let headerWrapperLength = headerWrapper.length - 1;

    const intervalFunc = () => {
            headerWrapper[currentActiveIndex].classList.remove("active");
            if (headerWrapperLength == currentActiveIndex) {
                currentActiveIndex = 0;
            } else {
                currentActiveIndex += 1;
            }
            headerWrapper[currentActiveIndex].classList.add("active");
            handleShowSlider(currentActiveIndex);        
    }

    const handleShowSlider = (activeIndex) => {
        if(isResponsiveMode) {
            let responsiveImage = headerWrapper[activeIndex].getAttribute("data-responsive_image")
            headerWrapper[activeIndex].style.backgroundImage = `linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 135vw), url("${responsiveImage}")`;
        } else {
            let image = headerWrapper[activeIndex].getAttribute("data-image")
            headerWrapper[activeIndex].style.backgroundImage = `linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 46.875vw), linear-gradient(to left, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0) 50%), url( "${image}" )`;
        }
        if(interval) {
            clearInterval(interval);
            interval = setInterval(intervalFunc, 7000);
        }
    }

    headerWrapper[currentActiveIndex].classList.add("active");

    handleShowSlider(0);

    interval = setInterval(intervalFunc, 7000);


    document.getElementById("prevSlider").addEventListener("click", () => {
        headerWrapper[currentActiveIndex].classList.remove("active");

        if (0 == currentActiveIndex) {
            currentActiveIndex = headerWrapperLength;
        } else {
            currentActiveIndex -= 1
        }
        headerWrapper[currentActiveIndex].classList.add("active");
        handleShowSlider(currentActiveIndex);
    });

    document.getElementById("nextSlider").addEventListener("click", () => {
        headerWrapper[currentActiveIndex].classList.remove("active");

        if (headerWrapperLength == currentActiveIndex) {
            currentActiveIndex = 0;
        } else {
            currentActiveIndex += 1
        }        

        headerWrapper[currentActiveIndex].classList.add("active");
        handleShowSlider(currentActiveIndex);
    });

});

window.addEventListener("resize", (e) => {
    const changedWidth = e.target.innerWidth; //windowWidth 
    isResponsiveMode = changedWidth < 500;

    let headerWrapper = document.querySelectorAll(".header-wrapper");
    headerWrapper = Array.from(headerWrapper);
    
    if(isResponsiveMode) {
        let responsiveImage = headerWrapper[currentActiveIndex].getAttribute("data-responsive_image")
            headerWrapper[currentActiveIndex].style.backgroundImage = `linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 135vw), url("${responsiveImage}")`;
    } else {
            let image = headerWrapper[currentActiveIndex].getAttribute("data-image")
            headerWrapper[currentActiveIndex].style.backgroundImage = `linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 46.875vw), linear-gradient(to left, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0) 50%), url( ${image} )`;
    }
});