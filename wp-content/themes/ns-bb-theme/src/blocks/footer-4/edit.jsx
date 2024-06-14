import { useBlockProps, InspectorControls, RichText } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components"
import { useState, useEffect } from "@wordpress/element"
import apiFetch from "@wordpress/api-fetch"
import { CtaControl, TagSelect, ImageSelect, LinkSelect } from "../../editor-controls"
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
    formIntro,
    formCta1,
    formCta2
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
            <TagSelect
              label="Newsetter Form Headline Tag"
              value={formHeadlineTag}
              onChange={(value) => setAttributes({ formHeadlineTag: value })}
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
                  setAttributes({ termsLink: false })
                }}
              />
            )}
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-site-footer4__wrapper">
        <div className="wp-block-ns-site-footer4__contact">
          <div className="wp-block-ns-site-footer4__contact-logo">
            {imageObject !== undefined && <img src={imageObject.source_url} alt="" />}
          </div>
          <div className="wp-block-ns-site-footer4__contact-info">
            <div className="wp-block-ns-site-footer4__contact-address">
              {themeOptions !== null && themeOptions.ns_contact.address_line_1 && (
                <span className="wp-block-ns-site-footer4__contact-address-line1">
                  {themeOptions.ns_contact.address_line_1}
                </span>
              )}
              {themeOptions !== null && themeOptions.ns_contact.address_line_2 && (
                <span className="wp-block-ns-site-footer4__contact-address-line2">
                  {themeOptions.ns_contact.address_line_2}
                </span>
              )}
            </div>
            <div className="wp-block-ns-site-footer4__contact-phone">
              {themeOptions !== null && themeOptions.ns_contact.phone && (
                <span className="wp-block-ns-site-footer4__contact-phone-link">{themeOptions.ns_contact.phone}</span>
              )}
            </div>
          </div>
          {themeOptions !== null && (
            <div className="wp-block-ns-site-footer4__contact-social">
              {themeOptions.ns_social_links.facebook && (
                <div className="wp-block-ns-site-footer4__contact-social-item">
                  <span className="wp-block-ns-site-footer4__contact-social-link --facebook">facebook</span>
                </div>
              )}
              {themeOptions.ns_social_links.google && (
                <div className="wp-block-ns-site-footer4__contact-social-item">
                  <span className="wp-block-ns-site-footer4__contact-social-link --google">google</span>
                </div>
              )}
              {themeOptions.ns_social_links.youtube && (
                <div className="wp-block-ns-site-footer4__contact-social-item">
                  <span className="wp-block-ns-site-footer4__contact-social-link --youtube">youtube</span>
                </div>
              )}
              {themeOptions.ns_social_links.linkedin && (
                <div className="wp-block-ns-site-footer4__contact-social-item">
                  <span className="wp-block-ns-site-footer4__contact-social-link --linkedin">linkedin</span>
                </div>
              )}
              {themeOptions.ns_social_links.instagram && (
                <div className="wp-block-ns-site-footer4__contact-social-item">
                  <span className="wp-block-ns-site-footer4__contact-social-link --instagram">instagram</span>
                </div>
              )}
              {themeOptions.ns_social_links.twitter && (
                <div className="wp-block-ns-site-footer4__contact-social-item">
                  <span className="wp-block-ns-site-footer4__contact-social-link --twitter">twitter</span>
                </div>
              )}
            </div>
          )}
        </div>
        <nav className="wp-block-ns-site-footer4__nav">
          {menuItemsTree !== undefined && menuItemsTree !== null && (
            <div className="wp-block-ns-site-footer4__nav-items">
              {menuItemsTree.map((item) => {
                if (!item.parent) {
                  return (
                    <div key={item.id} className="wp-block-ns-site-footer4__nav-item">
                      <span className="wp-block-ns-site-footer4__nav-item-link">{item.title.raw}</span>
                      {item.children.length > 0 && (
                        <div className="wp-block-ns-site-footer4__subnav">
                          {item.children.map((subItem) => {
                            return (
                              <div key={subItem.id} className="wp-block-ns-site-footer4__subnav-item">
                                <span className="wp-block-ns-site-footer4__subnav-link">{subItem.title.raw}</span>
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
        <div className="wp-block-ns-site-footer4__newsletter">
          <RichText
            tag="div"
            className="wp-block-ns-site-footer4__newsletter-title"
            value={formHeadline}
            placeholder="Headline..."
            onChange={(value) => setAttributes({ formHeadline: value })}
          />
          <RichText
            tag="div"
            className="wp-block-ns-site-footer4__newsletter-blurb"
            value={formIntro}
            placeholder="Intro..."
            onChange={(value) => setAttributes({ formIntro: value })}
          />
          <div className="wp-block-ns-site-footer4__newsletter-ctas">
            <CtaControl
              className="wp-block-ns-site-footer4__newsletter-cta --primary"
              onUpdate={(value) => setAttributes({ formCta1: value })}
              value={formCta1}
            />
            <CtaControl
              className="wp-block-ns-site-footer4__newsletter-cta --secondary"
              onUpdate={(value) => setAttributes({ formCta2: value })}
              value={formCta2}
            />
          </div>
        </div>
      </div>
      <div className="wp-block-ns-site-footer4__legal">
        <div className="wp-block-ns-site-footer4__copyright">
          &copy; {year} {copyrightText}
          <span className="wp-block-ns-site-footer4__copyright-dot">&nbsp;·&nbsp;</span>
        </div>
        <div className="wp-block-ns-site-footer4__copyright-links">
          {showPrivacy && <span>Privacy Policy{showTerms && <span> · </span>}</span>}
          {showTerms && <span>Terms of Service</span>}
        </div>
        <div className="wp-block-ns-site-footer4__legal-noble">
          <span>Website by Noble Studios</span>
        </div>
      </div>
    </div>
  )
}
