import { useBlockProps, InspectorControls, RichText, useInnerBlocksProps } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { PanelBody } from "@wordpress/components"
import { ImageSelect, TagSelect, Repeater, repeaterOnChange } from "../../editor-controls"
import { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { detailsHeadline, detailsHeadlineTag, amenitiesHeadline, amenitiesHeadlineTag, galleryImages } = attributes

  const postMeta = useSelect((select) => {
    return select("core/editor").getEditedPostAttribute("meta")
  })

  const selectedFeatures = useSelect((select) => {
    return select("core/editor").getEditedPostAttribute("amenities")
  })

  const featuredAmenitiesObj = useSelect(
    (select) => {
      return select("core").getEntityRecords("taxonomy", "amenities", {
        include: selectedFeatures,
      })
    },
    [selectedFeatures]
  )

  const sliderImages = useSelect(
    (select) => {
      const sliderImages = []
      galleryImages.forEach((i) => {
        if (i.image_id) {
          const imageObj = select("core").getMedia(i.image_id)
          if (imageObj !== undefined) {
            sliderImages.push(imageObj)
          }
        }
      })
      return sliderImages
    },
    [galleryImages]
  )

  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      {isSelected && (
        <InspectorControls>
          <PanelBody title={"Slider Images"} initialOpen={true}>
            <Repeater
              props={props}
              attribute="galleryImages"
              label="Image"
              pluralLabel="Images"
              newObject={{
                image_id: 0,
              }}
              fields={(index) => {
                const attribute = "galleryImages"
                return [
                  <ImageSelect
                    key="image"
                    label="Image"
                    props={props}
                    selectedImage={props.attributes.galleryImages[index].image_id}
                    onSelect={(newImage) => repeaterOnChange(attribute, "image_id", newImage.id, index, props)}
                    onRemove={() => {
                      repeaterOnChange(attribute, "image_id", 0, index, props)
                    }}
                  />,
                ]
              }}
            />
          </PanelBody>
          <PanelBody title={"HTML Markup"} initialOpen={true}>
            <TagSelect
              label="Details Headline Tag"
              value={detailsHeadlineTag}
              onChange={(value) => setAttributes({ detailsHeadlineTag: value })}
            />
            <TagSelect
              label="Amenities Headline Tag"
              value={amenitiesHeadlineTag}
              onChange={(value) => setAttributes({ amenitiesHeadlineTag: value })}
            />
          </PanelBody>
        </InspectorControls>
      )}
      <div className="wp-block-ns-stake-details-slider__grid">
        <div className="wp-block-ns-stake-details-slider__breadcrumbs">Breabcrumbs</div>
        <div className="wp-block-ns-stake-details-slider__intro">
          <RichText
            tag="div"
            className="wp-block-ns-stake-details-slider__intro-headline --hl-xl"
            value={detailsHeadline}
            placeholder={detailsHeadline ? detailsHeadline : "...Headline"}
            onChange={(value) => setAttributes({ detailsHeadline: value })}
          />
          <div
            {...useInnerBlocksProps(
              { className: "wp-block-ns-stake-details-slider__intro-body" },
              {
                allowedBlocks: ["core/paragraph", "core/list"],
                template: [
                  [
                    "core/paragraph",
                    {
                      placeholder: "Intro...",
                    },
                  ],
                ],
              }
            )}
          />
        </div>
        <ul className="wp-block-ns-stake-details-slider__socials">
          {postMeta.stkFacebook && (
            <li className="wp-block-ns-stake-details-slider__socials-item">
              <a href="/" className="--facebook" aria-label="facebook"></a>
            </li>
          )}
          {postMeta.stkGoogle && (
            <li className="wp-block-ns-stake-details-slider__socials-item">
              <a href="/" className="--google" aria-label="google"></a>
            </li>
          )}
          {postMeta.stkYoutube && (
            <li className="wp-block-ns-stake-details-slider__socials-item">
              <a href="/" className="--youtube" aria-label="youtube"></a>
            </li>
          )}
          {postMeta.stkLinkedin && (
            <li className="wp-block-ns-stake-details-slider__socials-item">
              <a href="/" className="--linkedin" aria-label="linkedin"></a>
            </li>
          )}
          {postMeta.stkInstagram && (
            <li className="wp-block-ns-stake-details-slider__socials-item">
              <a href="/" className="--instagram" aria-label="instagram"></a>
            </li>
          )}
          {postMeta.stkTwitter && (
            <li className="wp-block-ns-stake-details-slider__socials-item">
              <a href="/" className="--twitter" aria-label="twitter"></a>
            </li>
          )}
          {postMeta.stkVimeo && (
            <li className="wp-block-ns-stake-details-slider__socials-item">
              <a href="/" className="--vimeo" aria-label="vimeo"></a>
            </li>
          )}
        </ul>
        {featuredAmenitiesObj !== null && featuredAmenitiesObj !== undefined && (
          <div className="wp-block-ns-stake-details-slider__amenities">
            <RichText
              tag="div"
              className="wp-block-ns-stake-details-slider__amenities-headline --hl-l"
              value={amenitiesHeadline}
              placeholder={amenitiesHeadline ? amenitiesHeadline : "...Headline"}
              onChange={(value) => setAttributes({ amenitiesHeadline: value })}
            />
            <ul className="wp-block-ns-stake-details-slider__amenities-list">
              {featuredAmenitiesObj.map((term) => {
                return <li key={term.id}>{term.name}</li>
              })}
            </ul>
          </div>
        )}
        <Swiper
          className="wp-block-ns-stake-details-slider__slider details-image-slider"
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
          {sliderImages !== null &&
            sliderImages.map((item, index) => {
              return (
                <SwiperSlide key={index} className="details-image-slider__slide">
                  <img src={item.source_url} alt="" />
                </SwiperSlide>
              )
            })}
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
          <div className="details-image-slider__pagination">
            <div className="swiper-pagination">
              <span className="swiper-pagination-bullet"></span>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  )
}
