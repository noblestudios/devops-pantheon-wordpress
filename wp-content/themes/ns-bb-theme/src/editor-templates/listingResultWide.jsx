export function listingResultWide(data) {
  return (
    <div className="paginated-result-wide">
      <div className="paginated-result-wide__image">
        <img
          src={
            data.featured_image_url_sizes
              ? data.featured_image_url_sizes.medium_large
              : data.featured_image_url_sizes.full
          }
          alt=""
        />
      </div>
      <div className="paginated-result-wide__body">
        {data.type !== "stakeholder" && <div className="paginated-result-wide__body-type --eyebrow">Page</div>}
        <div className="paginated-result-wide__body-title --hl-xs">{data.title.raw}</div>
        {data.excerpt.raw && <div className="paginated-result-wide__body-excerpt">{data.excerpt.raw}</div>}
        <div className="paginated-result-wide__body-cta">View Page</div>
      </div>
    </div>
  )
}
