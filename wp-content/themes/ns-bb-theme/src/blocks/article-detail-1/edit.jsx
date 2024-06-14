import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { showSocials, showRelated, showCategories, socialHeadline, relatedHeadline, categoriesHeadline } = attributes

  return (
    <div {...useBlockProps({ className: "alignwide" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title="Article Detail Options" initialOpen={true}>
            <ToggleControl
              label="Show Socials?"
              checked={showSocials}
              onChange={(value) => setAttributes({ showSocials: value })}
            />
            {showSocials && (
              <TextControl
                label="Socials Headline"
                value={socialHeadline}
                onChange={(value) => setAttributes({ socialHeadline: value })}
              />
            )}
            <ToggleControl
              label="Show Related Posts?"
              checked={showRelated}
              onChange={(value) => setAttributes({ showRelated: value })}
            />
            {showRelated && (
              <TextControl
                label="Related Posts Headline"
                value={relatedHeadline}
                onChange={(value) => setAttributes({ relatedHeadline: value })}
              />
            )}
            <ToggleControl
              label="Show Category List?"
              checked={showCategories}
              onChange={(value) => setAttributes({ showCategories: value })}
            />
            {showCategories && (
              <TextControl
                label="category List Headline"
                value={categoriesHeadline}
                onChange={(value) => setAttributes({ categoriesHeadline: value })}
              />
            )}
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-article-detail-1__hero">
        <div className="wp-block-ns-article-detail-1__title --hl-xxl">Ad pariatur duis dolore quis</div>
        <div className="wp-block-ns-article-detail-1__byline">
          <>
            Posted January 31, 2023 in <span className="wp-block-ns-article-detail-1__byline-link">Category</span>,{" "}
            <span className="wp-block-ns-article-detail-1__byline-link">Category</span> by{" "}
            <span className="wp-block-ns-article-detail-1__byline-link">Author Name</span>
          </>
        </div>
        <div className="wp-block-ns-article-detail-1__featured-image">
          <img src="https://pd.w.org/2023/12/27065770beb811682.73900742-1536x1152.jpg" alt="" />
        </div>
      </div>
      <div className="wp-block-ns-article-detail-1__columns">
        <div className="wp-block-ns-article-detail-1__content">
          <p>
            Suspendisse eu ligula. Suspendisse potenti. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
            sem. Curabitur suscipit suscipit tellus. Phasellus tempus.
          </p>
          <p>
            Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Duis arcu tortor, suscipit eget, imperdiet
            nec, imperdiet iaculis, ipsum. Morbi ac felis. Suspendisse non nisl sit amet velit hendrerit rutrum.
            Praesent nec nisl a purus blandit viverra.
          </p>
          <p>
            Pellentesque ut neque. Aenean viverra rhoncus pede. Sed consequat, leo eget bibendum sodales, augue velit
            cursus nunc, quis gravida magna mi a libero. Pellentesque commodo eros a enim. Phasellus magna.
          </p>
          <p>
            Ut leo. Proin magna. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Nam pretium turpis et
            arcu. Etiam iaculis nunc ac metus.
          </p>
          <p>
            Phasellus gravida semper nisi. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Duis
            vel nibh at velit scelerisque suscipit. Nunc interdum lacus sit amet orci. Nullam tincidunt adipiscing enim.
          </p>
        </div>
        <div className="wp-block-ns-article-detail-1__sidebar">
          {showSocials && (
            <div className="sidebar-post-shares">
              <div className="sidebar-post-shares__headline --hl-l">{socialHeadline}</div>
              <div className="sidebar-post-shares__links">
                <div>
                  <span
                    className="sidebar-post-shares__link --facebook"
                    target="_blank"
                    aria-label="share on Facebook"
                  ></span>
                </div>
                <div>
                  <span
                    className="sidebar-post-shares__link --linkedin"
                    target="_blank"
                    aria-label="share on LinkedIn"
                  ></span>
                </div>
                <div>
                  <span
                    className="sidebar-post-shares__link --twitter"
                    target="_blank"
                    aria-label="share on Twitter"
                  ></span>
                </div>
                <div>
                  <span className="sidebar-post-shares__link --mail" target="_blank" aria-label="Email Link"></span>
                </div>
                <div>
                  <span className="sidebar-post-shares__link --link" target="_blank" aria-label="Copy Link"></span>
                </div>
              </div>
            </div>
          )}
          {showRelated && (
            <div className="sidebar-related">
              <div className="sidebar-related__headline --hl-l">{relatedHeadline}</div>
              <div className="sidebar-related__list">
                <article className="sidebar-related__article">
                  <div className="sidebar-related__byline">
                    Posted May 16, 2023 in <span>Praesent metus</span>
                  </div>
                  <div className="sidebar-related__title --hl-xs">Post Title</div>
                  <a href="sidebar-related__cta">Read Article</a>
                </article>
                <article className="sidebar-related__article">
                  <div className="sidebar-related__byline">
                    Posted May 16, 2023 in{" "}
                    <a href="/" rel="tag">
                      Donec pede
                    </a>
                    ,{" "}
                    <a href="/" rel="tag">
                      Fusce convallis
                    </a>
                    ,{" "}
                    <a href="/" rel="tag">
                      Praesent blandit
                    </a>
                    ,{" "}
                    <a href="/" rel="tag">
                      Sed in libero ut
                    </a>
                  </div>
                  <div className="sidebar-related__title --hl-xs">Post Title</div>
                  <a href="sidebar-related__cta">Read Article</a>
                </article>
                <article className="sidebar-related__article">
                  <div className="sidebar-related__byline">
                    Posted May 16, 2023 in{" "}
                    <a href="/" rel="tag">
                      Fusce convallis
                    </a>
                  </div>
                  <div className="sidebar-related__title --hl-xs">Post Title</div>
                  <a href="sidebar-related__cta">Read Article</a>
                </article>
              </div>
            </div>
          )}
          {showCategories && (
            <div className="sidebar-categories">
              <div className="sidebar-categories__headline --hl-l">{categoriesHeadline}</div>
              <a href="/">Donec pede</a>,&nbsp;
              <a href="/">Fusce convallis</a>,&nbsp;
              <a href="/#">Phasellus</a>,&nbsp;
              <a href="/">Praesent blandit</a>,&nbsp;
              <a href="/">Praesent metus</a>,&nbsp;
              <a href="/">Sed augue</a>,&nbsp;
              <a href="/">Sed in libero ut</a>,&nbsp;
              <a href="/">Uncategorized</a>,&nbsp;
              <a href="/">Vestibulum ullamcorper</a>,&nbsp;
              <a href="/">All Articles</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
