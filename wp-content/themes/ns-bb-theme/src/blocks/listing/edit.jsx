import { InspectorControls, useBlockProps } from "@wordpress/block-editor"
import { PanelBody, TextControl, SelectControl, ToggleControl } from "@wordpress/components"
import { useSelect } from "@wordpress/data"
import { TagSelect } from "../../editor-controls"
import buildTermsTree from "../../scripts/modules/termTree.js"

export default function edit(props) {
  const { attributes, setAttributes, isSelected } = props

  const {
    headline,
    headlineTag,
    titleStyle,
    postType,
    defaultSort,
    preSelectedTaxonomy,
    preSelectedTerm,
    prepopulateResults,
    noResultsText,
    showFilters,
    autoSubmit,
    hideSort,
    hideResultsCount,
    perPage,
    hidePagination,
    availablePostTypes,
    sortingOptions,
    taxFilterOptions,
    enabledFields,
    isCheckboxVariation,
  } = attributes

  const postTypes = Object.keys(availablePostTypes)

  const taxonomies = useSelect(
    (select) => {
      return postType ? select("core").getTaxonomies({ type: postType, per_page: 100 }) : undefined
    },
    [postType]
  )

  const terms = useSelect(
    (select) => {
      return preSelectedTaxonomy
        ? select("core").getEntityRecords("taxonomy", preSelectedTaxonomy, { per_page: 100 })
        : undefined
    },
    [preSelectedTaxonomy]
  )

  const posts = useSelect(
    (select) => {
      const args = {
        filtered: true,
        per_page: perPage,
        orderby: defaultSort,
        order: sortingOptions[defaultSort].order,
      }
      if (preSelectedTaxonomy && preSelectedTerm) {
        args[preSelectedTaxonomy === "category" ? "categories" : preSelectedTaxonomy] = [preSelectedTerm]
      }
      return select("core").getEntityRecords("postType", postType, args)
    },
    [postType, perPage, defaultSort, sortingOptions, preSelectedTaxonomy, preSelectedTerm]
  )

  const ConditionalWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children)

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={"Layout and Content"} initialOpen={true}>
            <TextControl
              label="Headline"
              value={headline}
              onChange={(value) => {
                setAttributes({ headline: value })
              }}
            />
            {enabledFields.includes("titleStyle") && (
              <SelectControl
                label="Title Style"
                value={titleStyle}
                options={[
                  { label: "Default", value: "--hl-xl" },
                  { label: "Large", value: "--hl-xxl" },
                ]}
                onChange={(value) => {
                  setAttributes({ titleStyle: value })
                }}
              />
            )}
            <TagSelect
              label="HTML Tag"
              value={headlineTag}
              onChange={(value) => {
                setAttributes({ headlineTag: value })
              }}
            />
            <TextControl
              label="No Results Text"
              value={noResultsText}
              onChange={(value) => {
                setAttributes({ noResultsText: value })
              }}
            />
            {enabledFields.includes("autoSubmit") && (
              <ToggleControl
                label="Auto-Submit Filters"
                checked={autoSubmit}
                onChange={(value) => {
                  setAttributes({ autoSubmit: value })
                }}
                help="If enabled, search will run on any filter interaction. If disabled, a Submit Filters button will display to run the search."
              />
            )}
          </PanelBody>
          <PanelBody title={"Query Options"} initialOpen={true}>
            {enabledFields.includes("prepopulateResults") && (
              <ToggleControl
                label="Prepopulate Results"
                checked={prepopulateResults}
                onChange={(value) => {
                  setAttributes({ prepopulateResults: value })
                }}
                help="If selected, the initial results will be loaded when the page loads, and not require dynamic loading after page load."
              />
            )}
            <SelectControl
              label="Post Type"
              value={postType}
              options={[
                ...postTypes.map((i) => {
                  return { label: availablePostTypes[i].name, value: i }
                }),
              ]}
              onChange={(value) => {
                setAttributes({ postType: value })
                setAttributes({ defaultSort: availablePostTypes[value].sorts[0] })
                setAttributes({ showFilters: [] })
                setAttributes({ preSelectedTaxonomy: "" })
                setAttributes({ preSelectedTerm: "" })
              }}
            />
            <SelectControl
              label="Default Sort"
              value={defaultSort}
              options={[
                ...availablePostTypes[postType].sorts.map((i) => {
                  return { label: sortingOptions[i].label, value: i }
                }),
              ]}
              onChange={(value) => {
                setAttributes({ defaultSort: value })
              }}
            />
            {postType && taxonomies !== null && taxonomies !== undefined && (
              <SelectControl
                label="Pre-Filtered Taxonomy"
                value={preSelectedTaxonomy}
                onChange={(value) => {
                  setAttributes({ preSelectedTaxonomy: value })
                  setAttributes({ preSelectedTerm: "" })
                }}
                options={[
                  { label: "Select Taxonomy", value: "" },
                  ...taxonomies
                    .filter((tax) => availablePostTypes[postType].taxonomies.includes(tax.slug))
                    .map((i) => {
                      return { label: i.labels.name, value: i.slug }
                    }),
                ]}
              />
            )}
            {terms !== null && terms !== undefined && (
              <SelectControl
                label="Pre Filtered Term"
                value={preSelectedTerm}
                onChange={(value) => {
                  setAttributes({ preSelectedTerm: value })
                }}
                options={[
                  { label: "Select Term", value: 0 },
                  ...buildTermsTree(terms).map((i) => {
                    return { label: i.name, value: i.id }
                  }),
                ]}
              />
            )}
            <TextControl
              label="Posts Per Page"
              value={perPage}
              type="number"
              min="1"
              step="1"
              max="100"
              onChange={(value) => {
                setAttributes({ perPage: value })
              }}
            />
          </PanelBody>
          <PanelBody title={"Dropdown Options"} initialOpen={true}>
            {taxonomies !== undefined &&
              taxonomies !== null &&
              taxonomies
                .filter((tax) => availablePostTypes[postType].taxonomies.includes(tax.slug))
                .map((i, index) => {
                  return (
                    <ToggleControl
                      key={index}
                      label={`Display ${i.labels.name}`}
                      checked={showFilters.includes(i.slug) ? true : false}
                      onChange={(value) => {
                        let newValue = [...showFilters]
                        if (value && !newValue.includes(i.slug)) {
                          newValue.push(i.slug)
                        } else if (!value && newValue.includes(i.slug)) {
                          newValue = newValue.filter(function (cat) {
                            return cat !== i.slug
                          })
                        }
                        setAttributes({ showFilters: newValue })
                      }}
                    />
                  )
                })}
            <ToggleControl
              label="Hide Sort"
              checked={hideSort}
              onChange={(value) => {
                setAttributes({ hideSort: value })
              }}
            />
            {enabledFields.includes("hideResultsCount") && (
              <ToggleControl
                label="Hide Results Count"
                checked={hideResultsCount}
                onChange={(value) => {
                  setAttributes({ hideResultsCount: value })
                }}
              />
            )}
            {enabledFields.includes("hidePagination") && (
              <ToggleControl
                label="Hide Pagination"
                checked={hidePagination}
                onChange={(value) => {
                  setAttributes({ hidePagination: value })
                }}
              />
            )}
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-listing__wrapper">
        {!isCheckboxVariation && (
          <div className="wp-block-ns-listing__header">
            <div className="wp-block-ns-listing__title">
              <div className={titleStyle}>{headline}</div>
            </div>
            <div className="wp-block-ns-listing__filter-wrapper">
              <div className="wp-block-ns-listing__filters">
                {availablePostTypes[postType].searchParams &&
                  Object.keys(availablePostTypes[postType].searchParams).map((slug) => {
                    const options = availablePostTypes[postType].searchParams[slug]
                    return (
                      <label key={slug} htmlFor={slug} className="wp-block-ns-listing__filter-label">
                        <div className="wp-block-ns-listing__filter-label-text">{options.label}</div>
                        <input type={options.type} />
                      </label>
                    )
                  })}
                {showFilters.map((filter) => {
                  return (
                    <label key={filter} htmlFor="cat" className="wp-block-ns-listing__filter-label">
                      <div className="wp-block-ns-listing__filter-label-text">{taxFilterOptions[filter].label}</div>
                      <div className="wp-block-ns-listing__filter-select-wrapper">
                        <select className="wp-block-ns-listing__filter-select">
                          <option value="1">Show All</option>
                        </select>
                      </div>
                    </label>
                  )
                })}
                {!hideSort && (
                  <label htmlFor="sort" className="wp-block-ns-listing__filter-label">
                    <div className="wp-block-ns-listing__filter-label-text">Sort</div>
                    <div className="wp-block-ns-listing__filter-select-wrapper">
                      <select className="wp-block-ns-listing__filter-select">
                        <option value="date">{sortingOptions[defaultSort].label}</option>
                      </select>
                    </div>
                  </label>
                )}
              </div>
            </div>
          </div>
        )}
        <ConditionalWrapper
          condition={isCheckboxVariation}
          wrapper={(children) => <div className="wp-block-ns-listing__columns">{children}</div>}
        >
          <>
            {isCheckboxVariation && (
              <div className="wp-block-ns-listing__filter-column --desktop">
                {headline && <div className="wp-block-ns-sidebar__title --hl-xl">{headline}</div>}
                <form id="js-filterForm" className="wp-block-ns-listing__filter-sidebar-filters">
                  <div className="wp-block-ns-listing__filter-sidebar-filters-wrap --filter-drawer-wrap">
                    {!hideSort && (
                      <div className="wp-block-ns-listing__filter-sidebar-group --is-open js-subMenu">
                        <div className="wp-block-ns-listing__filter-sidebar-group-headline js-submenuToggle">Sort</div>
                        <div className="wp-block-ns-listing__filter-sidebar-group-wrap">
                          <div className="wp-block-ns-listing__filter-sidebar-group-list">
                            {availablePostTypes[postType].sorts.map((sort) => {
                              return (
                                <div key={sort} className="wp-block-ns-listing__filter-sidebar-group-field">
                                  <label htmlFor={sort} className="wp-block-ns-listing__filter-sidebar-inline-field">
                                    <input type="radio" name="orderby" value={sort} checked={sort} />
                                    {sortingOptions[sort].label}
                                  </label>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                    {!!availablePostTypes[postType].searchParams && (
                      <div className="wp-block-ns-listing__filter-sidebar-group js-subMenu --is-open">
                        <div className="wp-block-ns-listing__filter-sidebar-group-headline js-submenuToggle">
                          Search
                        </div>
                        <div className="wp-block-ns-listing__filter-sidebar-group-wrap">
                          <div className="wp-block-ns-listing__filter-sidebar-group-list">
                            {Object.keys(availablePostTypes[postType].searchParams).map((field) => {
                              const searchObj = availablePostTypes[postType].searchParams[field]
                              return (
                                <div key={field} className="wp-block-ns-listing__filter-sidebar-group-search-field">
                                  <label htmlFor="filter">{searchObj.label}</label>
                                  <div
                                    className={
                                      "wp-block-ns-listing__filter-sidebar-group-" +
                                      searchObj.type +
                                      "-field-style-wrap"
                                    }
                                  >
                                    <input type={searchObj.type} />
                                  </div>
                                </div>
                              )
                            })}
                            <button
                              type="button"
                              className="wp-block-ns-listing__filter-sidebar-group-search-field-submit"
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {showFilters.map((filter) => {
                      return (
                        <div key={filter} className="wp-block-ns-listing__filter-sidebar-group">
                          <div className="wp-block-ns-listing__filter-sidebar-group-headline">
                            {taxFilterOptions[filter].label}
                          </div>
                          <div className="wp-block-ns-listing__filter-sidebar-group-wrap">
                            <div className="wp-block-ns-listing__filter-sidebar-group-list"></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </form>
              </div>
            )}
            <div className="wp-block-ns-listing__results">
              <div className="wp-block-ns-listing__items">
                {!!posts &&
                  posts.map((post) => {
                    const date = new Date(post.date)
                    const options = { month: "long", day: "numeric", year: "numeric" }
                    const formatedDate = date.toLocaleDateString("en-US", options)
                    return (
                      <div key={post.id} className="wp-block-ns-listing__item">
                        <div className="wp-block-ns-listing__item-wrapper">
                          <div className="wp-block-ns-listing__item-image">
                            <img src={post.featured_image_url} alt="" />
                          </div>
                          <div className="wp-block-ns-listing__item-info">
                            {post.type === "post" && (
                              <span className="wp-block-ns-listing__item-info-date">Posted {formatedDate}</span>
                            )}
                            {post.type === "post" && (
                              <span className="wp-block-ns-listing__item-info-categories">
                                <span> in </span>
                                {post.category_names}
                              </span>
                            )}
                          </div>
                          <div className="wp-block-ns-listing__item-title">{post.title.raw}</div>
                          <div className="wp-block-ns-listing__item-link">
                            <a href="/" className="--arrow-link --small">
                              Read More
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
              <div>
                {!hidePagination && (
                  <nav className="page-nav">
                    <button className="page-nav__prev">Prev</button>
                    <div className="page-nav__nav-pages">
                      <button className="page-nav__page-num --current" type="button">
                        1
                      </button>
                      <button className="page-nav__page-num" type="button">
                        2
                      </button>
                      <button className="page-nav__page-num" type="button">
                        3
                      </button>
                      <button className="page-nav__page-num" type="button">
                        4
                      </button>
                    </div>
                    <button className="page-nav__next" type="button">
                      Next
                    </button>
                  </nav>
                )}
              </div>
            </div>
          </>
        </ConditionalWrapper>
      </div>
    </div>
  )
}
