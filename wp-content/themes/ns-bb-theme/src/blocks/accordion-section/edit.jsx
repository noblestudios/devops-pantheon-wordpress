import { useBlockProps, useInnerBlocksProps, RichText } from "@wordpress/block-editor"

export default function Edit(props) {
  const { attributes, setAttributes } = props
  const { headline } = attributes

  return (
    <div {...useBlockProps()}>
      <div className="wp-block-ns-accordion__item --open">
        <RichText
          tag="div"
          className="wp-block-ns-accordion__item-toggle"
          value={headline}
          placeholder="Headline..."
          onChange={(value) => setAttributes({ headline: value })}
        />
        <div className="wp-block-ns-accordion__item-wrapper">
          <div
            {...useInnerBlocksProps(
              {
                className: "wp-block-ns-accordion__item-content",
              },
              {
                allowedBlocks: ["core/paragraph", "core/list", "core/image"],
              }
            )}
          />
        </div>
      </div>
    </div>
  )
}
