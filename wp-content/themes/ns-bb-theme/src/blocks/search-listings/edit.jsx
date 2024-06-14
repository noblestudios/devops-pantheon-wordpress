import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { PanelBody, TextControl } from "@wordpress/components"
import { TagSelect } from "../../editor-controls"
import { listingPagination } from "../../editor-templates/listingPagination"
import { listingResult } from "../../editor-templates/listingResult"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { headline, headlineTag } = attributes

  const exampleResults = useSelect((select) => {
    return select("core").getEntityRecords("postType", "post", {
      per_page: 12,
    })
  })

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title="Search Results Options" initialOpen={true}>
            <TextControl label="Headline" value={headline} onChange={(value) => setAttributes({ headline: value })} />
            <TagSelect
              label="Headline Tag"
              value={headlineTag}
              onChange={(value) => setAttributes({ headlineTag: value })}
            />
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-search-listings__width">
        <div className="wp-block-ns-search-listings__head">
          <div className="wp-block-ns-search-listings__head-intro">
            <h1 className="wp-block-ns-search-listings__head-headline --hl-xxl">{headline}</h1>
            <div className="wp-block-ns-search-listings__head-count">We found 24 results for your search.</div>
          </div>
          <div className="wp-block-ns-search-listings__head-form">
            <form action="/">
              <input type="search" name="s" value="search text" />
              <button type="submit" className="search-icon"></button>
            </form>
          </div>
        </div>
        {exampleResults === null && <div className="--spinner" />}
        <div className="wp-block-ns-search-listings__list">
          {exampleResults !== null &&
            exampleResults.map((data) => {
              return listingResult(data)
            })}
        </div>
        {listingPagination()}
      </div>
    </div>
  )
}
