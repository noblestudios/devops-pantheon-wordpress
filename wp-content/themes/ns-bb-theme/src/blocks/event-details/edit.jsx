import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { PanelBody, TextControl } from "@wordpress/components"
import { TagSelect } from "../../editor-controls"
import { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { detailsHeadline, detailsHeadlineTag } = attributes

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={"Headline"} initialOpen={true}>
            <TextControl
              label="Details Headline"
              value={detailsHeadline}
              onChange={(value) => setAttributes({ detailsHeadline: value })}
            />
            <TagSelect
              label="Details Headline Tag"
              value={detailsHeadlineTag}
              onChange={(value) => setAttributes({ detailsHeadlineTag: value })}
            />
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-event-details__grid --has-slider">
        <Swiper
          className="wp-block-ns-event-details__slider details-image-slider"
          wrapperClass="details-image-slider__slides"
          modules={[Pagination, Navigation]}
          speed={800}
          grabCursor={true}
          slidesPerView="auto"
          autoplay={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
        >
          <SwiperSlide className="details-image-slider__slide">
            <img src="https://picsum.photos/800" alt="" />
          </SwiperSlide>
          <SwiperSlide className="details-image-slider__slide">
            <img src="https://picsum.photos/800" alt="" />
          </SwiperSlide>
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
          <div className="details-image-slider__pagination">
            <div className="swiper-pagination" />
          </div>
        </Swiper>
        <div className="wp-block-ns-event-details__intro">
          <div className="wp-block-ns-event-details__intro-headline --hl-xl">{detailsHeadline}</div>
          <div className="wp-block-ns-event-details__intro-categories">Category: Category name, Category name</div>
          <div className="wp-block-ns-event-details__intro-body --wizzy">
            Quisque ut nisi. In auctor lobortis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis.
            Curabitur at lacus ac velit ornare lobortis. Donec posuere vulputate arcu.
          </div>
        </div>
        <ul className="wp-block-ns-event-details__socials">
          <li className="wp-block-ns-event-details__socials-item">
            <a href="/" className="--facebook" aria-label="facebook"></a>
          </li>
          <li className="wp-block-ns-event-details__socials-item">
            <a href="/" className="--google" aria-label="google"></a>
          </li>
          <li className="wp-block-ns-event-details__socials-item">
            <a href="/" className="--youtube" aria-label="youtube"></a>
          </li>
          <li className="wp-block-ns-event-details__socials-item">
            <a href="/" className="--linkedin" aria-label="linkedin"></a>
          </li>
          <li className="wp-block-ns-event-details__socials-item">
            <a href="/" className="--instagram" aria-label="instagram"></a>
          </li>
          <li className="wp-block-ns-event-details__socials-item">
            <a href="/" className="--twitter" aria-label="twitter"></a>
          </li>
          <li className="wp-block-ns-event-details__socials-item">
            <a href="/" className="--vimeo" aria-label="vimeo"></a>
          </li>
        </ul>
        <div className="wp-block-ns-event-details__cal-links">
          <a href="/">Add to ICal</a>
          <a href="/">Add to Google Calendar</a>
        </div>
        <div className="wp-block-ns-event-details__map">
          <iframe
            title="Google maps iframe displaying the address to Somewhere Nice"
            aria-label="Venue location map"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDNsicAsP6-VuGtAb1O9riI3oc_NOb7IOU&amp;q=50+W.+Liberty+Reno+NV+NEVADA+89501+United+States+&amp;zoom=15"
            allowfullscreen=""
          ></iframe>
        </div>
      </div>
    </div>
  )
}
