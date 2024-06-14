import { useBlockProps, useInnerBlocksProps, InspectorControls, RichText } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { PanelBody } from "@wordpress/components"
import { ImageSelect, TagSelect, CtaControl } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { headline, headlineTag, subHeadlineTag, subHeadline, backgroundImage, cta1, cta2 } = attributes

  const postTitle = useSelect((select) => {
    return select("core/editor").getEditedPostAttribute("title")
  })

  const imageObject = useSelect(
    (select) => {
      const imageId = backgroundImage ? backgroundImage : select("core/editor").getEditedPostAttribute("featured_media")
      return imageId ? select("core").getMedia(imageId) : undefined
    },
    [backgroundImage],
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
            <TagSelect
              label="Subheadline Tag"
              value={subHeadlineTag}
              onChange={(value) => setAttributes({ subHeadlineTag: value })}
            />
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-form-hero__main-grid">
        <div className="wp-block-ns-form-hero__image-wrap">
          {imageObject && <img src={imageObject.source_url} alt="" />}
        </div>
        <div className="wp-block-ns-form-hero__content">
          <div className="wp-block-ns-form-hero__content-body --theme-background-image">
            <RichText
              tag="div"
              className="wp-block-ns-form-hero__headline --hl-xxl"
              value={headline}
              placeholder={postTitle ? postTitle : "...Headline"}
              onChange={(value) => setAttributes({ headline: value })}
            />
            <RichText
              tag="div"
              className="wp-block-ns-form-hero__subheadline --hl-m"
              value={subHeadline}
              placeholder={postTitle ? postTitle : "...Subheadline"}
              onChange={(value) => setAttributes({ subHeadline: value })}
            />
            <div className="wp-block-ns-form-hero__ctas">
              <CtaControl
                className="wp-block-ns-form-hero__cta --cta"
                onUpdate={(value) => setAttributes({ cta1: value })}
                value={cta1}
              />
              <CtaControl
                className="wp-block-ns-form-hero__cta --cta --secondary"
                onUpdate={(value) => setAttributes({ cta2: value })}
                value={cta2}
              />
            </div>
          </div>
          <div
            {...useInnerBlocksProps(
              { className: "wp-block-ns-form-hero__form-wrap" },
              { allowedBlocks: ["gravityforms/form", "core/heading", "core/html"] },
            )}
          />
        </div>
      </div>
    </div>
  )
}
