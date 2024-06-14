import { registerBlockType } from "@wordpress/blocks"
import { gridView } from "../../editor-icons"
import Edit from "./edit"
import metadata from "./block.json"
import "./style.scss"

registerBlockType(metadata, {
  icon: gridView,
  edit: Edit,
  save: () => {
    return null
  },
})
