import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { useState, useEffect } from "@wordpress/element"
import apiFetch from "@wordpress/api-fetch"

export default function Edit() {
  const [mapsKey, setMapsKey] = useState(null)

  useEffect(() => {
    apiFetch({ path: "/wp/v2/settings" }).then((result) => {
      setMapsKey(result.ns_gmap_key)
    })
  }, [])

  const postMeta = useSelect((select) => {
    return select("core/editor").getEditedPostAttribute("meta")
  })

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      <div className="wp-block-ns-stake-prop-details__grid">
        <div
          {...useInnerBlocksProps(
            { className: "wp-block-ns-stake-prop-details__body" },
            {
              allowedBlocks: ["core/heading", "core/paragraph", "core/list"],
              template: [
                [
                  "core/heading",
                  {
                    level: "2",
                    content: "Property Information",
                    className: "wp-block-ns-stake-prop-details__info-headline is-style-hl-xl"
                  }
                ],
                ["core/paragraph", { placeholder: "Property Info" }],
                [
                  "core/heading",
                  {
                    level: "3",
                    content: "Property Features",
                    className: "wp-block-ns-stake-prop-details__features-headline is-style-hl-l"
                  }
                ],
                ["core/list", { className: "wp-block-ns-stake-prop-details__features-list" }]
              ]
            }
          )}
        />
        <div className="wp-block-ns-stake-prop-details__map">
          {postMeta !== undefined && postMeta.stkMapObject && (
            <iframe
              id="location"
              src={`https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${postMeta.stkMapObject.address}`}
              title="Google Maps"
              allowfullscreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>
      </div>
    </div>
  )
}
