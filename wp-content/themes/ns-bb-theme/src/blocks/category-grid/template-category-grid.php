<?php

$query_args = [
    'taxonomy' => 'category',
    'hide_empty' => 0,
];

$term_query = new WP_Term_Query($query_args);

?>

<?php

// todo: let's internalize the needed styles

?>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />

<section <?= $attributes['anchor'] ? 'id="' . $attributes['anchor'] . '"' : '' ?> class="wp-block-ns-category-grid alignfull">
    <div class="wp-block-ns-category-grid__swiper swiper js-category-grid-swiper">
        <ul class="wp-block-ns-category-grid__list swiper-wrapper">
            <?php foreach ($term_query->terms as $term) :
                $thumb_id = get_term_meta($term->term_id, 'term_thumb_id', true);
                if(!$thumb_id) $thumb_id = get_option('ns_post_default_image');
                if ($term->slug != 'uncategorized') : ?>
                    <li class="wp-block-ns-category-grid__term swiper-slide --theme-background-image">
                        <a href="<?= get_term_link($term, 'category') ?>" class="wp-block-ns-category-grid__link">
                            <?= wp_get_attachment_image($thumb_id, 'medium-large'); ?>
                            <h3 class="wp-block-ns-category-grid__term-name"><?= $term->name ?></h3>
                        </a>
                    </li>
                <?php endif; ?>
            <?php endforeach; ?>
        </ul>
        <div class="wp-block-ns-category-grid__navigation">
            <div class="swiper-button-prev" aria-label="<?= __('previous', 'ns') ?>"></div>
            <div class="swiper-button-next" aria-label="<?= __('next', 'ns') ?>"></div>
        </div>
    </div>
</section>
