import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { PanelBody, TextControl } from "@wordpress/components"
import { Repeater, repeaterOnChange } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, isSelected } = props
  const { anchorLinks } = attributes
  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
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
      <div className="wp-block-ns-horizontal-anchor__wrapper">
        <div className="wp-block-ns-horizontal-anchor__items">
          {anchorLinks.map((link, index) => {
            return (
              <div key={index} className="wp-block-ns-horizontal-anchor__item">
                <div className="wp-block-ns-horizontal-anchor__link">{link.text}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
