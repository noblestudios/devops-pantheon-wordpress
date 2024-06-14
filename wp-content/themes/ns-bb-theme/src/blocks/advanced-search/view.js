const { __ } = wp.i18n
export default class ListingController {
  constructor(listings) {
    this.listingTemplateOptions = listingArgs
    this.urlParams = new URLSearchParams(window.location.search)
    this.elements = {
      parent: listings,
      navBar: listings.querySelector(".js-pageNav"),
      navNext: listings.querySelector(".js-navNext"),
      navPrevious: listings.querySelector(".js-navPrev"),
      navPageNumbers: listings.querySelector(".js-navPageNumbers"),
      list: listings.querySelector(".js-results"),
      filterForm: listings.querySelector("#js-filterForm"),
      baseFields: listings.querySelectorAll(".js-filter"),
      triggerFields: listings.querySelectorAll(".js-autoFilter"),
      searchFields: listings.querySelectorAll(".js-searchField"),
      formSubmit: listings.querySelectorAll(".js-formSubmit"),
      resultsCount: listings.querySelector(".js-resultsCount"),
      filterToggle: listings.querySelectorAll(".js-filterToggle"),
      searchFilters: listings.querySelector(".js-searchFilters"),
      clearTriggers: listings.querySelectorAll(".js-clearTrigger"),
      filterCount: listings.querySelector(".js-filterCount")
    }

    this.setQueryParams()

    this.prepopulate = this.listingTemplateOptions.prepopulate

    this.numPages = 0
    this.numResults = 0
    this.totalResults = 0

    if (this.elements.navBar) {
      this.elements.navBar.addEventListener("click", this.turnPage.bind(this))
    }

    if (this.elements.triggerFields) {
      this.elements.triggerFields.forEach(
        function (field) {
          field.addEventListener("change", this.updateFilters.bind(this))
        }.bind(this)
      )
    }

    if (this.elements.filterToggle) {
      this.elements.filterToggle.forEach(
        function (button) {
          button.addEventListener("click", this.filterToggle.bind(this))
        }.bind(this)
      )
    }

    if (this.elements.clearTriggers) {
      this.elements.clearTriggers.forEach((button) => {
        button.addEventListener("click", this.clearFilters.bind(this))
      })
    }

    if (this.elements.formSubmit) {
      this.elements.formSubmit.forEach((button) => {
        button.addEventListener("click", this.submitForm.bind(this))
      })
    }

    const searchCollection = wp.api.collections.Posts.extend({
      url: wpApiSettings.root + "ns/v1/adv-search"
    })

    this.collection = new searchCollection()

    if (!this.prepopulate) {
      this.getPosts()
    }
  }

  setQueryParams() {
    this.queryParams = {
      page: 1,
      per_page: this.listingTemplateOptions.limit
    }

    this.elements.baseFields.forEach((field) => {
      if (field.value) this.queryParams[field.name] = field.value
    })

    for (const [key, value] of this.urlParams.entries()) {
      if (key === "page_num") {
        this.queryParams.page = value
      } else {
        const field = this.elements.parent.querySelector(
          '.js-autoFilter[name="' + key + '"], .js-searchField[name="' + key + '"]'
        )

        if (field) {
          if (field.type === "checkbox") {
            const checkboxes = this.elements.parent.querySelectorAll('.js-autoFilter[name="' + key + '"]')
            const cbva = value.split(",")
            checkboxes.forEach((cb) => {
              if (cbva.includes(cb.value)) {
                cb.checked = true
              }
            })
            this.queryParams[key] = cbva

            // update filter count
            if (key === "type") {
              this.updateFilterCount(cbva)
            }
          } else {
            field.value = value
            this.queryParams[key] = value
          }
        }
      }
    }
  }

  updateFilterCount(cbva) {
    let countText = ``
    if (cbva.length) {
      countText = ` (${cbva.length} ${__("Applied", "ns")})`
    }
    this.elements.filterCount.innerHTML = countText
    this.elements.clearTriggers.forEach((trigger) => {
      if (cbva.length) {
        trigger.classList.remove("--is-hidden")
      } else {
        trigger.classList.add("--is-hidden")
      }
    })
  }

  clearResults() {
    this.elements.list.innerHTML = ""
    window.scrollTo({
      top: this.elements.list.offsetTop - 120,
      behavior: "smooth"
    })
  }

  turnPage(event) {
    const button = event.target
    if (
      !button.classList.contains("js-navPrev") &&
      !button.classList.contains("js-navNext") &&
      !button.classList.contains("js-navPageNum")
    ) {
      return
    }
    if (button.classList.contains("js-navPrev")) {
      this.queryParams.page--
      this.clearResults()
    } else if (button.classList.contains("js-navNext")) {
      this.queryParams.page++
      this.clearResults()
    } else if (button.classList.contains("js-navPageNum")) {
      this.queryParams.page = parseInt(button.dataset.page)
      this.clearResults()
    } else {
      return false
    }
    button.blur()
    this.urlParams.set("page_num", this.queryParams.page)
    this.getPosts()
  }

  submitForm(event) {
    event.preventDefault()
    this.elements.searchFields.forEach((field) => {
      if (field.value) {
        this.queryParams[field.name] = field.value
        this.urlParams.set(field.name, field.value)
      } else {
        delete this.queryParams[field.name]
        this.urlParams.delete(field.name)
      }
    })
    this.clearResults()
    this.queryParams.page = 1
    this.urlParams.set("page_num", 1)
    this.getPosts()
  }

  updateFilters(event) {
    const values = new FormData(this.elements.filterForm)
    const field = event.target

    this.queryParams.page = 1
    this.urlParams.set("page_num", 1)

    if (field.type === "checkbox") {
      const cbv = values.getAll(field.name)
      if (cbv.length) {
        this.queryParams[field.name] = cbv
        this.urlParams.set(field.name, cbv)
      } else {
        delete this.queryParams[field.name]
        this.urlParams.delete(field.name)
      }
    } else if (!field.value) {
      delete this.queryParams[field.name]
      this.urlParams.delete(field.name)
    } else {
      this.queryParams[field.name] = field.value
      this.urlParams.set(field.name, field.value)
    }

    this.updateFilterCount(this.queryParams.type ? this.queryParams.type : [])
    this.clearResults()
    this.getPosts()
  }

  getPosts() {
    if (this.elements.navBar) {
      this.elements.navBar.classList.add("--is-loading")
    }

    const p = this.urlParams.toString()
    if (p.length > 0) {
      window.history.pushState(null, null, "?" + p)
    }

    const query = {
      data: this.queryParams
    }

    this.collection
      .fetch(query)
      .then((response, status, functions) => {
        if (this.elements.navBar) {
          this.elements.navBar.classList.remove("--is-loading")
        }
        this.numPages = functions.getResponseHeader("x-wp-totalpages")
        this.numResults = response.length
        this.totalResults = functions.getResponseHeader("x-wp-total")

        this.elements.list.dataset.totalResults = this.totalResults

        response.forEach((post) => {
          this.elements.list.innerHTML += this.renderItem(post)
        })

        if (response.length === 0) {
          this.elements.list.innerHTML += `<div class="wp-block-ns-listing__no-result">${this.listingTemplateOptions.noResultsText}</div>`
        }

        if (this.elements.navBar) {
          this.setPageLinks()
        }

        if (this.elements.resultsCount) {
          this.setResultCount()
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err)
      })

    return false
  }

  setPagingLinks() {
    this.queryParams.page = parseInt(this.queryParams.page)

    // eslint-disable-next-line eqeqeq
    if (this.queryParams.page == this.numPages) {
      this.elements.navNext.disabled = true
    } else if (this.elements.navNext.disabled) {
      this.elements.navNext.disabled = false
    }
    // eslint-disable-next-line eqeqeq
    if (this.queryParams.page == 1) {
      this.elements.navPrevious.disabled = true
    } else if (this.elements.navPrevious.disabled) {
      this.elements.navPrevious.disabled = false
    }
  }

  setPageLinks() {
    if (this.numPages > 1) {
      this.elements.navBar.classList.remove("--hide")
    } else {
      this.elements.navBar.classList.add("--hide")
    }

    this.setPagingLinks()
    const paginationIndexes = this.getPageIndexes()

    this.elements.navPageNumbers.innerHTML = ""
    paginationIndexes.forEach((index) => {
      if (index === "...") {
        this.elements.navPageNumbers.innerHTML += '<button class="page-nav__page-num" disabled>....</button>'
        // eslint-disable-next-line eqeqeq
      } else if (index == this.queryParams.page) {
        this.elements.navPageNumbers.innerHTML += '<button class="page-nav__page-num --current">' + index + "</button>"
      } else {
        this.elements.navPageNumbers.innerHTML +=
          '<button class="page-nav__page-num js-navPageNum" data-page="' + index + '">' + index + "</button>"
      }
    })
  }

  setResultCount() {
    const count = "We found " + this.totalResults + " total results for your search."
    this.elements.resultsCount.innerHTML = count
  }

  getPageIndexes() {
    const page = parseInt(this.queryParams.page)
    this.queryParams.page = parseInt(this.queryParams.page)
    this.numPages = parseInt(this.numPages)
    const paginationValues = []

    // output all page numbers if 6 or fewer pages
    if (this.numPages <= 6) {
      for (let i = 1; i <= this.numPages; i++) {
        paginationValues.push(i)
      }
    } else if (page + 5 < this.numPages) {
      paginationValues.push(page)
      paginationValues.push(page + 1)
      paginationValues.push(page + 2)
      paginationValues.push("...")
      paginationValues.push(this.numPages - 2)
      paginationValues.push(this.numPages - 1)
      paginationValues.push(this.numPages)
    } else {
      for (let i = this.numPages; i >= this.numPages - 5; i--) {
        paginationValues.unshift(i)
      }
      paginationValues.unshift("...")
    }
    return paginationValues
  }

  clearFilters() {
    const filters = this.elements.filterForm.querySelectorAll(".js-autoFilter")
    if (filters) {
      filters.forEach((input) => {
        input.checked = false
      })
    }
    this.urlParams.delete("type")
    this.urlParams.set("page_num", 1)
    this.queryParams.page = 1
    delete this.queryParams.type
    this.updateFilterCount([])
    this.clearResults()
    this.getPosts()
  }

  filterToggle(event) {
    this.elements.searchFilters.classList.toggle("--is-open")
    event.target.blur()
  }

  renderItem(itemData) {
    const image = itemData.featured_image_url_sizes.medium_large
    const date = new Date(itemData.date)
    const options = { month: "long", day: "numeric", year: "numeric" }
    const formatedDate = date.toLocaleDateString("en-US", options)
    const dateHTML = `${__("Posted on", "ns")} <date>${formatedDate}</date>`

    const listItem = `
      <div class="paginated-result-wide" data-post-type="${itemData.type}">
        <div class="paginated-result-wide__image">
          <img src="${image}" alt="${itemData.title}"/>
        </div>
        <div class="paginated-result-wide__body">
          <div class="paginated-result-wide__body-type --eyebrow">
            ${itemData.post_type_label}
          </div>
          <div class="paginated-result-wide__body-title --hl-xs">
            ${itemData.title}
          </div>
          ${
            itemData.type === "post"
              ? `
            <div class="paginated-result-wide__body-byline">${dateHTML} by ${itemData.author_name}</div>
          `
              : ""
          }
          <div class="paginated-result-wide__body-excerpt">
            ${itemData.excerpt}
          </div>
          <a href="${itemData.link}" class="paginated-result-wide__body-cta">${__("Read More", "ns")}</a>
        </div>
      </div>`
    return listItem
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const listingContainerElement = document.querySelectorAll(".js-search-listing")
  if (listingContainerElement) {
    listingContainerElement.forEach((element) => {
      wp.api.loadPromise.done(function () {
        new ListingController(element)
      })
    })
  }
})
