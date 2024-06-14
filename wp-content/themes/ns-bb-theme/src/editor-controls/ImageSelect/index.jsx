import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { BaseControl, useBaseControlProps, Button, ResponsiveWrapper } from "@wordpress/components"
import { useSelect } from "@wordpress/data"

function ImageSelect({ label, selectedImage, onSelect, onRemove }) {
  const imageObj = useSelect(
    (select) => {
      // this check is needed for repeater
      const imageID = typeof selectedImage === "object" ? selectedImage.id : selectedImage
      return imageID ? select("core").getMedia(imageID) : undefined
    },
    [selectedImage]
  )

  const { baseControlProps } = useBaseControlProps({ label })

  return (
    <BaseControl {...baseControlProps}>
      <MediaUploadCheck>
        <MediaUpload
          onSelect={onSelect}
          value={selectedImage}
          allowedTypes={["image"]}
          render={({ open }) => (
            <Button
              className={
                selectedImage === 0 ? "editor-post-featured-image__toggle" : "editor-post-featured-image__preview"
              }
              onClick={open}
            >
              {selectedImage === 0 && "Choose an image"}

              {imageObj !== undefined && (
                <ResponsiveWrapper
                  naturalWidth={imageObj.media_details.width}
                  naturalHeight={imageObj.media_details.height}
                >
                  <img src={imageObj.source_url} alt="" />
                </ResponsiveWrapper>
              )}
            </Button>
          )}
        />
      </MediaUploadCheck>
      {selectedImage !== 0 && (
        <MediaUploadCheck>
          <Button onClick={onRemove} isLink isDestructive>
            {"Remove image"}
          </Button>
        </MediaUploadCheck>
      )}
    </BaseControl>
  )
}

export default ImageSelect
