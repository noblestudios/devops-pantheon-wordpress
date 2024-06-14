import { useBlockProps } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"

export default function Edit() {
  const categories = useSelect((select) => {
    return select("core").getEntityRecords("taxonomy", "category", {
      hide_empty: 0
    })
  })

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      <div className="wp-block-ns-category-grid__swiper swiper">
        {categories === null && <div className="--spinner" />}
        <div className="wp-block-ns-category-grid__list swiper-wrapper">
          {categories !== null &&
            categories.map((cat) => {
              if (cat.slug !== "uncategorized") {
                return (
                  <div key={cat.id} className="wp-block-ns-category-grid__term swiper-slide --theme-background-image">
                    <div className="wp-block-ns-category-grid__link">
                      <img
                        src={
                          cat.featured_image_url_sizes.medium_large
                            ? cat.featured_image_url_sizes.medium_large
                            : cat.featured_image_url_sizes.full
                        }
                        alt=""
                      />
                      <div className="wp-block-ns-category-grid__term-name">{cat.name}</div>
                    </div>
                  </div>
                )
              }
              return <></>
            })}
        </div>
      </div>
    </div>
  )
}
