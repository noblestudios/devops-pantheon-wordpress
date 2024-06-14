import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components"
import { useState, useEffect } from "@wordpress/element"
import apiFetch from "@wordpress/api-fetch"
import { ImageSelect, LinkSelect } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { logo, copyrightText, showPrivacy, privacyLink, showTerms, termsLink } = attributes
  const year = new Date().getFullYear()
  const [themeOptions, setThemeOptions] = useState(null)

  useEffect(() => {
    apiFetch({ path: "/wp/v2/settings" }).then((result) => {
      setThemeOptions(result)
    })
  }, [])

  const menuLocation = useSelect((select) => {
    return select("core").getMenuLocation("footer")
  })

  const imageObject = useSelect(
    (select) => {
      return logo ? select("core").getMedia(logo) : undefined
    },
    [logo]
  )

  const menuItems = useSelect((select) => {
    return menuLocation
      ? select("core").getMenuItems({
          menus: menuLocation.menu,
          per_page: -1
        })
      : undefined
  })

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={"Footer Options"} initialOpen={true}>
            <ImageSelect
              label="Desktop Logo"
              props={props}
              selectedImage={logo}
              onSelect={(newImage) => setAttributes({ logo: newImage.id })}
              onRemove={() => {
                setAttributes({ logo: 0 })
              }}
            />
            <TextControl
              label="Copyright Text"
              value={copyrightText}
              onChange={(value) => {
                setAttributes({ copyrightText: value })
              }}
            />
            <ToggleControl
              checked={showPrivacy}
              label={"Show Privacy Link"}
              onChange={(value) => {
                setAttributes({ showPrivacy: value })
              }}
            />
            {showPrivacy && (
              <LinkSelect
                label="Privacy Link"
                value={privacyLink}
                onChange={(value) => {
                  setAttributes({ privacyLink: value })
                }}
                onRemove={() => {
                  setAttributes({ privacyLink: {} })
                }}
              />
            )}
            <ToggleControl
              checked={showTerms}
              label={"Show Terms Link"}
              onChange={(value) => {
                setAttributes({ showTerms: value })
              }}
            />
            {showTerms && (
              <LinkSelect
                label="Terms Link"
                value={termsLink}
                onChange={(value) => {
                  setAttributes({ termsLink: value })
                }}
                onRemove={() => {
                  setAttributes({ termsLink: {} })
                }}
              />
            )}
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-site-footer1__wrapper">
        <div className="wp-block-ns-site-footer1__logo">
          {imageObject !== undefined && <img src={imageObject.source_url} alt="" />}
        </div>
        <nav className="wp-block-ns-site-footer1__nav">
          {menuItems !== null && menuItems !== undefined && (
            <div className="wp-block-ns-site-footer1__nav-items">
              {menuItems.map((item) => {
                if (!item.parent) {
                  return (
                    <div key={item.id} className="wp-block-ns-site-footer1__nav-item">
                      <span className="wp-block-ns-site-footer1__nav-item-link">{item.title.raw}</span>
                    </div>
                  )
                }
                return <></>
              })}
            </div>
          )}
        </nav>
        <div className="wp-block-ns-site-footer1__contact">
          {themeOptions !== null && (
            <div className="wp-block-ns-site-footer1__contact-social">
              {themeOptions.ns_social_links.facebook && (
                <div className="wp-block-ns-site-footer1__contact-social-item">
                  <span className="wp-block-ns-site-footer1__contact-social-link --facebook">facebook</span>
                </div>
              )}
              {themeOptions.ns_social_links.google && (
                <div className="wp-block-ns-site-footer1__contact-social-item">
                  <span className="wp-block-ns-site-footer1__contact-social-link --google">google</span>
                </div>
              )}
              {themeOptions.ns_social_links.youtube && (
                <div className="wp-block-ns-site-footer1__contact-social-item">
                  <span className="wp-block-ns-site-footer1__contact-social-link --youtube">youtube</span>
                </div>
              )}
              {themeOptions.ns_social_links.linkedin && (
                <div className="wp-block-ns-site-footer1__contact-social-item">
                  <span className="wp-block-ns-site-footer1__contact-social-link --linkedin">linkedin</span>
                </div>
              )}
              {themeOptions.ns_social_links.instagram && (
                <div className="wp-block-ns-site-footer1__contact-social-item">
                  <span className="wp-block-ns-site-footer1__contact-social-link --instagram">instagram</span>
                </div>
              )}
              {themeOptions.ns_social_links.twitter && (
                <div className="wp-block-ns-site-footer1__contact-social-item">
                  <span className="wp-block-ns-site-footer1__contact-social-link --twitter">twitter</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="wp-block-ns-site-footer1__legal">
        <div className="wp-block-ns-site-footer1__copyright">
          &copy; {year} {copyrightText}
          <span className="wp-block-ns-site-footer1__copyright-dot">&nbsp;·&nbsp;</span>
        </div>
        <div className="wp-block-ns-site-footer1__copyright-links">
          {showPrivacy && <span>Privacy Policy{showTerms && <span> · </span>}</span>}
          {showTerms && <span>Terms of Service</span>}
        </div>
        <div className="wp-block-ns-site-footer1__legal-noble">
          <span>Website by Noble Studios</span>
        </div>
      </div>
    </div>
  )
}
