import { useBlockProps } from "@wordpress/block-editor"
import { logoStacked } from "../../scripts/modules/svgLogos"

export default function Edit() {
  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      <nav className="wp-block-ns-landing-nav__wrapper">
        <div className="wp-block-ns-landing-nav__logo-wrapper">
          <div className="wp-block-ns-landing-nav__logo">{logoStacked}</div>
        </div>
        <div className="wp-block-ns-landing-nav__links">
          <ul className="wp-block-ns-landing-nav__items">
            <li className="wp-block-ns-landing-nav__item">
              <button type="button" className="wp-block-ns-landing-nav__item-jump">
                Example Link
              </button>
            </li>
            <li className="wp-block-ns-landing-nav__item">
              <button type="button" className="wp-block-ns-landing-nav__item-jump">
                Example Link
              </button>
            </li>
            <li className="wp-block-ns-landing-nav__item">
              <button type="button" className="wp-block-ns-landing-nav__item-jump">
                Example Link
              </button>
            </li>
          </ul>
        </div>
        <div className="wp-block-ns-landing-nav__ctas">
          <div className="wp-block-ns-landing-nav__cta-wrapper">
            <div className="wp-block-ns-landing-nav__cta-link">CTA 1</div>
          </div>
          <div className="wp-block-ns-landing-nav__cta-wrapper">
            <div className="wp-block-ns-landing-nav__cta-link">CTA 2</div>
          </div>
        </div>
      </nav>
    </div>
  )
}
