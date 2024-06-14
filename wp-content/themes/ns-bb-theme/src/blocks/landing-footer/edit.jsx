import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components"
import { LinkSelect } from "../../editor-controls"

import { logoStacked } from "../../scripts/modules/svgLogos"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { copyrightText, showPrivacy, privacyLink, showTerms, termsLink } = attributes
  const year = new Date().getFullYear()

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={"Footer Options"} initialOpen={true}>
            <TextControl
              label="Copyright Text"
              value={copyrightText}
              onChange={(value) => {
                setAttributes({ copyrightText: value })
              }}
            />
            <ToggleControl
              checked={showPrivacy}
              label={"Show Privacy Link"}
              onChange={(value) => {
                setAttributes({ showPrivacy: value })
              }}
            />
            {showPrivacy && (
              <LinkSelect
                label="Privacy Link"
                value={privacyLink}
                onChange={(value) => {
                  setAttributes({ privacyLink: value })
                }}
                onRemove={() => {
                  setAttributes({ privacyLink: {} })
                }}
              />
            )}
            <ToggleControl
              checked={showTerms}
              label={"Show Terms Link"}
              onChange={(value) => {
                setAttributes({ showTerms: value })
              }}
            />
            {showTerms && (
              <LinkSelect
                label="Terms Link"
                value={termsLink}
                onChange={(value) => {
                  setAttributes({ termsLink: value })
                }}
                onRemove={() => {
                  setAttributes({ termsLink: {} })
                }}
              />
            )}
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-landing-footer__wrapper">
        <div className="wp-block-ns-landing-footer__logo">{logoStacked}</div>
        <div className="wp-block-ns-landing-footer__ctas">
          <div className="wp-block-ns-landing-footer__cta --cta">CTA 1</div>
          <div className="wp-block-ns-landing-footer__cta --cta">CTA 2</div>
        </div>
      </div>
      <div className="wp-block-ns-landing-footer__legal">
        <div className="wp-block-ns-landing-footer__copyright">
          &copy; {year} {copyrightText}
          <span className="wp-block-ns-landing-footer__copyright-dot">&nbsp;·&nbsp;</span>
        </div>
        <div className="wp-block-ns-landing-footer__copyright-links">
          {showPrivacy && <span>Privacy Policy{showTerms && <span> · </span>}</span>}
          {showTerms && <span>Terms of Service</span>}
        </div>
        <div className="wp-block-ns-landing-footer__legal-noble">
          <span>Website by Noble Studios</span>
        </div>
      </div>
    </div>
  )
}
