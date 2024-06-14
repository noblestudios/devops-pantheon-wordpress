import { useBlockProps, RichText, BlockControls, AlignmentControl } from "@wordpress/block-editor"
import { Platform } from "@wordpress/element"
import { createBlock, getDefaultBlockName } from "@wordpress/blocks"
import classnames from "classnames"
import HeadingLevelDropdown from "./htag-dropdown"

export default function edit({ attributes, setAttributes, onReplace, clientId }) {
  const { content, tag, textAlign } = attributes
  const blockProps = useBlockProps()

  return (
    <div {...useBlockProps()}>
      {
        <BlockControls>
          <HeadingLevelDropdown selectedLevel={tag} onChange={(newLevel) => setAttributes({ tag: newLevel })} />
          <AlignmentControl
            value={textAlign}
            onChange={(nextAlign) => {
              setAttributes({ textAlign: nextAlign })
            }}
          />
        </BlockControls>
      }
      <RichText
        {...blockProps}
        tagName={tag === 0 ? "div" : "h" + tag}
        value={content}
        allowedFormats={[]}
        className={classnames("--eyebrow", {
          [`has-text-align-${textAlign}`]: textAlign,
        })}
        onChange={(newContent) => setAttributes({ content: newContent })}
        onSplit={(value, isOriginal) => {
          let block

          if (isOriginal || value) {
            block = createBlock("ns/eyebrow", {
              ...attributes,
              content: value,
            })
          } else {
            block = createBlock(getDefaultBlockName() ?? "core/paragraph")
          }

          if (isOriginal) {
            block.clientId = clientId
          }

          return block
        }}
        textAlign={textAlign}
        onReplace={onReplace}
        placeholder={"Eyebrow..."}
        {...(Platform.isNative && { deleteEnter: true })}
      />
    </div>
  )
}
