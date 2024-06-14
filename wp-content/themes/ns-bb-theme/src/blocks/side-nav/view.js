window.addEventListener("DOMContentLoaded", () => {
  const accordionToggles = document.querySelectorAll(".js-sidebar-toggle")
  if (accordionToggles.length > 0) {
    accordionToggles.forEach((item) => {
      item.addEventListener("click", (event) => {
        const parent = event.target.parentElement.parentElement
        parent.classList.toggle("--open")
      })
    })
  }
})
