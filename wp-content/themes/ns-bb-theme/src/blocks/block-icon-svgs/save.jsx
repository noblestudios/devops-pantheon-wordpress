import { useBlockProps } from "@wordpress/block-editor"
import { default as IconList } from "./iconList"

export default function save() {
  return (
    <div {...useBlockProps.save({ className: "alignwide" })}>
      <IconList />
    </div>
  )
}
