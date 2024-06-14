import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

export default function Edit() {
  return (
    <div {...useBlockProps()}>
      <div className="wp-block-ns-accordion__wrapper">
        <div
          {...useInnerBlocksProps(
            {
              className: "wp-block-ns-accordion__items"
            },
            {
              allowedBlocks: ["ns/accordion-section"]
            }
          )}
        />
      </div>
    </div>
  )
}
