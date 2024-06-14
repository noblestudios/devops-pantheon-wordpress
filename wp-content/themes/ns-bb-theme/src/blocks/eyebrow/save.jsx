import { useBlockProps, RichText } from "@wordpress/block-editor"
import classnames from "classnames"

export default function save({ attributes }) {
  const { textAlign, content, tag } = attributes
  const TagName = tag === 0 ? "div" : "h" + tag
  const className = classnames("--eyebrow", {
    [`has-text-align-${textAlign}`]: textAlign,
  })
  return (
    <TagName {...useBlockProps.save({ className })}>
      <RichText.Content value={content} />
    </TagName>
  )
}
