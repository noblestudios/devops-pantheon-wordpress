import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { useState, useEffect } from "@wordpress/element"
import apiFetch from "@wordpress/api-fetch"
import { PanelBody, RadioControl, TextControl, ToggleControl } from "@wordpress/components"
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
    navDeskAlign,
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

  const imageObject = useSelect(
    (select) => {
      const imgID = desktopImage ? desktopImage : mobileImage
      return imgID ? select("core").getMedia(desktopImage) : undefined
    },
    [desktopImage, mobileImage]
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
            <RadioControl
              label="Menu Alignment"
              selected={navDeskAlign}
              options={[
                { label: "Right", value: "right" },
                { label: "Center", value: "center" }
              ]}
              onChange={(value) => setAttributes({ navDeskAlign: value })}
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
      <div className="wp-block-ns-nav-simple__width">
        <nav className="wp-block-ns-nav-simple__header">
          <div className="wp-block-ns-nav-simple__logo">
            {imageObject !== undefined && (
              <picture className="custom-logo">
                <source srcSet={imageObject.source_url} />
                <img src={imageObject.source_url} alt="" />
              </picture>
            )}
            {isExample && (
              <picture className="custom-logo">
                <source srcSet="https://pd.w.org/2024/02/33765c577493dcfb5.81567920-768x575.jpg" />
                <img src="https://pd.w.org/2024/02/33765c577493dcfb5.81567920-768x575.jpg" alt="" />
              </picture>
            )}
          </div>
          <div className="wp-block-ns-nav-simple__menu --background-two-mobile">
            <div className={`wp-block-ns-nav-simple__menu-items --${!navDeskAlign ? "right" : navDeskAlign}`}>
              <div key="phone" className="wp-block-ns-nav-simple__menu-item --phone-row --desktop-show">
                <span className="wp-block-ns-nav-simple__menu-item-link --phone">{themeOptions?.ns_contact.phone}</span>
              </div>
              {menuItems !== undefined &&
                menuItems !== null &&
                menuItems.map((item) => {
                  if (!item.parent) {
                    return (
                      <div key={item.id} className="wp-block-ns-nav-simple__menu-item">
                        <span className="wp-block-ns-nav-simple__menu-item-link">{item.title.raw}</span>
                      </div>
                    )
                  }
                  return <></>
                })}
            </div>
          </div>
          <button className="wp-block-ns-nav-simple__search-btn" type="button"></button>
          {navCTALink && (
            <span className={`wp-block-ns-nav-simple__mobile-cta --micro-cta ${navMobileCTA ? "--show-mobile" : ""}`}>
              {navCTALabel}
            </span>
          )}
          {navMobilePhone && <span className="wp-block-ns-nav-simple__mobile-phone" aria-label="call us"></span>}
          <div className="wp-block-ns-nav-simple__mobile-trigger">
            <div className="burger-line"></div>
            <div className="burger-line"></div>
            <div className="burger-line"></div>
          </div>
        </nav>
      </div>
    </div>
  )
}
