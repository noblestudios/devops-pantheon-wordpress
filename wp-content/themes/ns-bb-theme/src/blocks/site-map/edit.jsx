import { useBlockProps, RichText, useInnerBlocksProps, InspectorControls } from "@wordpress/block-editor"
import { PanelBody, TextControl } from "@wordpress/components"
import { LinkSelect, Repeater, repeaterOnChange } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, setAttributes } = props

  const { headline, eyebrow, parentLinks } = attributes
  return (
    <div {...useBlockProps()}>
      <section className="site-map">
        <div className="site-map__wrapper alignwide">
          <div className="site-map__header">
            <RichText
              className="site-map__eyebrow"
              value={eyebrow}
              onChange={(value) => {
                setAttributes({ eyebrow: value })
              }}
            ></RichText>
            <RichText
              className="site-map__headline"
              value={headline}
              onChange={(value) => {
                setAttributes({ headline: value })
              }}
            ></RichText>
            <div
              {...useInnerBlocksProps(
                { className: "site-map__header-content" },
                { allowedBlocks: ["core/paragraph", "core/list"] },
              )}
            />
          </div>
          <div className="site-map__jump-links">
            <div className="site-map__jump-links-action">I&apos;m looking for</div>
            <ul className="site-map__jump-links-items">
              {parentLinks.map((item) => {
                return (
                  <li key={item.id} className="site-map__jump-links-item">
                    <button className="site-map__jump-links-item-toggle js-jump-toggle" type="button">
                      {item.title ? item.title : item.link.title}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
      <InspectorControls>
        <PanelBody title="Sitemap Parent Pages" initialOpen={true}>
          <Repeater
            props={props}
            attribute="parentLinks"
            label="Link"
            pluralLabel="Links"
            newObject={{
              title: "",
              link: "",
            }}
            fields={(index) => {
              const attribute = "parentLinks"
              return [
                <TextControl
                  key="title"
                  label="Title"
                  value={props.attributes.parentLinks[index].title}
                  onChange={(value) => {
                    repeaterOnChange(attribute, "title", value, index, props)
                  }}
                />,
                <LinkSelect
                  key="link"
                  label="Link"
                  value={props.attributes.parentLinks[index].link}
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
    </div>
  )
}
