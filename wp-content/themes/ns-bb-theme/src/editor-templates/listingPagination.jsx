export function listingPagination() {
  return (
    <div className="page-nav">
      <span className="page-nav__prev --is-disabled">Previous</span>
      <div className="page-nav__nav-pages">
        <span className="page-nav__page-num --current">1</span>
        <span className="page-nav__page-num">2</span>
        <span className="page-nav__page-num">3</span>
        <span className="page-nav__page-num">4</span>
        <span className="page-nav__page-num --ellipses">…</span>
        <span className="page-nav__page-num">8</span>
        <span className="page-nav__page-num">9</span>
        <span className="page-nav__page-num">10</span>
      </div>
      <span className="page-nav__next">Next</span>
    </div>
  )
}
