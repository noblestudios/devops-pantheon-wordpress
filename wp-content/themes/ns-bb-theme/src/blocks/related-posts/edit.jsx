import { InspectorControls, useBlockProps, RichText } from "@wordpress/block-editor"
import { PanelBody } from "@wordpress/components"
import { useSelect, select } from "@wordpress/data"
import { TagSelect } from "../../editor-controls"
import { listingResult } from "../../editor-templates/listingResult"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { headline, headlineTag, postTypes } = attributes

  const postType = select("core/editor").getCurrentPostType()
  const postID = select("core/editor").getCurrentPostId()

  const relatedCat = useSelect(
    (select) => {
      return postType !== null ? select("core/editor").getEditedPostAttribute(postTypes[postType].taxonomy) : undefined
    },
    [postTypes, postType]
  )

  const relatedPosts = useSelect(
    (select) => {
      const args =
        postType !== null
          ? {
              exclude: [postID],
              per_page: 3,
            }
          : {}
      if (postType !== "page") {
        args[postTypes[postType].taxonomy] = relatedCat
      }

      return postType !== null ? select("core").getEntityRecords("postType", postType, args) : undefined
    },
    [postID, postType, postTypes, relatedCat]
  )

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={"H Tags"} initialOpen={false}>
            <TagSelect
              label="Headline Tag"
              value={headlineTag}
              onChange={(value) => {
                setAttributes({ headlineTag: value })
              }}
            />
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-related-posts__grid">
        <RichText
          tag="div"
          className="wp-block-ns-related-posts__headline --hl-xl"
          value={headline}
          placeholder="Headline..."
          onChange={(value) => setAttributes({ headline: value })}
        />

        {!relatedPosts && <div className="--spinner" />}
        {relatedPosts && relatedPosts.length === 0 && "No Related Posts Found"}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="wp-block-ns-related-posts__list">
            {relatedPosts.map((i) => {
              return listingResult(i)
            })}
          </div>
        )}
      </div>
    </div>
  )
}
