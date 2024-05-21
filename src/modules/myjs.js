let btn_mobile = document.querySelector(".mobile");
let mobile_menu = document.querySelector(".mobile_menu");
let close_btn = document.querySelector(".close_btn");
let search_btn = document.querySelector(".search_btn");
let input_search = document.querySelector(".input_search");
let close_search = document.querySelector(".close_search");
import "animate.css";
btn_mobile.addEventListener("click", () => {
  mobile_menu.classList.remove("hidden");
  mobile_menu.classList.add("animate__backInLeft");
});

close_btn.addEventListener("click", () => {
  mobile_menu.classList.remove("animate__backInLeft");
  mobile_menu.classList.add("animate__backOutLeft");
  setTimeout(() => {
    mobile_menu.classList.remove("animate__backOutLeft");
    mobile_menu.classList.add("hidden");
  }, 500);
});

window.addEventListener(
  "resize",
  () => {
    let screenWidth = window.screen.width;
    if (screenWidth > 590) {
      mobile_menu.classList.add("hidden");
    }
  },
  true
);

search_btn.addEventListener("click", () => {
  input_search.classList.remove("width0");
  close_search.classList.remove("hidden");
  input_search.classList.add("animate__slideInRight");
});

close_search.addEventListener("click", () => {
  input_search.classList.add("width0");
  close_search.classList.add("hidden");

  input_search.classList.remove("animate__slideInRight");
});

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
});
