import { useBlockProps, InspectorControls, useInnerBlocksProps } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { PanelBody } from "@wordpress/components"
import { ImageSelect } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { featuredImage } = attributes

  const imageObject = useSelect(
    (select) => {
      return featuredImage ? select("core").getMedia(featuredImage) : undefined
    },
    [featuredImage]
  )

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={"Hero Settings"} initialOpen={true}>
            <ImageSelect
              label="Image"
              props={props}
              selectedImage={featuredImage}
              onSelect={(newImage) => setAttributes({ featuredImage: newImage.id })}
              onRemove={() => {
                setAttributes({ featuredImage: 0 })
              }}
            />
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-stake-featured-topics__grid">
        <div className="wp-block-ns-stake-featured-topics__image-wrap">
          {imageObject && <img src={imageObject.source_url} alt="" />}
        </div>
        <div
          {...useInnerBlocksProps(
            { className: "wp-block-ns-stake-featured-topics__content" },
            {
              template: [
                [
                  "core/columns",
                  { className: "" },
                  [
                    [
                      "core/column",
                      {},
                      [
                        [
                          "core/heading",
                          {
                            level: 2,
                            placeholder: "Headline...",
                            className: "is-style-hl-xl",
                          },
                        ],
                        [
                          "core/paragraph",
                          {
                            placeholder: "Description...",
                          },
                        ],
                      ],
                    ],
                    [
                      "core/column",
                      {},
                      [
                        [
                          "core/heading",
                          {
                            level: 2,
                            placeholder: "Headline...",
                            className: "is-style-hl-xl",
                          },
                        ],
                        [
                          "core/paragraph",
                          {
                            placeholder: "Description...",
                          },
                        ],
                      ],
                    ],
                    [
                      "core/column",
                      {},
                      [
                        [
                          "core/heading",
                          {
                            level: 2,
                            placeholder: "Headline...",
                            className: "is-style-hl-xl",
                          },
                        ],
                        [
                          "core/paragraph",
                          {
                            placeholder: "Description...",
                          },
                        ],
                      ],
                    ],
                  ],
                ],
              ],
            }
          )}
        />
      </div>
    </div>
  )
}
