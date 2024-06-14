import { registerBlockType } from "@wordpress/blocks"
import Edit from "./edit"
import Save from "./save"
import metadata from "./block.json"
import { sideNavigation } from "../../editor-icons"
import "./style.scss"

registerBlockType(metadata, {
  icon: sideNavigation,
  edit: Edit,
  save: Save,
})
