import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { useState, useEffect } from "@wordpress/element"
import apiFetch from "@wordpress/api-fetch"
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components"
import { ImageSelect, LinkSelect, Repeater, repeaterOnChange } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const {
    navMobilePhone,
    navMobileCTA,
    navCTALink,
    navCTALabel,
    desktopImage,
    mobileImage,
    searchHeadline,
    searchPlaceholder,
    recommendedHeadline,
    isExample
  } = attributes

  const [themeOptions, setThemeOptions] = useState(null)

  useEffect(() => {
    apiFetch({ path: "/wp/v2/settings" }).then((result) => {
      setThemeOptions(result)
    })
  }, [])

  const menuLocation = useSelect((select) => {
    return select("core").getMenuLocation("primary-nav")
  })

  const secondaryLocation = useSelect((select) => {
    return select("core").getMenuLocation("secondary-nav")
  })

  const imageObject = useSelect(
    (select) => {
      return desktopImage ? select("core").getMedia(desktopImage) : undefined
    },
    [desktopImage]
  )

  const menuItems = useSelect(
    (select) => {
      return menuLocation
        ? select("core").getMenuItems({
            menus: menuLocation.menu,
            per_page: -1
          })
        : undefined
    },
    [menuLocation]
  )

  const secondaryMenuItems = useSelect(
    (select) => {
      return secondaryLocation
        ? select("core").getMenuItems({
            menus: secondaryLocation.menu,
            per_page: -1
          })
        : undefined
    },
    [secondaryLocation]
  )

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={"Mobile Options"} initialOpen={true}>
            <ImageSelect
              label="Mobile Logo"
              props={props}
              selectedImage={mobileImage}
              onSelect={(newImage) => setAttributes({ mobileImage: newImage.id })}
              onRemove={() => {
                setAttributes({ mobileImage: 0 })
              }}
            />
            <ToggleControl
              checked={navMobileCTA}
              label={"Show CTA"}
              onChange={(value) => {
                setAttributes({ navMobileCTA: value })
              }}
            />
            <ToggleControl
              checked={navMobilePhone}
              label={"Show Phone"}
              onChange={(value) => {
                setAttributes({ navMobilePhone: value })
              }}
            />
          </PanelBody>
          <PanelBody title={"Desktop Options"} initialOpen={true}>
            <ImageSelect
              label="Desktop Logo"
              props={props}
              selectedImage={desktopImage}
              onSelect={(newImage) => setAttributes({ desktopImage: newImage.id })}
              onRemove={() => {
                setAttributes({ desktopImage: 0 })
              }}
            />
          </PanelBody>
          <PanelBody title={"CTA"} initialOpen={true}>
            <LinkSelect
              label="Link"
              value={navCTALink}
              onChange={(value) => {
                setAttributes({ navCTALink: value })
              }}
              onRemove={() => {
                setAttributes({ navCTALink: {} })
              }}
            />
            <TextControl
              label="CTA Text"
              value={navCTALabel}
              onChange={(value) => setAttributes({ navCTALabel: value })}
            />
          </PanelBody>
          <PanelBody title={"Search Options"} initialOpen={false}>
            <TextControl
              label="Search Form Headline"
              value={searchHeadline}
              onChange={(value) => setAttributes({ searchHeadline: value })}
            />
            <TextControl
              label="Search Form Placeholder"
              value={searchPlaceholder}
              onChange={(value) => setAttributes({ searchPlaceholder: value })}
            />
            <TextControl
              label="Recommended Pages Headline"
              value={recommendedHeadline}
              onChange={(value) => setAttributes({ recommendedHeadline: value })}
            />
            <Repeater
              props={props}
              attribute="recommendedPages"
              label="Link"
              pluralLabel="Links"
              newObject={{
                link: ""
              }}
              fields={(index) => {
                const attribute = "recommendedPages"
                return [
                  <LinkSelect
                    key="link"
                    label="Link"
                    value={props.attributes.recommendedPages[index].link}
                    onChange={(value) => {
                      repeaterOnChange(attribute, "link", value, index, props)
                    }}
                    onRemove={() => {
                      repeaterOnChange(attribute, "link", {}, index, props)
                    }}
                  />
                ]
              }}
            />
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-nav-full-logo__width js-sticky-nav-wrap">
        <div className="wp-block-ns-nav-full-logo__grid">
          <div className="wp-block-ns-nav-full-logo__logo">
            {imageObject !== undefined && (
              <picture className="custom-logo" alt="">
                <source srcSet={imageObject.source_url} />
                <img src={imageObject.source_url} alt="" />
              </picture>
            )}
            {isExample && (
              <picture className="custom-logo">
                <source srcSet="/wp-content/themes/ns-bb-theme/assets/svgs/Horizontal.svg" />
                <img src="/wp-content/themes/ns-bb-theme/assets/svgs/Horizontal.svg" alt="" />
              </picture>
            )}
          </div>
          <nav id="js-secondaryNav" className="wp-block-ns-nav-full-logo__secondary-header">
            <div className="wp-block-ns-nav-full-logo__secondary-header-width">
              <div className="wp-block-ns-nav-full-logo__secondary-menu-items">
                {secondaryMenuItems !== null &&
                  secondaryMenuItems !== undefined &&
                  secondaryMenuItems.map((item) => {
                    return (
                      <div key={item.id} className="wp-block-ns-nav-full-logo__secondary-menu-item">
                        <span className="wp-block-ns-nav-full-logo__secondary-menu-item-link">{item.title.raw}</span>
                      </div>
                    )
                  })}
                <div className="wp-block-ns-nav-full-logo__secondary-menu-item --phone-row">
                  <span className="wp-block-ns-nav-full-logo__secondary-menu-item-link --phone">
                    {themeOptions?.ns_contact.phone}
                  </span>
                </div>
              </div>
              <button
                className="wp-block-ns-nav-full-logo__search-btn js-tgglSrch"
                type="button"
                aria-label="open search"
              ></button>
              {navCTALabel && <span className="wp-block-ns-nav-full-logo__mobile-cta --micro-cta">{navCTALabel}</span>}
            </div>
          </nav>
          <nav id="js-mainNav" className="wp-block-ns-nav-full-logo__header">
            <div id="js-mobileMenu" className="wp-block-ns-nav-full-logo__menu --background-two-mobile">
              <div className="wp-block-ns-nav-full-logo__menu-items --right">
                <div className="wp-block-ns-nav-full-logo__menu-item --phone-row">
                  <span className="wp-block-ns-nav-full-logo__menu-item-link --phone">(555) 555-5555</span>
                </div>
                <div className="wp-block-ns-nav-full-logo__menu-item --search-row">
                  <form className="wp-block-ns-nav-full-logo__mobile-search" action="/" method="get">
                    <input type="search" name="s" required placeholder="Search" />
                    <button type="button" aria-label="submit-search"></button>
                  </form>
                </div>
                {menuItems !== undefined &&
                  menuItems !== null &&
                  menuItems.map((item) => {
                    if (!item.parent) {
                      return (
                        <div key={item.id} className="wp-block-ns-nav-full-logo__menu-item">
                          <span className="wp-block-ns-nav-full-logo__menu-item-link">{item.title.raw}</span>
                        </div>
                      )
                    }
                    return <></>
                  })}
              </div>
            </div>
            {navCTALabel && (
              <span
                className={`wp-block-ns-nav-full-logo__mobile-cta --micro-cta ${
                  navMobileCTA ? "--show-mobile" : ""
                } --hide-desktop`}
              >
                {navCTALabel}
              </span>
            )}
            {navMobilePhone && <span className="wp-block-ns-nav-full-logo__mobile-phone"></span>}
            <div className="wp-block-ns-nav-full-logo__mobile-trigger">
              <div className="burger-line"></div>
              <div className="burger-line"></div>
              <div className="burger-line"></div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
