<section <?= $attributes['anchor'] ? 'id="' . $attributes['anchor'] . '"' : '' ?> class="wp-block-ns-cta-grid alignfull">
    <div class="wp-block-ns-cta-grid__wrapper">
        <?php if (!empty($attributes['linksTop'])) : ?>
            <div class="wp-block-ns-cta-grid__top">
                <?php foreach ($attributes['linksTop'] as $top_link) : ?>
                    <?php
                    $image_id = get_post_thumbnail_id( $top_link['link']['id'] );
                    $image = wp_get_attachment_image( $image_id, 'large');
                    $title = !empty( $top_link['title'] ) ? $top_link['title'] : $top_link['link']['title'];
                    ?>
                    <a class="wp-block-ns-cta-grid__item" href="<?= $top_link['link']['url']; ?>">
                        <div class="wp-block-ns-cta-grid__item-image">
                            <?= $image; ?>
                        </div>
                        <div class="wp-block-ns-cta-grid__item-text"><?= $title; ?></div>
                    </a>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
        <?php if (!empty($attributes['linksBottom'])) : ?>
            <div class="wp-block-ns-cta-grid__bottom">
                <?php foreach ($attributes['linksBottom'] as $bottom_link) : ?>
                    <?php
                    $image_id = get_post_thumbnail_id($bottom_link['link']['id']);
                    $image = wp_get_attachment_image($image_id, 'large');
                    $title = $bottom_link['link']['title'];
                    if (!empty($bottom_link['title'])) {
                        $title = $bottom_link['title'];
                    }
                    ?>
                    <a class="wp-block-ns-cta-grid__item" href="<?= $bottom_link['link']['url']; ?>">
                        <div class="wp-block-ns-cta-grid__item-image">
                            <?= $image; ?>
                        </div>
                        <div class="wp-block-ns-cta-grid__item-text"><?= $title; ?></div>
                    </a>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
