<?php

$author_id = get_the_author_meta( 'ID');
$author_name = get_the_author_meta( 'display_name' );

?>

<section class="wp-block-ns-article-detail-1 alignwide">
    <div class="wp-block-ns-article-detail-1__hero">
        <h1 class="wp-block-ns-article-detail-1__title --hl-xxl"><?= the_title() ?></h1>
        <div class="wp-block-ns-article-detail-1__byline">
            <?= __( 'Posted', 'ns' ) ?> <?= get_the_date( $format = 'F j, Y' ) ?> in <?= get_the_term_list( get_the_ID(), 'category', '', ', ', '' ) ?> <?= __( 'by', 'ns' ) ?> <a href="<?= get_author_posts_url( $author_id ) ?>"><?= $author_name ?></a>
        </div>
        <div class="wp-block-ns-article-detail-1__featured-image">
            <?= wp_get_attachment_image( get_post_thumbnail_id(), 'full' ) ?>
        </div>
    </div>
    <div class="wp-block-ns-article-detail-1__columns">
        <div class="wp-block-ns-article-detail-1__content">
            <?= the_content() ?>

        </div>
        <div class="wp-block-ns-article-detail-1__sidebar">
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
