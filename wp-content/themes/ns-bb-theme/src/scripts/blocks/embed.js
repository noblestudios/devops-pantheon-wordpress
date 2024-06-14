window.addEventListener("DOMContentLoaded", () => {
  const youtubeLoadLinks = document.querySelectorAll(".js-yt-embed-load")
  if (youtubeLoadLinks.length > 0) {
    youtubeLoadLinks.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault()
        const iframe = document.createElement("iframe")
        iframe.setAttribute("src", event.target.dataset.videoUrl)
        iframe.setAttribute("title", "YouTube Video")
        iframe.classList.add("wp-block-embed__frame")
        iframe.setAttribute(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        )
        iframe.setAttribute("allowfullscreen", "")
        event.target.parentElement.classList.remove("--no-padding-top")
        event.target.parentElement.appendChild(iframe)
        event.target.remove()
      })
    })
  }
})
