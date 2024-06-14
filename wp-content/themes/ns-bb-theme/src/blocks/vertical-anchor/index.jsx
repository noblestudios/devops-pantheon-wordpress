import { registerBlockType } from "@wordpress/blocks"
import { anchor } from "../../editor-icons"
import Edit from "./edit"
import metadata from "./block.json"
import "./style.scss"

registerBlockType(metadata, {
  icon: anchor,
  edit: Edit,
  save: () => {
    return null
  },
})
