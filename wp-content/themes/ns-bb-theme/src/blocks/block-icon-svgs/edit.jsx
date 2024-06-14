import { useBlockProps } from "@wordpress/block-editor"
import { default as IconList } from "./iconList"

export default function Edit() {
  return (
    <div {...useBlockProps({ className: "alignwide" })}>
      <IconList />
    </div>
  )
}
