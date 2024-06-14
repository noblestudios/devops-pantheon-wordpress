import { registerBlockType } from "@wordpress/blocks"
import { manageSearch } from "../../editor-icons"
import Edit from "./edit"
import metadata from "./block.json"
import "./style.scss"

registerBlockType(metadata, {
  icon: manageSearch,
  edit: Edit,
  save: () => {
    return null
  },
})
