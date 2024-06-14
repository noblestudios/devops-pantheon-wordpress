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
      subMenuToggle: listings.querySelectorAll(".js-submenuToggle"),
      mobileFilterToggle: listings.querySelectorAll(".js-toggle-filters"),
      filters: listings.querySelector(".js-filter-wrapper"),
    }

    this.setQueryParams()

    this.postType = this.listingTemplateOptions.postType
    this.autoSubmit = this.listingTemplateOptions.autoSubmit
    this.prepopulate = this.listingTemplateOptions.prepopulateResults
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

    if (this.elements.subMenuToggle) {
      this.elements.subMenuToggle.forEach(
        function (trigger) {
          trigger.addEventListener("click", this.toggleSubMenu.bind(this))
        }.bind(this)
      )
    }

    if (this.elements.formSubmit) {
      this.elements.formSubmit.forEach((button) => {
        button.addEventListener("click", this.submitForm.bind(this))
      })
    }

    if (this.elements.mobileFilterToggle) {
      this.elements.mobileFilterToggle.forEach((button) => {
        button.addEventListener("click", this.toggleMobileFilters.bind(this))
      })
    }

    this.setCollection()

    if (!this.prepopulate) {
      this.getPosts()
    }
  }

  setQueryParams() {
    this.queryParams = {
      page: 1,
      per_page: this.listingTemplateOptions.limit,
      orderby: this.listingTemplateOptions.orderBy,
      order: this.listingTemplateOptions.order,
    }

    this.elements.baseFields.forEach((field) => {
      if (field.value && field.value !== "0") this.queryParams[field.name] = field.value
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
          } else if (field.type === "radio") {
            const radios = this.elements.parent.querySelectorAll('.js-autoFilter[name="' + key + '"]')
            radios.forEach((r) => {
              if (value === r.value) {
                r.checked = true
              } else {
                r.checked = false
              }
            })
            this.queryParams[key] = value
          } else {
            field.value = value
            this.queryParams[key] = value
          }
        }
      }
    }
  }

  setCollection() {
    if (this.postType === "post") {
      this.collection = new wp.api.collections.Posts()
    } else if (this.postType === "tribe_events") {
      this.collection = new wp.api.collections.Tribe_events()
    } else if (this.postType === "stakeholder") {
      this.collection = new wp.api.collections.Stakeholder()
    }
  }

  clearResults() {
    this.elements.list.innerHTML = ""
    window.scrollTo({
      top: this.elements.list.offsetTop - 120,
      behavior: "smooth",
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
    } else if (!field.value || field.value === "0") {
      delete this.queryParams[field.name]
      this.urlParams.delete(field.name)
    } else {
      this.queryParams[field.name] = field.value
      this.urlParams.set(field.name, field.value)
    }
    if (this.autoSubmit) {
      this.clearResults()
      this.getPosts()
    }
  }

  toggleMobileFilters() {
    this.elements.filters.classList.toggle("--is-open")
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
      data: this.queryParams,
    }

    query.data.filtered = true

    //get the order (asc, desc) setting from the sortingOptions block.json attribute for the selected orderby option

    query.data.order = this.listingTemplateOptions.sortingOptions[query.data.orderby].order

    // parse through the parameters. If any of them have matching taxonomy search rules, apply the object
    // for (const key in query.data) {
    //   // if (
    //   //   this.listingTemplateOptions.taxFilterOptions[key] !== undefined &&
    //   //   typeof query.data[key].terms === "undefined"
    //   // ) {
    //   //   const value = query.data[key]
    //   //   query.data[key] = {
    //   //     terms: value,
    //   //     // operator: this.listingTemplateOptions.taxFilterOptions[key].operator,
    //   //     // include_children: this.listingTemplateOptions.taxFilterOptions[key].include_children,
    //   //   }
    //   // }
    // }

    if (
      this.listingTemplateOptions.preSelectedTaxonomy &&
      this.listingTemplateOptions.preSelectedTerm &&
      !query.data[this.listingTemplateOptions.preSelectedTaxonomy]
    ) {
      query.data[this.listingTemplateOptions.preSelectedTaxonomy] = this.listingTemplateOptions.preSelectedTerm
    }

    if (this.listingTemplateOptions.postType === "tribe_events") {
      query.data.future_only = true
    }

    this.collection
      .fetch(query)
      .then((response, status, functions) => {
        if (this.elements.navBar) {
          this.elements.navBar.classList.remove("--is-loading")
          this.elements.navBar.classList.remove("--hide")
        }
        this.numPages = functions.getResponseHeader("x-wp-totalpages")
        this.numResults = response.length
        this.totalResults = functions.getResponseHeader("x-wp-total")

        response.forEach((post) => {
          this.elements.list.innerHTML += this.renderItem(post)
        })

        if (response.length === 0) {
          this.elements.list.innerHTML += `<div class="wp-block-ns-listing__no-result">${this.listingTemplateOptions.noResultsText}</div>`
          this.elements.navBar.classList.add("--hide")
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
    let count
    const perpage = this.queryParams.per_page

    if (!this.numPages && !this.numResults) {
      count = ""
      // eslint-disable-next-line eqeqeq
    } else if (this.numPages == "1" && this.numResults == "1") {
      count = "1 Result"
      // eslint-disable-next-line eqeqeq
    } else if (this.numPages == "1" && this.numResults) {
      count = this.numResults + " Results"
    } else {
      const first = this.queryParams.page > 1 ? perpage * this.queryParams.page - perpage + 1 : 1
      const last = first + this.numResults - 1

      count = "Showing " + first + "&ndash;" + last + " of " + this.totalResults + " results"
    }
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

  toggleSubMenu(event) {
    const parent = event.target.closest(".js-subMenu")
    parent.classList.toggle("--is-open")
  }

  renderItem(itemData) {
    const image = itemData.featured_image_url_sizes.medium_large
    let listItem = document.createElement("li")
    listItem.href = itemData.link

    const date = new Date(itemData.date)
    const options = { month: "long", day: "numeric", year: "numeric" }
    const formatedDate = date.toLocaleDateString("en-US", options)

    let dateHTML = ``
    dateHTML = `Posted <date>${formatedDate}</date>`

    listItem = `<li class="wp-block-ns-listing__item">
        <div class="wp-block-ns-listing__item-wrapper">
            <div class="wp-block-ns-listing__item-image">
              <img src="${image}" alt="${itemData.title.rendered}"/>
            </div>
            <div class="wp-block-ns-listing__item-info">
                ${
                  itemData.type === "post"
                    ? `
                    <span class="wp-block-ns-listing__item-info-date">Posted ${dateHTML}
                    </span>
                `
                    : ""
                }
                ${
                  itemData.type === "post"
                    ? `
                    <span class="wp-block-ns-listing__item-info-categories">
                        <span> in </span>
                        ${itemData.category_names}
                    </span>
                `
                    : ""
                }
            </div>
            <div class="wp-block-ns-listing__item-title">${itemData.title.rendered}</div>
            <div class="wp-block-ns-listing__item-link">
              <a href="${itemData.link}" class="--arrow-link --small">Read More</a></div>
        </div>
    </li>`
    return listItem
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const listingContainerElement = document.querySelectorAll(".js-listing")
  if (listingContainerElement) {
    listingContainerElement.forEach((element) => {
      wp.api.loadPromise.done(function () {
        new ListingController(element)
      })
    })
  }
})
