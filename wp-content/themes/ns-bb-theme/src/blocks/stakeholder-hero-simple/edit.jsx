import { useBlockProps, InspectorControls, RichText } from "@wordpress/block-editor"
import { useSelect, dispatch } from "@wordpress/data"
import { PanelBody } from "@wordpress/components"
import { TagSelect } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { headline, headlineTag } = attributes

  const postMeta = useSelect((select) => {
    return select("core/editor").getEditedPostAttribute("meta")
  })

  const postTitle = useSelect((select) => {
    return select("core/editor").getEditedPostAttribute("title")
  })

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={"Hero Settings"} initialOpen={true}>
            <TagSelect
              label="Headline Tag"
              value={headlineTag}
              onChange={(value) => setAttributes({ headlineTag: value })}
            />
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-stakeholder-hero-simple__main-grid">
        <div className="wp-block-ns-stakeholder-hero-simple__breadcrumbs">
          <a href="/">Breadcrumbs</a>
        </div>
        <RichText
          tag="div"
          className="wp-block-ns-stakeholder-hero-simple__headline --hl-xxl"
          value={headline}
          placeholder={postTitle ? postTitle : "...Headline"}
          onChange={(value) => setAttributes({ headline: value })}
        />
        <div className="wp-block-ns-stakeholder-hero-simple__contact">
          <div className="wp-block-ns-stakeholder-hero-simple__contact-address">
            <RichText
              tag="div"
              className="wp-block-ns-stakeholder-hero-simple__contact-address-1"
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
              className="wp-block-ns-stakeholder-hero-simple__contact-address-2"
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
              className="wp-block-ns-stakeholder-hero-simple__contact-address-3"
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
            className="wp-block-ns-stakeholder-hero-simple__contact-phone"
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
        <div className="wp-block-ns-stakeholder-hero-simple__ctas">
          <div className="wp-block-ns-stakeholder-hero-simple__cta --cta">Primary CTA</div>
          <div className="wp-block-ns-stakeholder-hero-simple__cta --cta --secondary">Secondary CTA</div>
          <div className="wp-block-ns-stakeholder-hero-simple__cta --cta --tertiary">Tertiarty CTA</div>
        </div>
      </div>
    </div>
  )
}
