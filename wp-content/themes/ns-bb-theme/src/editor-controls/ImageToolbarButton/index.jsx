import { MediaUpload } from "@wordpress/block-editor"
import { IconButton } from "@wordpress/components"

function ImageToolbarButton({ props, attribute }) {
  const { attributes, setAttributes } = props

  return (
    <MediaUpload
      onSelect={(value) => {
        setAttributes({ [attribute]: value.id })
      }}
      allowedTypes={["image"]}
      value={attributes[attribute]}
      render={({ open }) => <IconButton label={"Edit Image"} icon="cover-image" onClick={open} />}
    />
  )
}

export default ImageToolbarButton
