import Splide from "@splidejs/splide";
import Slick from "slick-carousel";
import $ from "jquery";

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
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
        ],
    });
});

var currentActiveIndex = 0;
var isResponsiveMode = false;

document.addEventListener("DOMContentLoaded", () => {
    const windowWidth = window.innerWidth;
    isResponsiveMode = windowWidth < 500;

    var headerWrapper = document.querySelectorAll(".header-wrapper");
    headerWrapper = Array.from(headerWrapper);

    headerWrapper[currentActiveIndex].classList.add("active");

    console.log(isResponsiveMode);
    if(isResponsiveMode) {
        let responsiveImage = headerWrapper[0].getAttribute("data-responsive_image")
        headerWrapper[0].style.backgroundImage = `linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 135vw), url("${responsiveImage}")`;
    } else {
        let image = headerWrapper[0].getAttribute("data-image")
        headerWrapper[0].style.backgroundImage = `linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 46.875vw), linear-gradient(to left, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0) 50%), url( "${image} ")`;
    }


    new Splide(".splide", {
        direction: "rtl",
        perPage: 3,
        perMove: 3,
        fixedWidth: "30%",
        gap: "2rem",
        padding: "2rem",
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
        },
    }).mount();


    let headerWrapperLength = headerWrapper.length - 1;

   

    setInterval(() => {
        headerWrapper[currentActiveIndex].classList.remove("active");
        
        if (headerWrapperLength == currentActiveIndex) {
            currentActiveIndex = 0;
        } else {
            currentActiveIndex += 1;
        }
        headerWrapper[currentActiveIndex].classList.add("active");
        if(isResponsiveMode) {
            let responsiveImage = headerWrapper[currentActiveIndex].getAttribute("data-responsive_image")
            headerWrapper[currentActiveIndex].style.backgroundImage = `linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 135vw), url("${responsiveImage}")`;
        } else {
            let image = headerWrapper[currentActiveIndex].getAttribute("data-image")
            headerWrapper[currentActiveIndex].style.backgroundImage = `linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 46.875vw), linear-gradient(to left, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0) 50%), url( "${image}" )`;
        }
        
    }, 7000);

    // isResponsiveMode = windowWidth < 500;
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