import { useBlockProps, InspectorControls, RichText, useInnerBlocksProps } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { PanelBody } from "@wordpress/components"
import { TagSelect } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props

  const { detailsHeadline, detailsHeadlineTag, amenitiesHeadline, amenitiesHeadlineTag } = attributes

  const selectedFeatures = useSelect((select) => {
    return select("core/editor").getEditedPostAttribute("amenities")
  })

  const featuredAmenitiesObj = useSelect(
    (select) => {
      return select("core").getEntityRecords("taxonomy", "amenities", {
        include: selectedFeatures,
      })
    },
    [selectedFeatures]
  )

  const postMeta = useSelect((select) => {
    return select("core/editor").getEditedPostAttribute("meta")
  })

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={"HTML Markup"} initialOpen={true}>
            <TagSelect
              label="Details Headline Tag"
              value={detailsHeadlineTag}
              onChange={(value) => setAttributes({ detailsHeadlineTag: value })}
            />
            <TagSelect
              label="Amenities Headline Tag"
              value={amenitiesHeadlineTag}
              onChange={(value) => setAttributes({ amenitiesHeadlineTag: value })}
            />
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-stake-details-simple__grid">
        <div className="wp-block-ns-stake-details-simple__offer --background-two">
          <div className="wp-block-ns-stake-details-simple__offer-headline">Offer 1</div>
          <div className="wp-block-ns-stake-details-simple__offer-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis augue vitae erat gravida...
          </div>
          <div className="wp-block-ns-stake-details-simple__offer-ctas">
            <a href="/" className="--micro-cta">
              Micro Button
            </a>
            <a href="/" className="--micro-text">
              View All Offers
            </a>
          </div>
        </div>
        <div className="wp-block-ns-stake-details-simple__left-col">
          <div className="wp-block-ns-stake-details-simple__intro">
            <RichText
              tag="div"
              className="wp-block-ns-stake-details-simple__intro-headline --hl-xl"
              value={detailsHeadline}
              placeholder={detailsHeadline ? detailsHeadline : "...Headline"}
              onChange={(value) => setAttributes({ detailsHeadline: value })}
            />
            <div
              {...useInnerBlocksProps(
                { className: "wp-block-ns-stake-details-simple__intro-body" },
                {
                  allowedBlocks: ["core/paragraph", "core/list"],
                  template: [
                    [
                      "core/paragraph",
                      {
                        placeholder: "Intro...",
                      },
                    ],
                  ],
                }
              )}
            />
          </div>
          <ul className="wp-block-ns-stake-details-simple__socials">
            {postMeta.stkFacebook && (
              <li className="wp-block-ns-stake-details-simple__socials-item">
                <a href="/" className="--facebook" aria-label="facebook"></a>
              </li>
            )}
            {postMeta.stkGoogle && (
              <li className="wp-block-ns-stake-details-simple__socials-item">
                <a href="/" className="--google" aria-label="google"></a>
              </li>
            )}
            {postMeta.stkYoutube && (
              <li className="wp-block-ns-stake-details-simple__socials-item">
                <a href="/" className="--youtube" aria-label="youtube"></a>
              </li>
            )}
            {postMeta.stkLinkedin && (
              <li className="wp-block-ns-stake-details-simple__socials-item">
                <a href="/" className="--linkedin" aria-label="linkedin"></a>
              </li>
            )}
            {postMeta.stkInstagram && (
              <li className="wp-block-ns-stake-details-simple__socials-item">
                <a href="/" className="--instagram" aria-label="instagram"></a>
              </li>
            )}
            {postMeta.stkTwitter && (
              <li className="wp-block-ns-stake-details-simple__socials-item">
                <a href="/" className="--twitter" aria-label="twitter"></a>
              </li>
            )}
            {postMeta.stkVimeo && (
              <li className="wp-block-ns-stake-details-simple__socials-item">
                <a href="/" className="--vimeo" aria-label="vimeo"></a>
              </li>
            )}
          </ul>
          {featuredAmenitiesObj !== null && featuredAmenitiesObj !== undefined && (
            <div className="wp-block-ns-stake-details-simple__amenities">
              <RichText
                tag="div"
                className="wp-block-ns-stake-details-simple__amenities-headline --hl-l"
                value={amenitiesHeadline}
                placeholder={amenitiesHeadline ? amenitiesHeadline : "...Headline"}
                onChange={(value) => setAttributes({ amenitiesHeadline: value })}
              />
              <ul className="wp-block-ns-stake-details-simple__amenities-list">
                {featuredAmenitiesObj.map((term) => {
                  return <li key={term.id}>{term.name}</li>
                })}
              </ul>
            </div>
          )}
        </div>
        <div className="wp-block-ns-stake-details-simple__anchor-bar">
          <ul className="wp-block-ns-stake-details-simple__anchor-bar-links">
            <li className="wp-block-ns-stake-details-simple__anchor-bar-link">
              <a href="/">Anchor Links</a>
            </li>
            <li className="wp-block-ns-stake-details-simple__anchor-bar-link">
              <a href="/">Anchor Links</a>
            </li>
            <li className="wp-block-ns-stake-details-simple__anchor-bar-link">
              <a href="/">Anchor Links</a>
            </li>
            <li className="wp-block-ns-stake-details-simple__anchor-bar-link">
              <a href="/">Anchor Links</a>
            </li>
            <li className="wp-block-ns-stake-details-simple__anchor-bar-link">
              <a href="/">Anchor Links</a>
            </li>
            <li className="wp-block-ns-stake-details-simple__anchor-bar-link">
              <a href="/">Anchor Links</a>
            </li>
            <li className="wp-block-ns-stake-details-simple__anchor-bar-link">
              <a href="/">Anchor Links</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
