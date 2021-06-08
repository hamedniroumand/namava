import $ from "jquery"
import "@iconfu/svg-inject";

let oldScroll = 0;
document.addEventListener("scroll", (event) => {
    scrollHandler();
});

const scrollHandler = () => {
    const nav = document.getElementsByTagName("nav")[0];
    const topOfWindow = window.scrollY;
    if (topOfWindow > oldScroll) { // scroll down
        if (topOfWindow > 0) {
            if(nav.classList.contains("fix")) nav.classList.remove("fix")
            // if (nav.style.position !== "absolute") nav.style.position = "absolute";
        } else {
            if(!nav.classList.contains("fix")) nav.classList.add("fix")
            // if (nav.style.position !== "fixed") nav.style.position = "fixed";
        }
    } else { // scroll up
        if (topOfWindow > 0) {
            if(!nav.classList.contains("fix")) nav.classList.add("fix")
            // if (nav.style.position !== "fixed") nav.style.position = "fixed";
        } else {
            if(nav.classList.contains("fix")) nav.classList.remove("fix")
            // if (nav.style.position !== "absolute") nav.style.position = "absolute";
        }
    }
    oldScroll = topOfWindow;
}


document.addEventListener("DOMContentLoaded", () => {
    const closes = document.querySelectorAll('.close-side-nav');
    Array.from(closes).forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector('.side-nav').classList.toggle("active")
            document.querySelector('.wrapper').classList.toggle("active")
        });
    });

    document.addEventListener("click", (e) => {
        const clickPosition = e.x;
        const windowWidth = window.innerWidth;
        const sideNavWidth = 280;

        if(clickPosition < (windowWidth-sideNavWidth)) {
            document.querySelector('.side-nav').classList.remove("active")
            document.querySelector('.wrapper').classList.remove("active")
        }
    });
});