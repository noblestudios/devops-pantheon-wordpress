import { InnerBlocks } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import Edit from "./edit"
import metadata from "./block.json"
import { bottomNavigation } from "../../editor-icons"
import "./style.scss"

registerBlockType(metadata, {
  icon: bottomNavigation,
  edit: Edit,
  save: () => <InnerBlocks.Content />,
})
