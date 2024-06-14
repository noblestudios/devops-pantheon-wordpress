import { addFilter } from "@wordpress/hooks"

addFilter("blocks.registerBlockType", "ns/embed_block_supports", (props, name) => {
  if (name === "core/embed") {
    const allowed = ["youtube", "vimeo"]

    const remainingArr = props.variations.filter((data) => allowed.includes(data.name))

    return Object.assign({}, props, {
      variations: remainingArr,
      supports: {
        ...props.supports,
        ...{
          align: ["wide", "left", "center", "right"],
        },
      },
    })
  }
  return props
})
