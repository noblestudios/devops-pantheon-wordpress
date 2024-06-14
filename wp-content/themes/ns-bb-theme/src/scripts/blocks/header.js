import Cookies from "../modules/cookies"

// todo: move cookie and banner scripts to their own js script

class header {
  constructor() {
    this.cookies = new Cookies()
    this.stickyClass = "--sticky-nav"
    this.stickyWrap = document.querySelector(".js-sticky-nav-wrap")
    this.menu = document.getElementById("js-mainNav")
    this.secondaryNav = document.getElementById("js-secondaryNav")
    this.sticky = 140
    this.searchTriggers = document.querySelectorAll(".js-tgglSrch")
    this.mobileMenu = document.getElementById("js-mobileMenu")
    this.searchModal = document.getElementById("search-modal")
    this.mainBody = document.querySelector("main")
    this.banners = document.querySelectorAll(".js-alertBanner")
    this.adminBar = document.getElementById("wpadminbar")
    this.desktopBreakPoint = 1366
    document.addEventListener("scroll", this.setSticky.bind(this))
    document.getElementById("js-mobileMenuTrggr").addEventListener("click", this.toggleMblNav.bind(this))

    document.getElementById("js-menu-main").addEventListener(
      "click",
      function (event) {
        if (event.target.classList.contains("js-tgglSubMenu")) {
          this.toggleSubmenu(event)
        }
      }.bind(this)
    )

    this.searchTriggers.forEach((element) => {
      element.addEventListener("click", this.toggleSearch.bind(this))
    })

    window.addEventListener("resize", this.unsetMobileNav.bind(this))

    this.initCookieConsent()
    this.modalFocustrap()

    if (this.banners) {
      this.banners.forEach((banner) => {
        this.initBanner(banner)
      })
    }
  }

  initCookieConsent() {
    const consentCookie = this.cookies.getCookie("hidecookieconsent")
    if (!consentCookie) {
      const closeCookieConsent = document.querySelector("#js-closeCookieConsent")
      if (closeCookieConsent) {
        const cookieConsentRow = closeCookieConsent.closest(".js-cookieConsent")
        cookieConsentRow.classList.add("--is-shown")

        closeCookieConsent.addEventListener("click", () => {
          this.cookies.setCookie("hidecookieconsent", 1, 365)
          cookieConsentRow.classList.remove("--is-shown")
        })
      }
    }
  }

  initBanner(banner) {
    const bannerID = banner.dataset.bannerId
    const bannerCookie = this.cookies.getCookie("hidealert" + bannerID)
    if (!bannerCookie) {
      if (window.innerWidth < this.desktopBreakPoint) {
        document.getElementById("js-footerBanners").prepend(banner)
      }
      banner.classList.add("--is-shown")
      banner.querySelector(".js-closeAlert").addEventListener("click", this.closeBanner.bind(this))
    }
  }

  closeBanner(event) {
    const banner = event.target.closest(".js-alertBanner")
    const bannerID = banner.dataset.bannerId
    this.cookies.setCookie("hidealert" + bannerID, 1, 365)
    banner.classList.remove("--is-shown")
  }

  setSticky() {
    const headerHeight = this.stickyWrap.offsetHeight
    const secondaryHeight = this.secondaryNav ? this.secondaryNav.offsetHeight : 0
    const adminheight = this.adminBar ? this.adminBar.offsetHeight : 0
    if (window.pageYOffset >= headerHeight + adminheight) {
      this.stickyWrap.classList.add(this.stickyClass)
      this.searchModal.classList.add(this.stickyClass)
      this.stickyWrap.style.top = "-" + (headerHeight + secondaryHeight - adminheight) + "px"
      this.mainBody.style.paddingTop = headerHeight + "px"
    } else {
      this.stickyWrap.classList.remove(this.stickyClass)
      this.searchModal.classList.remove(this.stickyClass)
      this.mainBody.style.paddingTop = "0px"
    }
  }

  unsetMobileNav() {
    this.menu.classList.remove("--is-shown")
    this.closeSubNavs()
  }

  closeSubNavs() {
    const openSubnav = this.menu.querySelector(".js-hasSubMenu.--is-openSubNav")
    if (openSubnav) {
      const subNav = openSubnav.querySelector(".js-navSubMenu")
      openSubnav.classList.remove("--is-openSubNav")
      subNav.style.maxHeight = null
    }
  }

  toggleMblNav(event) {
    const toggled = this.menu.classList.toggle("--is-shown")
    event.target.classList.toggle("--is-active")

    if (toggled) {
      document.body.classList.add("--nav-open")
      window.addEventListener("resize", this.unsetMobileNav.bind(this))
    } else {
      this.closeSubNavs()
      window.removeEventListener("resize", this.unsetMobileNav.bind(this))
      document.body.classList.remove("--nav-open")
    }
  }

  toggleSubmenu(event) {
    //this.closeSubNavs();
    const parentItem = event.target.closest(".js-hasSubMenu")
    const subNav = parentItem.querySelector(".js-navSubMenu")
    const isOpen = parentItem.classList.contains("--is-openSubNav")

    if (isOpen) {
      parentItem.classList.remove("--is-openSubNav")
      subNav.style.maxHeight = null
    } else {
      this.closeSubNavs()
      parentItem.classList.add("--is-openSubNav")
      subNav.style.maxHeight = subNav.scrollHeight + "px"
    }
  }

  toggleSearch() {
    this.searchTriggers.forEach((element) => {
      element.classList.toggle("--is-active")
    })
    this.searchModal.classList.toggle("--is-open")
    document.body.classList.toggle("--search-modal-open")
    this.searchModal.querySelector("input[type=search]").focus()
  }

  modalFocustrap() {
    const focusableElements = this.searchModal.querySelectorAll(
      'button, [href], input, select, [tabindex]:not([tabindex="-1"])'
    )
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    this.searchModal.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (e.target === firstFocusable) {
            e.preventDefault()
            lastFocusable.focus()
          }
        } else if (e.target === lastFocusable) {
          e.preventDefault()
          firstFocusable.focus()
        }
      }
    })
  }
}

new header()
