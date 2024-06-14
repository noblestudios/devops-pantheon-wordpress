import { addFilter } from "@wordpress/hooks"

addFilter("blocks.registerBlockType", "ns/quote_block_supports", (props, name) => {
  if (name === "core/quote") {
    return Object.assign({}, props, {
      supports: {
        ...props.supports,
        ...{
          align: ["wide"],
        },
      },
    })
  }
  return props
})
