import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { PanelBody, ToggleControl } from "@wordpress/components"
import { PostPicker } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { dropDownChildren, manualSelection, selectedPage } = attributes

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title="Article Detail Options" initialOpen={true}>
            <ToggleControl
              label="Manual Selection?"
              checked={manualSelection}
              onChange={(value) => setAttributes({ manualSelection: value })}
            />
            {manualSelection && (
              <PostPicker
                label="Return Page"
                value={selectedPage}
                postType="page"
                onChange={(value) => {
                  setAttributes({ selectedPage: value })
                }}
              />
            )}
            {!manualSelection && (
              <ToggleControl
                label="Child Drop Down?"
                checked={dropDownChildren}
                onChange={(value) => setAttributes({ dropDownChildren: value })}
              />
            )}
          </PanelBody>
        </InspectorControls>
      )}

      <div className="wp-block-ns-breadcrumbs__wrapper">
        <ul className="wp-block-ns-breadcrumbs__items">
          <li className="wp-block-ns-breadcrumbs__item">
            <span className="wp-block-ns-breadcrumbs__item-link">
              Home<span className="wp-block-ns-breadcrumbs__item-arrow"></span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
