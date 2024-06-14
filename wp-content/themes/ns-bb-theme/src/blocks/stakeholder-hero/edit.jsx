import { useBlockProps, InspectorControls, RichText } from "@wordpress/block-editor"
import { useSelect, dispatch } from "@wordpress/data"
import { PanelBody, ToggleControl, TextControl } from "@wordpress/components"
import { ImageSelect, TagSelect, PostPicker, Repeater, repeaterOnChange } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { headline, headlineTag, backgroundImage, offer, allOffers, anchorLinks } = attributes

  const postMeta = useSelect((select) => {
    return select("core/editor").getEditedPostAttribute("meta")
  })

  const postTitle = useSelect((select) => {
    return select("core/editor").getEditedPostAttribute("title")
  })

  const offerObject = useSelect(
    (select) => {
      return offer ? select("core").getEntityRecord("postType", "offer", offer) : undefined
    },
    [offer]
  )

  const imageObject = useSelect(
    (select) => {
      const imageId = backgroundImage ? backgroundImage : select("core/editor").getEditedPostAttribute("featured_media")
      return imageId ? select("core").getMedia(imageId) : undefined
    },
    [backgroundImage]
  )

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={"Hero Settings"} initialOpen={true}>
            <ImageSelect
              label="Image"
              props={props}
              selectedImage={backgroundImage}
              onSelect={(newImage) => setAttributes({ backgroundImage: newImage.id })}
              onRemove={() => {
                setAttributes({ backgroundImage: 0 })
              }}
            />
            <TagSelect
              label="Headline Tag"
              value={headlineTag}
              onChange={(value) => setAttributes({ headlineTag: value })}
            />
          </PanelBody>
          <PanelBody title={"Offers"} initialOpen={true}>
            <PostPicker
              label="Offer"
              value={offer}
              postType="offer"
              onChange={(value) => {
                setAttributes({ offer: value })
              }}
            ></PostPicker>
            <ToggleControl
              checked={allOffers}
              label="Display All Offers Link"
              onChange={(value) => {
                setAttributes({ allOffers: value })
              }}
            />
          </PanelBody>
          <PanelBody title={"Anchor Links"} initialOpen={true}>
            <Repeater
              props={props}
              attribute="anchorLinks"
              label="Link"
              pluralLabel="Links"
              newObject={{
                text: "",
                target: "",
              }}
              fields={(index) => {
                const attribute = "anchorLinks"
                return [
                  <TextControl
                    key="text"
                    label="Anchor Text"
                    value={props.attributes.anchorLinks[index].text}
                    onChange={(value) => {
                      repeaterOnChange(attribute, "text", value, index, props)
                    }}
                  />,
                  <TextControl
                    key="target"
                    label="Target ID"
                    value={props.attributes.anchorLinks[index].target}
                    onChange={(value) => {
                      repeaterOnChange(attribute, "target", value, index, props)
                    }}
                  />,
                ]
              }}
            />
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-stakeholder-hero__main-grid">
        <div className="wp-block-ns-stakeholder-hero__image-wrap">
          {imageObject && <img src={imageObject.source_url} alt="" />}
        </div>
        <div className="wp-block-ns-stakeholder-hero__anchor-bar">
          <ul className="wp-block-ns-stakeholder-hero__anchor-bar-links">
            {anchorLinks.map((link, index) => {
              return (
                <li key={index} className="wp-block-ns-stakeholder-hero__anchor-bar-link">
                  <span>{link.text}</span>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="wp-block-ns-stakeholder-hero__breadcrumbs">
          <a href="/">Breadcrumbs</a>
        </div>
        <div className="wp-block-ns-stakeholder-hero__content">
          <div className="wp-block-ns-stakeholder-hero__content-body --theme-background-image">
            <RichText
              tag="div"
              className="wp-block-ns-stakeholder-hero__headline --hl-xxl"
              value={headline}
              placeholder={postTitle ? postTitle : "...Headline"}
              onChange={(value) => setAttributes({ headline: value })}
            />
            <div className="wp-block-ns-stakeholder-hero__contact">
              <div className="wp-block-ns-stakeholder-hero__contact-address">
                <RichText
                  tag="div"
                  className="wp-block-ns-stakeholder-hero__contact-address-1"
                  value={postMeta.stkAddress1}
                  placeholder="...Address Line 1"
                  onChange={(value) => {
                    dispatch("core/editor").editPost({
                      meta: {
                        stkAddress1: value,
                      },
                    })
                  }}
                />
                <RichText
                  tag="div"
                  className="wp-block-ns-stakeholder-hero__contact-address-2"
                  value={postMeta.stkAddressUnit}
                  placeholder="...Address Line 2"
                  onChange={(value) => {
                    dispatch("core/editor").editPost({
                      meta: {
                        stkAddressUnit: value,
                      },
                    })
                  }}
                />
                <RichText
                  tag="div"
                  className="wp-block-ns-stakeholder-hero__contact-address-3"
                  value={postMeta.stkAddress2}
                  placeholder="...Address Line 2"
                  onChange={(value) => {
                    dispatch("core/editor").editPost({
                      meta: {
                        stkAddress2: value,
                      },
                    })
                  }}
                />
              </div>
              <RichText
                tag="div"
                className="wp-block-ns-stakeholder-hero__contact-phone"
                value={postMeta.stkPhone}
                placeholder="...Phone Number"
                onChange={(value) => {
                  dispatch("core/editor").editPost({
                    meta: {
                      stkPhone: value,
                    },
                  })
                }}
              />
            </div>
            <div className="wp-block-ns-stakeholder-hero__ctas">
              <div className="wp-block-ns-stakeholder-hero__cta --cta">Primary CTA</div>
              <div className="wp-block-ns-stakeholder-hero__cta --cta --secondary">Secondary CTA</div>
              <div className="wp-block-ns-stakeholder-hero__cta --cta --tertiary">Tertiarty CTA</div>
            </div>
          </div>
          {offerObject && (
            <div className="wp-block-ns-stakeholder-hero__offer">
              <div className="wp-block-ns-stakeholder-hero__offer-headline">{offerObject.title.rendered}</div>
              <div className="wp-block-ns-stakeholder-hero__offer-body">{offerObject.excerpt.rendered}</div>
              <div className="wp-block-ns-stakeholder-hero__offer-ctas">
                <span className="--micro-cta">link</span>
                <span className="--micro-text">View All Offers</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
