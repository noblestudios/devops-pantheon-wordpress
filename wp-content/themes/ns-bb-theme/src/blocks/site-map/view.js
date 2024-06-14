window.addEventListener("DOMContentLoaded", () => {
  const dropToggles = document.querySelectorAll(".js-drop-toggle")
  if (dropToggles) {
    dropToggles.forEach((toggle) => {
      toggle.addEventListener("click", (event) => {
        event.target.parentElement.parentElement.classList.toggle("--open")
      })
    })
  }
})
