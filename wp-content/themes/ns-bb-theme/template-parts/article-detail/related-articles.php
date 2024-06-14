<?php
    $related_args = [
        'post_type' => get_post_type(),
        'posts_per_page' => 3,
        'orderby' => 'date',
        'order' => 'DESC',
        'post__not_in' => [ get_the_ID() ],
        'category__in' => wp_get_post_categories( get_the_ID() )
    ];

    $related = new WP_Query($related_args);

?>

<div class="sidebar-related">
    <h2 class="sidebar-related__headline --hl-l"><?= __( $args['attributes']['relatedHeadline'], 'ns' ) ?></h2>
    <div class="sidebar-related__list">
    <?php while( $related->have_posts() ) : ?>
        <?php $related->the_post(); ?>
        <article class="sidebar-related__article">
            <div class="sidebar-related__byline">
                <?= __( 'Posted', 'ns' ) ?> <?= get_the_date( $format = 'F j, Y' ) ?> in <?= get_the_term_list( get_the_ID(), 'category', '', ', ', '' ) ?>
            </div>
            <h3 class="sidebar-related__title --hl-xs"><?= the_title() ?></h3>
            <a href="sidebar-related__cta"><?= __( 'Read Article', 'ns' ) ?></a>
        </article>
        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>
    </div>
</div>
