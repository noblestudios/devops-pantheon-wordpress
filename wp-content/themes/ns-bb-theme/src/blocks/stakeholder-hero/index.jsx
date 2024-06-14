import { registerBlockType } from "@wordpress/blocks"
import { dominoMask } from "../../editor-icons"
import Edit from "./edit"
import metadata from "./block.json"
import "./style.scss"

registerBlockType(metadata, {
  icon: dominoMask,
  edit: Edit,
  save: () => {
    return null
  },
})
