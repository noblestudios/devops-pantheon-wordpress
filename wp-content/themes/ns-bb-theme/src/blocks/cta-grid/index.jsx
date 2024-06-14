import { InnerBlocks } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import Edit from "./edit"
import metadata from "./block.json"
import { datasetLinked } from "../../editor-icons"
import "./style.scss"

registerBlockType(metadata, {
  icon: datasetLinked,
  edit: Edit,
  save: () => <InnerBlocks.Content />,
})
