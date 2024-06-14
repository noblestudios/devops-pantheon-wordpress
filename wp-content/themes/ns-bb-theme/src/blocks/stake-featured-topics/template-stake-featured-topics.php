<section <?= $attributes['anchor'] ? 'id="' . $attributes['anchor'] . '"' : '' ?> class="wp-block-ns-stake-featured-topics alignfull">
    <div class="wp-block-ns-stake-featured-topics__grid">
        <div class="wp-block-ns-stake-featured-topics__image-wrap">
            <?= wp_get_attachment_image( $attributes['featuredImage'], 'large' ) ?>
        </div>
        <div class="wp-block-ns-stake-featured-topics__content">
            <?= $content ?>
        </div>
    </div>
</section>
