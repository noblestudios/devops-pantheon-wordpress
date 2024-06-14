import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { PanelBody, TextControl } from "@wordpress/components"
import { TagSelect } from "../../editor-controls"
import { listingPagination } from "../../editor-templates/listingPagination"
import { listingResultWide } from "../../editor-templates/listingResultWide"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { headline, headlineTag } = attributes
  const exampleResults = useSelect((select) => {
    return select("core").getEntityRecords("postType", "page", {
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
      <div className="wp-block-ns-advanced-search__width">
        <div className="wp-block-ns-advanced-search__head">
          <div className="wp-block-ns-advanced-search__head-intro">
            <div className="wp-block-ns-advanced-search__head-headline --hl-xxl">{headline}</div>
            <div className="wp-block-ns-advanced-search__head-count">We found 24 total results for your search.</div>
          </div>
          <div className="wp-block-ns-advanced-search__head-form">
            <form action="/">
              <input type="search" name="s" value="search text" />
              <button type="submit" className="search-icon"></button>
            </form>
          </div>
        </div>
        <div className="wp-block-ns-advanced-search__columns">
          <div className="wp-block-ns-advanced-search__filter-col">
            <form className="wp-block-ns-advanced-search__filter-form">
              <div className="wp-block-ns-advanced-search__filter-col-wrap">
                <div className="wp-block-ns-advanced-search__filter-headline">Filter Your Results</div>
                <button className="wp-block-ns-advanced-search__desktop-filter-clear" type="button">
                  Clear All Filters
                </button>
                <ul className="wp-block-ns-advanced-search__filter-list">
                  <li>
                    <label htmlFor="first">
                      <input type="checkbox" name="type" />
                      Post (34)
                    </label>
                  </li>
                  <li>
                    <label htmlFor="first">
                      <input type="checkbox" name="type" />
                      Pages (23)
                    </label>
                  </li>
                  <li>
                    <label htmlFor="first">
                      <input type="checkbox" name="type" />
                      Event (14)
                    </label>
                  </li>
                </ul>
              </div>
            </form>
          </div>
          <div className="wp-block-ns-advanced-search__results-col">
            {exampleResults === null && <div className="--spinner" />}
            <div className="wp-block-ns-advanced-search__results-list">
              {exampleResults !== null &&
                exampleResults.map((data) => {
                  return listingResultWide(data)
                })}
            </div>
            {listingPagination()}
          </div>
        </div>
      </div>
    </div>
  )
}
