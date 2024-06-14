import { useBlockProps, useInnerBlocksProps, InspectorControls } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { PanelBody, TextControl, TextareaControl, ToggleControl } from "@wordpress/components"
import { useState, useEffect } from "@wordpress/element"
import apiFetch from "@wordpress/api-fetch"
import { TagSelect, ImageSelect, LinkSelect } from "../../editor-controls"
import buildTermsTree from "../../scripts/modules/termTree"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props

  const {
    logo,
    copyrightText,
    showPrivacy,
    privacyLink,
    showTerms,
    termsLink,
    formHeadline,
    formHeadlineTag,
    formIntro
  } = attributes

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

  let menuItemsTree = []
  if (menuItems !== null && menuItems !== undefined) {
    menuItemsTree = buildTermsTree(menuItems)
  }

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={"Footer Options"} initialOpen={true}>
            <ImageSelect
              label="Logo"
              props={props}
              selectedImage={logo}
              onSelect={(newImage) => setAttributes({ logo: newImage.id })}
              onRemove={() => {
                setAttributes({ logo: 0 })
              }}
            />
            <TextControl
              label="Newsletter Form Headline"
              value={formHeadline}
              onChange={(value) => {
                setAttributes({ formHeadline: value })
              }}
            />
            <TagSelect
              label="Newsletter Form Headline Tag"
              value={formHeadlineTag}
              onChange={(value) => setAttributes({ formHeadlineTag: value })}
            />
            <TextareaControl
              label="Newsletter Form Intro"
              value={formIntro}
              onChange={(value) => {
                setAttributes({ formIntro: value })
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
      <div className="wp-block-ns-site-footer3__wrapper">
        <div className="wp-block-ns-site-footer3__contact">
          <div className="wp-block-ns-site-footer3__contact-logo">
            {imageObject !== undefined && <img src={imageObject.source_url} alt="" />}
          </div>
          <div className="wp-block-ns-site-footer3__contact-info">
            <div className="wp-block-ns-site-footer3__contact-address">
              {themeOptions !== null && themeOptions.ns_contact.address_line_1 && (
                <span className="wp-block-ns-site-footer3__contact-address-line1">
                  {themeOptions.ns_contact.address_line_1}
                </span>
              )}
              {themeOptions !== null && themeOptions.ns_contact.address_line_2 && (
                <span className="wp-block-ns-site-footer3__contact-address-line2">
                  {themeOptions.ns_contact.address_line_2}
                </span>
              )}
            </div>
            <div className="wp-block-ns-site-footer3__contact-phone">
              {themeOptions !== null && themeOptions.ns_contact.phone && (
                <span className="wp-block-ns-site-footer3__contact-phone-link">{themeOptions.ns_contact.phone}</span>
              )}
            </div>
          </div>
          {themeOptions !== null && (
            <div className="wp-block-ns-site-footer3__contact-social">
              {themeOptions.ns_social_links.facebook && (
                <div className="wp-block-ns-site-footer3__contact-social-item">
                  <span className="wp-block-ns-site-footer3__contact-social-link --facebook">facebook</span>
                </div>
              )}
              {themeOptions.ns_social_links.google && (
                <div className="wp-block-ns-site-footer3__contact-social-item">
                  <span className="wp-block-ns-site-footer3__contact-social-link --google">google</span>
                </div>
              )}
              {themeOptions.ns_social_links.youtube && (
                <div className="wp-block-ns-site-footer3__contact-social-item">
                  <span className="wp-block-ns-site-footer3__contact-social-link --youtube">youtube</span>
                </div>
              )}
              {themeOptions.ns_social_links.linkedin && (
                <div className="wp-block-ns-site-footer3__contact-social-item">
                  <span className="wp-block-ns-site-footer3__contact-social-link --linkedin">linkedin</span>
                </div>
              )}
              {themeOptions.ns_social_links.instagram && (
                <div className="wp-block-ns-site-footer3__contact-social-item">
                  <span className="wp-block-ns-site-footer3__contact-social-link --instagram">instagram</span>
                </div>
              )}
              {themeOptions.ns_social_links.twitter && (
                <div className="wp-block-ns-site-footer3__contact-social-item">
                  <span className="wp-block-ns-site-footer3__contact-social-link --twitter">twitter</span>
                </div>
              )}
            </div>
          )}
        </div>
        <nav className="wp-block-ns-site-footer3__nav">
          {menuItemsTree !== undefined && menuItemsTree !== null && (
            <div className="wp-block-ns-site-footer3__nav-items">
              {menuItemsTree.map((item) => {
                if (!item.parent) {
                  return (
                    <div key={item.id} className="wp-block-ns-site-footer3__nav-item">
                      <div className="wp-block-ns-site-footer3__nav-item-link">{item.title.raw}</div>
                      {item.children.length > 0 && (
                        <div className="wp-block-ns-site-footer3__subnav">
                          {item.children.map((subItem) => {
                            return (
                              <div key={subItem.id} className="wp-block-ns-site-footer3__subnav-item">
                                <span className="wp-block-ns-site-footer3__subnav-link">{subItem.title.raw}</span>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }
                return <></>
              })}
            </div>
          )}
        </nav>
        <div className="wp-block-ns-site-footer3__newsletter">
          <div className="wp-block-ns-site-footer3__newsletter-title">{formHeadline}</div>
          <div className="wp-block-ns-site-footer3__newsletter-blurb">{formIntro}</div>
          <div {...useInnerBlocksProps({ className: "wp-block-ns-site-footer3__newsletter-form" })} />
        </div>
      </div>
      <div className="wp-block-ns-site-footer3__legal">
        <div className="wp-block-ns-site-footer3__copyright">
          &copy; {year} {copyrightText}
          <span className="wp-block-ns-site-footer3__copyright-dot">&nbsp;·&nbsp;</span>
        </div>
        <div className="wp-block-ns-site-footer3__copyright-links">
          {showPrivacy && <span>Privacy Policy{showTerms && <span> · </span>}</span>}
          {showTerms && <span>Terms of Service</span>}
        </div>
        <div className="wp-block-ns-site-footer3__legal-noble">
          <span>Website by Noble Studios</span>
        </div>
      </div>
    </div>
  )
}
