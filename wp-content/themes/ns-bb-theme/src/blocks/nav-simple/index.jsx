import { registerBlockType } from "@wordpress/blocks"
import Edit from "./edit"
import metadata from "./block.json"
import { toolbar } from "../../editor-icons"
import "./style.scss"

registerBlockType(metadata, {
  icon: toolbar,
  edit: Edit,
  save: () => {
    return null
  },
})
