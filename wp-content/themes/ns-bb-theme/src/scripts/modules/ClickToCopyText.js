class ClickToCopy {
  constructor() {
    this.elements = null
  }

  /**
   * Called in the main.js file to set things up
   */
  init() {
    this.getElements()
    this.addEvents()
  }

  /**
   * Grabs all the critical elements and some of the information they
   * have attached to them
   */
  getElements() {
    this.elements = document.querySelectorAll(".js-copy-btn")
  }

  /**
   * Click event for any copy text elements
   */
  addEvents() {
    if (this.elements) {
      this.elements.forEach((ele) => {
        ele.addEventListener("click", () => {
          /**
           * One big thing to note here, you are automatically granted
           * clipboard access if you are over a secure connection, we don't
           * have that on our locals (or at least I don't) so none of this
           * is going to execute until we are on one of the testing environment.
           *
           */
          if (window.navigator.clipboard) {
            // Write the text to the clipboard
            // This returns a promise but we don't really care about that since
            // we dont really need to do anyhting with the results. We just want
            // to copy and bail
            window.navigator.clipboard.writeText(ele.dataset.link)

            // Grab the message ele within the button and make it visible
            const message = ele.querySelector(".js-copy-message")

            if (message) {
              message.classList.remove("--hidden")
            }

            // Rehide the message after 2.5 seconds
            setTimeout(() => {
              message.classList.add("--hidden")
            }, 2500)
          }
        })
      })
    }
  }
}

export default ClickToCopy
