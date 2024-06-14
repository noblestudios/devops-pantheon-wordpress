import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { PanelBody, RadioControl, ToggleControl } from "@wordpress/components"
import { date } from "@wordpress/date"
import { ImageSelect, TagSelect } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { backgroundImage, headline, headlineTag, showExcerpt, excerptOverride, textAlign } = attributes

  const imageObject = useSelect(
    (select) => {
      const imageId = backgroundImage ? backgroundImage : select("core/editor").getEditedPostAttribute("featured_media")
      return imageId ? select("core").getMedia(imageId) : undefined
    },
    [backgroundImage]
  )

  const postTitle = useSelect((select) => {
    return select("core/editor").getEditedPostAttribute("title")
  })

  const postType = useSelect((select) => {
    return select("core/editor").getCurrentPostType()
  })

  const postObject = useSelect((select) => {
    return select("core/editor").getCurrentPost()
  })

  const postExcerpt = useSelect((select) => {
    return select("core/editor").getEditedPostAttribute("excerpt")
  })

  const catIds = useSelect((select) => {
    return select("core/editor").getEditedPostAttribute("categories")
  })

  const postCategories = useSelect(
    (select) => {
      return catIds
        ? select("core").getEntityRecords("taxonomy", "category", {
            include: catIds,
          })
        : undefined
    },
    [catIds]
  )

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title="Default Hero Settings" initialOpen={true}>
            <RadioControl
              label="hero Layout"
              selected={textAlign}
              options={[
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
              ]}
              onChange={(value) => setAttributes({ textAlign: value })}
            />
            <ImageSelect
              label="Image"
              props={props}
              selectedImage={backgroundImage}
              onSelect={(newImage) => setAttributes({ backgroundImage: newImage.id })}
              onRemove={() => {
                setAttributes({ backgroundImage: 0 })
              }}
            />
            <ToggleControl
              label="Show Excerpt?"
              checked={showExcerpt}
              onChange={(value) => setAttributes({ showExcerpt: value })}
            />
          </PanelBody>
          <PanelBody title={"Markup"} initialOpen={true}>
            <TagSelect
              label="Headline Tag"
              value={headlineTag}
              onChange={(value) => setAttributes({ headlineTag: value })}
            />
          </PanelBody>
        </InspectorControls>
      )}
      <div
        className="wp-block-ns-default-hero__background"
        style={{
          backgroundImage: imageObject !== undefined ? `url(${imageObject.source_url})` : "unset",
        }}
      >
        <div className={`wp-block-ns-default-hero__grid --${textAlign} --theme-background-image`}>
          <div className="wp-block-ns-default-hero__body">
            {postType === "post" && (
              <p className="wp-block-ns-default-hero__subtitle">
                Posted {date("F j, Y", postObject.date)}
                {postCategories !== undefined && postCategories !== null && (
                  <>
                    &nbsp;in&nbsp;
                    {postCategories.map((cat, index) => {
                      return (
                        <>
                          <span className="wp-block-ns-default-hero__post-info__link">{cat.name}</span>
                          {index === postCategories.length - 1 ? "" : ", "}
                        </>
                      )
                    })}
                  </>
                )}
              </p>
            )}
            <RichText
              tag="div"
              placeholder={postTitle ? postTitle : "Headline..."}
              value={headline}
              onChange={(value) => setAttributes({ headline: value })}
              className="wp-block-ns-default-hero__title"
            />
            {showExcerpt && (
              <RichText
                tag="p"
                placeholder={postExcerpt ? postExcerpt : "Excerpt..."}
                value={excerptOverride}
                onChange={(value) => setAttributes({ excerptOverride: value })}
                className="wp-block-ns-default-hero__description"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
