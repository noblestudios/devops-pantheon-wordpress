window.addEventListener("DOMContentLoaded", () => {
  const bar = document.querySelector(".js-anchor-bar")
  const anchors = document.querySelectorAll(".anchor-me")

  if (bar && anchors) {
    let baseClass = "horizontal"
    baseClass = bar.dataset.classBase
    anchors.forEach((anchor) => {
      const anchorElement = document.createElement("li")
      const anchorButtonElement = document.createElement("button")
      anchorElement.classList.add(baseClass + "-anchor__item")
      anchorButtonElement.classList.add(baseClass + "-anchor__item-button")
      anchorButtonElement.innerText = anchor.innerText
      anchorButtonElement.addEventListener("click", () => {
        anchor.scrollIntoView()
      })
      anchorElement.appendChild(anchorButtonElement)
      bar.appendChild(anchorElement)
    })
  }
})
