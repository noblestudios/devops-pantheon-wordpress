import { useBlockProps, InspectorControls, RichText, InnerBlocks } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { PanelBody, TextControl, ToggleControl, SelectControl, RadioControl } from "@wordpress/components"
import { ImageSelect, TagSelect, LinkSelect, CtaControl } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props

  const {
    eyebrow,
    eyebrowTag,
    headline,
    headlineTag,
    image,
    cta,
    textControlValue,
    selectControlValue,
    radioControlValue,
    toggleControlValue,
    linkControlValue,
  } = attributes

  const imageObject = useSelect(
    (select) => {
      return image ? select("core").getMedia(image) : undefined
    },
    [image]
  )

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={"Block Settings"} initialOpen={true}>
            <TagSelect
              label="Eyebrow Tag"
              value={eyebrowTag}
              onChange={(value) => setAttributes({ eyebrowTag: value })}
            />
            <TagSelect
              label="Headline Tag"
              value={headlineTag}
              onChange={(value) => setAttributes({ headlineTag: value })}
            />
            <ImageSelect
              label="Image"
              props={props}
              selectedImage={image}
              onSelect={(newImage) => setAttributes({ image: newImage.id })}
              onRemove={() => {
                setAttributes({ image: 0 })
              }}
            />
            <TextControl
              label="Text Control"
              value={textControlValue}
              onChange={(value) => setAttributes({ textControlValue: value })}
            />
            <SelectControl
              label="Select Control"
              value={selectControlValue}
              options={[
                { label: "option 1", value: "option 1" },
                { label: "option 2", value: "option 2" },
              ]}
              onChange={(value) => setAttributes({ selectControlValue: value })}
            />
            <RadioControl
              label="Select Control"
              selected={radioControlValue}
              options={[
                { label: "option 1", value: "option 1" },
                { label: "option 2", value: "option 2" },
              ]}
              onChange={(value) => setAttributes({ radioControlValue: value })}
            />
            <ToggleControl
              label="Toggle Control"
              checked={toggleControlValue}
              onChange={(value) => setAttributes({ toggleControlValue: value })}
            />
            <LinkSelect
              label="Link"
              value={linkControlValue}
              onChange={(value) => {
                setAttributes({ linkControlValue: value })
              }}
              onRemove={() => {
                setAttributes({ linkControlValue: {} })
              }}
            />
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-starter-block__grid">
        <div className="wp-block-ns-starter-block__left-col">
          <RichText
            tag="div"
            className="--eyebrow"
            value={eyebrow}
            placeholder="...Eyebrow"
            onChange={(value) => setAttributes({ eyebrow: value })}
          />
          <RichText
            tag="div"
            className="--hl-xxl"
            value={headline}
            placeholder="...Headline"
            onChange={(value) => setAttributes({ headline: value })}
          />
          <InnerBlocks
            allowedBlocks={["core/paragraph"]}
            template={[["core/paragraph", { placeholder: "paragraph placeholder" }]]}
          />
          <CtaControl className="--cta" onUpdate={(value) => setAttributes({ cta: value })} value={cta} />
        </div>
        <div className="wp-block-ns-starter-block__right-col">
          {imageObject !== undefined && (
            <div className="wp-block-ns-starter-block__image">
              <img src={imageObject.source_url} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
