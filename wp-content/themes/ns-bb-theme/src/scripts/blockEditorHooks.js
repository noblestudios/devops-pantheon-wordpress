import { registerPlugin } from "@wordpress/plugins"
import stakeMetaFields from "./post-meta-sidebars/stakeholder"
import landingMetaFields from "./post-meta-sidebars/landing-page"
import { OfferExpirationDate, OfferMetaData } from "./admin-modules/interfaces/Expiration"

import "./core-blocks/core-heading"
import "./core-blocks/core-paragraph"
import "./core-blocks/core-embed"
import "./core-blocks/core-quote"
import "./core-blocks/core-button"

registerPlugin("ns-sidebar-stake-meta", {
  icon: "",
  render: stakeMetaFields,
})

registerPlugin("ns-landing-meta", {
  icon: "",
  render: landingMetaFields,
})

registerPlugin("post-status-info-test", { render: OfferExpirationDate })

registerPlugin("ns-sidebar-offer-details", { render: OfferMetaData })
