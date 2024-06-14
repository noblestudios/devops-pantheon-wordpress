import { useBlockProps, useInnerBlocksProps, InspectorControls } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { PanelBody, TextControl, TextareaControl, ToggleControl } from "@wordpress/components"
import { useState, useEffect } from "@wordpress/element"
import apiFetch from "@wordpress/api-fetch"
import { ImageSelect, TagSelect, LinkSelect } from "../../editor-controls"

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
    ctaImage,
    ctaHeadline,
    ctaHeadlineTag,
    ctaIntro,
    ctaButtonLabel,
    ctaButtonLink
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

  const ctaImageObject = useSelect(
    (select) => {
      return ctaImage ? select("core").getMedia(ctaImage) : undefined
    },
    [ctaImage]
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
                label="Privacy Link"
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
          <PanelBody title={"Footer CTA Section"} initialOpen={true}>
            <ImageSelect
              label="CTA Thumbnail"
              props={props}
              selectedImage={ctaImage}
              onSelect={(newImage) => setAttributes({ ctaImage: newImage.id })}
              onRemove={() => {
                setAttributes({ ctaImage: 0 })
              }}
            />
            <TextControl
              label="CTA Headline"
              value={ctaHeadline}
              onChange={(value) => {
                setAttributes({ ctaHeadline: value })
              }}
            />
            <TagSelect
              label="CTA Headline Tag"
              value={ctaHeadlineTag}
              onChange={(value) => setAttributes({ ctaHeadlineTag: value })}
            />
            <TextareaControl
              label="CTA Intro"
              value={ctaIntro}
              onChange={(value) => {
                setAttributes({ ctaIntro: value })
              }}
            />
            <TextControl
              label="CTA Button Label"
              value={ctaButtonLabel}
              onChange={(value) => {
                setAttributes({ ctaButtonLabel: value })
              }}
            />
            <LinkSelect
              label="CTA Button Link"
              value={ctaButtonLink}
              onChange={(value) => {
                setAttributes({ ctaButtonLink: value })
              }}
              onRemove={() => {
                setAttributes({ ctaButtonLink: false })
              }}
            />
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-site-footer6__wrapper">
        <div className="wp-block-ns-site-footer6__extras">
          <div className="wp-block-ns-site-footer6__cta-block">
            <div className="wp-block-ns-site-footer6__cta-block-image">
              {ctaImageObject !== undefined && <img src={ctaImageObject.source_url} alt="" />}
            </div>
            <div className="wp-block-ns-site-footer6__cta-block-content">
              <h3 className="wp-block-ns-site-footer6__cta-block-title">{ctaHeadline}</h3>
              <div className="wp-block-ns-site-footer6__cta-block-text">{ctaIntro}</div>
              <div className="wp-block-ns-site-footer6__cta-block-link --tertiary">{ctaButtonLabel}</div>
            </div>
          </div>
          <div className="wp-block-ns-site-footer6__newsletter">
            <div className="wp-block-ns-site-footer6__newsletter-title">{formHeadline}</div>
            <div className="wp-block-ns-site-footer6__newsletter-blurb">{formIntro}</div>
            <div {...useInnerBlocksProps({ className: "wp-block-ns-site-footer6__newsletter-form" })} />
          </div>
        </div>
        <nav className="wp-block-ns-site-footer6__nav">
          <div className="wp-block-ns-site-footer6__nav-items">
            <div className="wp-block-ns-site-footer6__logo">
              {imageObject !== undefined && <img src={imageObject.source_url} alt="" />}
            </div>
            {menuItems &&
              menuItems.map((item) => {
                if (!item.parent) {
                  return (
                    <div key={item.id} className="wp-block-ns-site-footer6__nav-item">
                      <span className="wp-block-ns-site-footer6__nav-item-link">{item.title.raw}</span>
                    </div>
                  )
                }
                return <></>
              })}
            {themeOptions !== null && (
              <div className="wp-block-ns-site-footer6__contact-socials">
                <div className="wp-block-ns-site-footer6__contact-socials-list">
                  {themeOptions.ns_social_links.facebook && (
                    <div className="wp-block-ns-site-footer6__contact-social-item">
                      <span className="wp-block-ns-site-footer6__contact-social-link --facebook">facebook</span>
                    </div>
                  )}
                  {themeOptions.ns_social_links.google && (
                    <div className="wp-block-ns-site-footer6__contact-social-item">
                      <span className="wp-block-ns-site-footer6__contact-social-link --google">google</span>
                    </div>
                  )}
                  {themeOptions.ns_social_links.youtube && (
                    <div className="wp-block-ns-site-footer6__contact-social-item">
                      <span className="wp-block-ns-site-footer6__contact-social-link --youtube">youtube</span>
                    </div>
                  )}
                  {themeOptions.ns_social_links.linkedin && (
                    <div className="wp-block-ns-site-footer6__contact-social-item">
                      <span className="wp-block-ns-site-footer6__contact-social-link --linkedin">linkedin</span>
                    </div>
                  )}
                  {themeOptions.ns_social_links.instagram && (
                    <div className="wp-block-ns-site-footer6__contact-social-item">
                      <span className="wp-block-ns-site-footer6__contact-social-link --instagram">instagram</span>
                    </div>
                  )}
                  {themeOptions.ns_social_links.twitter && (
                    <div className="wp-block-ns-site-footer6__contact-social-item">
                      <span className="wp-block-ns-site-footer6__contact-social-link --twitter">twitter</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
      <div className="wp-block-ns-site-footer6__legal">
        <div className="wp-block-ns-site-footer6__copyright">
          &copy; {year} {copyrightText}
          <span className="wp-block-ns-site-footer6__copyright-dot">&nbsp;·&nbsp;</span>
        </div>
        <div className="wp-block-ns-site-footer6__copyright-links">
          {showPrivacy && <span>Privacy Policy{showTerms && <span> · </span>}</span>}
          {showTerms && <span>Terms of Service</span>}
        </div>
        <div className="wp-block-ns-site-footer6__legal-noble">
          <span>Website by Noble Studios</span>
        </div>
      </div>
    </div>
  )
}