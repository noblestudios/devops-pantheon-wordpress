<?php

global $wp_query;

?>
<section class="wp-block-ns-search-listings alignfull" data-testid="search-results">
    <div class="wp-block-ns-search-listings__width">
        <div class="wp-block-ns-search-listings__head">
            <div class="wp-block-ns-search-listings__head-intro">
                <<?= $attributes['headlineTag'] ?> class="wp-block-ns-search-listings__head-headline --hl-xxl">
                    <?= __( $attributes['headline'], 'ns' ) ?>
                </<?= $attributes['headlineTag'] ?>>
                <div class="wp-block-ns-search-listings__head-count">
                    <?= __( 'We found', 'ns' ) ?> <?= $wp_query->found_posts ?> <?= __( 'result' . ( $wp_query->found_posts == 1 ? '' : 's' ) . ' for your search.' ) ?>
                </div>
            </div>
            <div class="wp-block-ns-search-listings__head-form">
                <form action="/">
                    <input type="search" name="s" value="<?= esc_attr( get_query_var( 's', 1 ) ) ?>"/>
                    <button type="submit" class="search-icon" aria-label="<?= __( 'submit search', 'ns' ) ?>"></button>
                </form>
            </div>
        </div>
        <div class="wp-block-ns-search-listings__list" data-testid="search-results-list">
            <?php if( have_posts() ) : ?>
                <?php while( have_posts() ) : ?>
                    <?php the_post(); ?>

                    <?php get_template_part( 'template-parts/listcards/search' ); ?>
                <?php endwhile; ?>

            <?php endif; ?>
        </div>
        <?php get_template_part( 'template-parts/paging/search-paging' ); ?>
    </div>
</section>
