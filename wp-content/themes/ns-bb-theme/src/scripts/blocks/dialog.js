class NsDialog {
  constructor(domElement) {
    this.rawHTMLDialog = domElement
    this.open = false
    this.addEvents()
  }

  toggleDisplay() {
    if (this.rawHTMLDialog.open) {
      this.rawHTMLDialog.close()
    }
    this.rawHTMLDialog.showModal()
  }

  addEvents() {
    const topClose = this.rawHTMLDialog.querySelector(".js-dialog-close")
    if (topClose) {
      topClose.addEventListener("click", () => {
        this.rawHTMLDialog.close()
      })
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.dialogs = []
  const dialogs = document.querySelectorAll(".js-dialog")
  const dialogsKeeper = document.querySelector("#dialog-keeper")
  if (dialogs && dialogsKeeper) {
    dialogs.forEach((element) => {
      element.close()
      dialogsKeeper.append(element)
      const test = new NsDialog(element)
      window.dialogs.push(test)
    })
  }
})
