import { InnerBlocks } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import { verticalSplit } from "../../editor-icons"
import Edit from "./edit"
import metadata from "./block.json"
import "./style.scss"

registerBlockType(metadata, {
  icon: verticalSplit,
  edit: Edit,
  save: () => <InnerBlocks.Content />,
})
