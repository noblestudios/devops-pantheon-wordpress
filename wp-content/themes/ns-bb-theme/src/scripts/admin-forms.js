// eslint-disable-next-line no-undef, prettier/prettier
jQuery(document).ready(function ($) {
  // clear new term form fields when saved
  let numberOfTags = 0
  let newNumberOfTags = 0

  if (!$("#the-list").children("tr").first().hasClass("no-items")) {
    numberOfTags = $("#the-list").children("tr").length
  }

  $(document).ajaxComplete(function () {
    newNumberOfTags = $("#the-list").children("tr").length
    if (parseInt(newNumberOfTags) > parseInt(numberOfTags)) {
      numberOfTags = newNumberOfTags

      $("#addtag .js-imageSelect.ns-add-clear").each(function () {
        $(this).removeClass("--has-value")
        $(this).find(".js-value").val("0")
        $(this).find("img").attr("src", "")
      })

      $("#addtag select.ns-add-clear").each(function () {
        $(this).val($(this).find("option:first").val())
      })
    }
  })
})

// image field script
class imageSelector {
  constructor(field) {
    this.field = field
    this.remove = field.querySelector(".js-remove")
    this.select = field.querySelector(".js-selectImage")
    this.input = field.querySelector(".js-value")
    this.img = field.querySelector("img")
    this.select.addEventListener("click", this.selectImage.bind(this))
    this.remove.addEventListener("click", this.removeImage.bind(this))
  }

  selectImage(event) {
    event.preventDefault()
    const imageFrame = wp.media({
      title: "Select Image",
      multiple: false,
      library: {
        type: "image"
      }
    })
    const field = this.field
    const input = this.input
    const img = this.img

    imageFrame.on("close", function () {
      const selection = imageFrame.state().get("selection")
      let imageId = false
      let imageURL
      selection.each(function (attachment) {
        if (parseInt(attachment.id)) {
          imageId = attachment.id
          imageURL = attachment.attributes.url
        }
      })

      if (imageId) {
        input.value = imageId
        img.src = imageURL
        field.classList.add("--has-value")
      } else {
        input.value = 0
        img.src = ""
        field.classList.remove("--has-value")
      }
    })

    imageFrame.on("open", function () {
      const selection = imageFrame.state().get("selection")
      const id = input.value
      const attachment = wp.media.attachment(id)
      attachment.fetch()
      selection.add(attachment ? [attachment] : [])
    })

    imageFrame.open()
  }

  removeImage() {
    this.field.classList.remove("--has-value")
    this.input.value = "0"
    this.img.src = ""
  }
}

const fields = document.querySelectorAll(".js-imageSelect")

if (fields) {
  fields.forEach((block) => {
    new imageSelector(block)
  })
}
