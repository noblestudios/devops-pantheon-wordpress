export function listingResult(data) {
  return (
    <div className="paginated-result">
      <div className="paginated-result__image">
        <img
          src={
            data.featured_image_url_sizes
              ? data.featured_image_url_sizes.medium_large
              : data.featured_image_url_sizes.full
          }
          alt=""
        />
      </div>
      <div className="paginated-result__body">
        {data.type !== "stakeholder" && data.type !== "page" && <div className="paginated-result__body-type">Post</div>}
        <div className="paginated-result__body-title">{data.title.raw}</div>
        {data.type === "stakeholder" && data.excerpt.raw && (
          <div className="paginated-result__body-excerpt">{data.excerpt.raw}</div>
        )}
        <div className="paginated-result__body-cta">Read More</div>
      </div>
    </div>
  )
}
