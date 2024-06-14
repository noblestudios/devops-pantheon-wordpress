const accordionToggles = document.querySelectorAll(".js-accordion-toggle")
if (accordionToggles.length > 0) {
  accordionToggles.forEach((item) => {
    item.addEventListener("click", (event) => {
      const sib = event.target.parentElement
      sib.classList.toggle("--open")
    })
  })
}
