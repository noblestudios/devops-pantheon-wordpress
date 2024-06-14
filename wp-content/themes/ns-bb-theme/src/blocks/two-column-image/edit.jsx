import {
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls,
  BlockControls,
  MediaPlaceholder
} from "@wordpress/block-editor"
import { PanelBody, ToggleControl, Toolbar } from "@wordpress/components"
import { useSelect } from "@wordpress/data"
import { ImageSelect, ImageToolbarButton } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { sideImage, flip, isExample } = attributes

  const imageObject = useSelect(
    (select) => {
      return sideImage ? select("core").getMedia(sideImage) : undefined
    },
    [sideImage]
  )

  return (
    <div {...useBlockProps({ className: "alignwide" })}>
      {isSelected && (
        <>
          <InspectorControls>
            <PanelBody title={"Options"} initialOpen={true}>
              <ImageSelect
                label="Image"
                props={props}
                selectedImage={sideImage}
                onSelect={(newImage) => {
                  setAttributes({ sideImage: newImage.id })
                }}
                onRemove={() => {
                  setAttributes({
                    sideImage: 0
                  })
                }}
              />
              <ToggleControl
                checked={flip}
                label="Flip Image"
                onChange={(value) => {
                  setAttributes({ flip: value })
                }}
              />
            </PanelBody>
          </InspectorControls>
          <BlockControls>
            <Toolbar>
              <ImageToolbarButton props={props} attribute={"sideImage"} />
            </Toolbar>
          </BlockControls>
        </>
      )}
      <div className={`wp-block-ns-two-column-image__wrapper ${flip ? "--flip" : ""}`}>
        <div className="wp-block-ns-two-column-image__image-wrapper">
          {imageObject !== undefined && <img src={imageObject.source_url} alt="" />}
          {isExample && <img src="https://pd.w.org/2024/02/79065c51d21e33290.02031306-1536x1152.jpg" alt="" />}
          {!sideImage && !isExample && (
            <MediaPlaceholder
              onSelect={(image) => {
                setAttributes({ sideImage: image.id })
              }}
              value={sideImage}
              allowedTypes={["image"]}
              multiple={false}
              style={{
                height: "100%"
              }}
            />
          )}
        </div>
        <div
          {...useInnerBlocksProps(
            { className: "wp-block-ns-two-column-image__content" },
            { allowedBlocks: ["core/paragraph", "core/list", "core/buttons", "ns/eyebrow"] }
          )}
        />
      </div>
    </div>
  )
}
