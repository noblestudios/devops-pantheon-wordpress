import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { PanelBody, ToggleControl } from "@wordpress/components"
import { TagSelect } from "../../editor-controls"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { showImage, headlineTag } = attributes

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={"Hero Settings"} initialOpen={true}>
            <ToggleControl
              label="Show Featured Image?"
              checked={showImage}
              onChange={(value) => setAttributes({ showImage: value })}
            />
            <TagSelect
              label="Headline Tag"
              value={headlineTag}
              onChange={(value) => setAttributes({ headlineTag: value })}
            />
          </PanelBody>
        </InspectorControls>
      )}
      {showImage && (
        <div className="wp-block-ns-event-hero__image-wrap">
          <img
            src="https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g"
            alt=""
          />
        </div>
      )}
      <div className="wp-block-ns-event-hero__main-grid">
        <div className="wp-block-ns-event-hero__breadcrumbs">
          <a href="/">Breadcrumbs</a>
        </div>
        <div className="wp-block-ns-event-hero__headline --hl-xxl">Event Title</div>
        <div className="wp-block-ns-event-hero__details">
          <div className="wp-block-ns-event-hero__details-col-1">
            <div className="wp-block-ns-event-hero__details-date-time">
              <div className="wp-block-ns-event-hero__details-date">Event Date</div>
              <div className="wp-block-ns-event-hero__details-time">Event Time</div>
            </div>
            <div className="wp-block-ns-event-hero__details-cost">Event Price</div>
          </div>
          <div className="wp-block-ns-event-hero__details-col-2">
            <div className="wp-block-ns-event-hero__details-location">
              <div className="wp-block-ns-event-hero__details-location-name">Venue Name</div>
              <div className="wp-block-ns-event-hero__details-location-address-1">1234 Main St.</div>
              <div className="wp-block-ns-event-hero__details-location-address-2">City, ST 12345</div>
            </div>
          </div>
          <div className="wp-block-ns-event-hero__details-col-3">
            <div className="wp-block-ns-event-hero__details-phone">(888) 888-8888</div>
            <div className="wp-block-ns-event-hero__details-email">someone@somewhere.com</div>
          </div>
        </div>
        <div className="wp-block-ns-event-hero__ctas">
          <a href="/" className="wp-block-ns-event-hero__cta --cta">
            Primary CTA
          </a>
          <a href="/" className="wp-block-ns-event-hero__cta --cta --secondary">
            Secondary CTA
          </a>
          <a href="/" className="wp-block-ns-event-hero__cta --cta --tertiary">
            Tertiarty CTA
          </a>
        </div>
      </div>
    </div>
  )
}
