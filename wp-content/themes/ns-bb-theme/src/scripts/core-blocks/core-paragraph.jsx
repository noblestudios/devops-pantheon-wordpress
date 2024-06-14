import { registerBlockStyle } from "@wordpress/blocks"
import { addFilter } from "@wordpress/hooks"

registerBlockStyle("core/paragraph", {
  name: "p-regular",
  label: "Regular Size",
  isDefault: true,
})

registerBlockStyle("core/paragraph", {
  name: "p-micro",
  label: "Micro Size",
})

addFilter("blocks.registerBlockType", "ns/paragraph_block_supports", (props, name) => {
  if (name === "core/paragraph") {
    return Object.assign({}, props, {
      supports: { ...props.supports, ...{ align: ["wide"] } },
    })
  }
  return props
})
