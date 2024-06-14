import { registerBlockStyle } from "@wordpress/blocks"
import { addFilter } from "@wordpress/hooks"

addFilter("blocks.registerBlockType", "ns/button_block_supports", (props, name) => {
  if (name === "core/button") {
    props.styles = []
  }
  return props
})

registerBlockStyle("core/button", {
  name: "primary",
  label: "Primary",
  isDefault: true,
})

registerBlockStyle("core/button", {
  name: "secondary",
  label: "Secondary",
})

registerBlockStyle("core/button", {
  name: "micro",
  label: "Micro",
})

registerBlockStyle("core/button", {
  name: "tertiary",
  label: "Tertiary",
})
