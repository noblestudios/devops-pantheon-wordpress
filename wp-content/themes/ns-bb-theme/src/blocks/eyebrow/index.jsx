import { registerBlockType } from "@wordpress/blocks"
import { subHeader } from "../../editor-icons"
import Edit from "./edit"
import save from "./save"
import metadata from "./block.json"

registerBlockType(metadata, {
  icon: subHeader,
  edit: Edit,
  save,
})
