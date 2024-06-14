<?php

$author_id = get_the_author_meta( 'ID');
$author_name = get_the_author_meta( 'display_name' );

?>

<section class="wp-block-ns-article-detail-2 alignfull">
    <div class="wp-block-ns-article-detail-2__hero --theme-background-image-desktop">
        <div class="wp-block-ns-article-detail-2__featured-image">
            <?= wp_get_attachment_image( get_post_thumbnail_id(), 'full' ) ?>
        </div>
        <h1 class="wp-block-ns-article-detail-2__title --hl-xxl"><?= the_title() ?></h1>
    </div>
    <div class="wp-block-ns-article-detail-2__columns">
        <div class="wp-block-ns-article-detail-2__content">
            <div class="wp-block-ns-article-detail-2__byline">
                <?= __( 'Posted', 'ns' ) ?> <?= get_the_date( $format = 'F j, Y' ) ?> in <?= strip_tags( get_the_term_list( get_the_ID(), 'category', '', ', ', '' ) ) ?> <?= __( 'by', 'ns' ) ?> <?= $author_name ?>
            </div>
            <?= the_content() ?>

        </div>
        <div class="wp-block-ns-article-detail-2__sidebar">
            <?php if( $attributes['showSocials'] ) : ?>
                <?= get_template_part( 'template-parts/article-detail/post-shares', '', [ 'attributes' => $attributes ] ); ?>
            <?php endif; ?>
            <?php if( $attributes['showRelated'] ) : ?>
                <?= get_template_part( 'template-parts/article-detail/related-articles', '', [ 'attributes' => $attributes ] ); ?>
            <?php endif; ?>
            <?php if( $attributes['showCategories'] ) : ?>
                <?= get_template_part( 'template-parts/article-detail/category-list', '', [ 'attributes' => $attributes ] ); ?>
            <?php endif; ?>
        </div>
    </div>
</section>
