<div class="<?= $args['parent_class'] ?> details-image-slider swiper js-stakeGallery">
    <div class="details-image-slider__slides swiper-wrapper">
        <?php foreach( $args['slides'] as $slide ) : ?>
            <div class="details-image-slider__slide swiper-slide">
                <?= wp_get_attachment_image( is_array( $slide ) ? $slide['image_id'] : $slide, 'large' ) ?>
            </div>
        <?php endforeach; ?>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="details-image-slider__pagination">
        <div class="swiper-pagination"></div>
    </div>
</div>
