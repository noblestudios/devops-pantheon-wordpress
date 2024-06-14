import Swiper, { Pagination, Navigation } from "swiper"

class stakeGallerySlider {
  constructor(slider) {
    const swiperArgs = {
      modules: [Pagination, Navigation],
      speed: 800,
      grabCursor: true,
      slidesPerView: "auto",
      autoplay: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    }
    new Swiper(slider, swiperArgs)
  }
}

document.querySelectorAll(".js-stakeGallery").forEach((slider) => {
  new stakeGallerySlider(slider)
})
