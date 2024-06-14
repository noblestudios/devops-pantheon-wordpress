import { registerBlockType } from "@wordpress/blocks"
import Edit from "./edit"
import metadata from "./block.json"
import { toggleOn } from "../../editor-icons"
import "./style.scss"

registerBlockType(metadata, {
  icon: toggleOn,
  edit: Edit,
  save: () => {
    return null
  },
})
