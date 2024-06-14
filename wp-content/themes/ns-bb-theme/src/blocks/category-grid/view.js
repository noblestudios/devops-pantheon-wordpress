import Swiper, { Navigation } from "swiper"

class categoryGridSwiper {
  constructor(wrapper) {
    this.swiper = new Swiper(wrapper, {
      modules: [Navigation],
      direction: "horizontal",
      loop: false,
      slidesPerView: "auto",
      // slidesOffsetAfter: 1300,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    })
  }
}

const sliders = document.querySelectorAll(".js-category-grid-swiper")

if (sliders) {
  sliders.forEach((slider) => {
    new categoryGridSwiper(slider)
  })
}
