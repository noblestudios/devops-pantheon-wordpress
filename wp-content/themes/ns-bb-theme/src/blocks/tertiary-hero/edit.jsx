import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { PanelBody, RadioControl, TextControl } from "@wordpress/components"
import { ImageSelect, TagSelect, LinkSelect, Repeater, repeaterOnChange } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { heroStyle, backgroundImage, headline, eyebrow, intro, headlineTag, eyebrowTag, links } = attributes

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

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title="Tertiary Hero Settings" initialOpen={true}>
            <RadioControl
              label="hero Layout"
              selected={heroStyle}
              options={[
                { label: "Square Image", value: "square-image" },
                { label: "Background Image", value: "bg-image" },
              ]}
              onChange={(value) => setAttributes({ heroStyle: value })}
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
          </PanelBody>
          <PanelBody title={"Links"} initialOpen={true}>
            <Repeater
              props={props}
              attribute="links"
              label="Link"
              pluralLabel="Links"
              newObject={{
                title: "",
                link: "",
              }}
              fields={(index) => {
                const attribute = "links"
                return [
                  <TextControl
                    key="title"
                    label="Title"
                    value={props.attributes.links[index].title}
                    onChange={(value) => {
                      repeaterOnChange(attribute, "title", value, index, props)
                    }}
                  />,
                  <LinkSelect
                    key="link"
                    label="Link"
                    value={props.attributes.links[index].link}
                    onChange={(value) => {
                      repeaterOnChange(attribute, "link", value, index, props)
                    }}
                    onRemove={() => {
                      repeaterOnChange(attribute, "link", {}, index, props)
                    }}
                  />,
                ]
              }}
            />
          </PanelBody>
          <PanelBody title={"Markup"} initialOpen={true}>
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
          </PanelBody>
        </InspectorControls>
      )}
      <div
        className={`wp-block-ns-tertiary-hero__background --${heroStyle}`}
        style={{
          backgroundImage:
            heroStyle === "bg-image" && imageObject !== undefined ? `url(${imageObject.source_url})` : "unset",
        }}
      >
        <div className="wp-block-ns-tertiary-hero__grid">
          {heroStyle === "square-image" && imageObject !== undefined && (
            <div className="wp-block-ns-tertiary-hero__image">
              <img src={imageObject.source_url} alt="" />
            </div>
          )}
          <div
            className={`wp-block-ns-tertiary-hero__body ${heroStyle === "bg-image" ? "--theme-background-image" : ""}`}
          >
            <RichText
              tag="div"
              placeholder="...Eyebrow"
              value={eyebrow}
              onChange={(value) => setAttributes({ eyebrow: value })}
              className="wp-block-ns-tertiary-hero__subtitle --eyebrow"
            />
            <RichText
              tag="div"
              placeholder={postTitle ? postTitle : "Headline..."}
              value={headline}
              onChange={(value) => setAttributes({ headline: value })}
              className="wp-block-ns-tertiary-hero__title --hl-xxl"
            />
            <RichText
              tag="p"
              placeholder="...Intro"
              value={intro}
              onChange={(value) => setAttributes({ intro: value })}
              className="wp-block-ns-tertiary-hero__description"
            />
            {links && (
              <div className="wp-block-ns-tertiary-hero__links">
                {links.map((object) => {
                  return (
                    <span key={object.id} className="wp-block-ns-tertiary-hero__link">
                      {object.title}
                    </span>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
