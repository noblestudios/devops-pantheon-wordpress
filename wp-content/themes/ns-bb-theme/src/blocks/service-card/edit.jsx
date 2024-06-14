import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { PanelBody, TextControl, TextareaControl } from "@wordpress/components"
import { ImageSelect, LinkSelect, Repeater, repeaterOnChange } from "../../editor-controls"

export default function edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { cardImage, headline, intro, links } = attributes

  const imageObject = useSelect(
    (select) => {
      return cardImage ? select("core").getMedia(cardImage) : undefined
    },
    [cardImage]
  )

  return (
    <div {...useBlockProps()}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={"Service Card Content"} initialOpen={true}>
            <ImageSelect
              label="Image"
              props={props}
              selectedImage={cardImage}
              onSelect={(newImage) => setAttributes({ cardImage: newImage.id })}
              onRemove={() => {
                setAttributes({ cardImage: 0 })
              }}
            />
            <TextControl
              label="Headline"
              value={headline}
              onChange={(value) => {
                setAttributes({ headline: value })
              }}
            />
            <TextareaControl
              label="Intro"
              value={intro}
              onChange={(value) => {
                setAttributes({ intro: value })
              }}
            />
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
        </InspectorControls>
      )}
      <article className="wp-block-ns-service-card">
        <div className="wp-block-ns-service-card__wrapper">
          <div className="wp-block-ns-service-card__image">
            {imageObject !== undefined && <img src={imageObject.source_url} alt="" />}
          </div>
          <div className="wp-block-ns-service-card__title-wrapper">
            <div className="wp-block-ns-service-card__title --hl-xs">{headline}</div>
          </div>
          <div className="wp-block-ns-service-card__content">{intro}</div>
          <div className="wp-block-ns-service-card__items">
            {links.map((item) => {
              return (
                <span key={item.id} className="wp-block-ns-service-card__item-link">
                  {item.title}
                </span>
              )
            })}
          </div>
        </div>
      </article>
    </div>
  )
}
