import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { select } from "@wordpress/data"
import { PanelBody, TextControl } from "@wordpress/components"
import { LinkSelect, Repeater, repeaterOnChange } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, isSelected } = props
  const { linksTop } = attributes

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title="Grid Top Links" initialOpen={true}>
            <Repeater
              props={props}
              attribute="linksTop"
              label="Link"
              pluralLabel="Links"
              newObject={{
                title: "",
                link: "",
              }}
              fields={(index) => {
                const attribute = "linksTop"
                return [
                  <TextControl
                    key="title"
                    label="Title"
                    value={props.attributes.linksTop[index].title}
                    onChange={(value) => {
                      repeaterOnChange(attribute, "title", value, index, props)
                    }}
                  />,
                  <LinkSelect
                    key="link"
                    label="Link"
                    value={props.attributes.linksTop[index].link}
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
      <div className="wp-block-ns-cta-grid__wrapper">
        <div className="wp-block-ns-cta-grid__top">
          {linksTop.map((item) => {
            let title = item.link.title
            if (item.title) {
              title = item.title
            }
            const postObj = select("core").getEntityRecord("postType", item?.link?.type, item?.link?.id)
            return (
              <div key={item.id} className="wp-block-ns-cta-grid__item">
                <div className="wp-block-ns-cta-grid__item-image">
                  <div className="wp-block-ns-cta-grid__item-image-placeholder">
                    {postObj?.featured_image_url && <img src={postObj?.featured_image_url} alt="" />}
                  </div>
                </div>
                <div className="wp-block-ns-cta-grid__item-text">{title}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
