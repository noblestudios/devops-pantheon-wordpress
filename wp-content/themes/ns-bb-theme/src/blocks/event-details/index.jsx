import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks } from "@wordpress/block-editor"
import Edit from "./edit"
import metadata from "./block.json"
import "./style.scss"

registerBlockType(metadata, {
  edit: Edit,
  save: () => <InnerBlocks.Content />,
})
