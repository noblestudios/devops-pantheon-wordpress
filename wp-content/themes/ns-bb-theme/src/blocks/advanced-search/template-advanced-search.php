<?php

global $wp_query;
$prepopulate = true;

$has_filters = $_GET;
$search_string = $has_filters['s'] ?? '';
$post_types = $has_filters['type'] ?? 'any';
$post_types = explode(',', $post_types);

$all_posts_query = new WP_Query(array(
    'post_type' => $post_types,
    'posts_per_page' => -1,
    's' => $search_string,
));

// remove the search string from the filters so we can see if paging or filters are set
unset($has_filters['s']);
$prepopulate = $has_filters ? false : true;

$pagination_values = [];

if( $wp_query->posts ) {
    $number_pages = $wp_query->max_num_pages;

    if ( $number_pages <= 6 ) {
        for ( $i = 1; $i <= $number_pages; $i++ )
            $pagination_values[] = $i;
    } else {
        $pagination_values[] = 1;
        $pagination_values[] = 2;
        $pagination_values[] = 3;
        $pagination_values[] = '...';
        $pagination_values[] = $number_pages;
    }
}
?>
<script>
    const listingArgs = {limit: <?= get_option('posts_per_page') ?>, noResultsText: "No results found", prepopulate: <?= json_encode($prepopulate) ?>}
</script>
<section class="wp-block-ns-advanced-search alignfull js-search-listing" data-testid="adv-search-results">
    <div class="wp-block-ns-advanced-search__width">
        <div class="wp-block-ns-advanced-search__head">
            <div class="wp-block-ns-advanced-search__head-intro">
                <<?= $attributes['headlineTag'] ?> class="wp-block-ns-advanced-search__head-headline --hl-xxl">
                    <?= __( $attributes['headline'], 'ns' ) ?>
                </<?= $attributes['headlineTag'] ?>>
                <div class="wp-block-ns-advanced-search__head-count js-resultsCount">
                    <?= __( 'We found', 'ns' ) ?> <?= $all_posts_query->found_posts ?> <?= __( 'total result' . ( $all_posts_query->found_posts == 1 ? '' : 's' ) . ' for your search.' ) ?>
                </div>
            </div>
            <div class="wp-block-ns-advanced-search__head-form">
                <form action="/">
                    <input type="search" name="s" class="js-searchField" value="<?= esc_attr( get_query_var( 's', 1 ) ) ?>"/>
                    <button type="submit" class="search-icon" aria-label="<?= __( 'submit search', 'ns' ) ?>"></button>
                </form>
            </div>
        </div>
        <div class="wp-block-ns-advanced-search__columns">
            <div class="wp-block-ns-advanced-search__filter-col">
                <div class="wp-block-ns-advanced-search__head-filter-controls">
                    <button class="wp-block-ns-advanced-search__head-filter-mbl-toggle js-filterToggle" type="button" data-testid="mobile-open-filters"><?= __( 'Filters', 'ns' ) ?><span class="js-filterCount"></span></button>
                    <button class="wp-block-ns-advanced-search__head-filter-clear --is-hidden js-clearTrigger" data-testid="mobile-clear-filters"><?= __( 'Clear All Filters', 'ns' ) ?></button>
                </div>
                <form id="js-filterForm" class="wp-block-ns-advanced-search__filter-form js-searchFilters --filter-drawer">
                    <button class="wp-block-ns-advanced-search__mobile-filter-close js-filterToggle --filter-drawer-close" type="button" data-testid="mobile-filter-close">Close</button>
                    <div class="wp-block-ns-advanced-search__filter-col-wrap --filter-drawer-wrap">
                        <div class="wp-block-ns-advanced-search__filter-headline"><?= __( 'Filter Your Results', 'ns' ) ?></div>
                        <button class="wp-block-ns-advanced-search__desktop-filter-clear --is-hidden js-clearTrigger" data-testid="desktop-clear-filters" type="button"><?= __( 'Clear All Filters', 'ns' ) ?></button>
                        <ul class="wp-block-ns-advanced-search__filter-list" data-testid="search-filters">
                            <?php $count = new stdClass(); ?>
                            <?php foreach( $attributes['filterableTypes'] as $type => $label ) :
                                if($all_posts_query->have_posts() && $prepopulate) {
                                    $count->publish = 0;
                                    foreach($all_posts_query->posts as $post) {
                                        if($post->post_type === $type) {
                                            $count->publish++;
                                        }
                                    }
                                } else {
                                    $count = wp_count_posts( $type );
                                } ?>
                                    <li>
                                        <label>
                                            <input type="checkbox" name="type" value="<?= $type ?>" class="js-autoFilter"/><?= $label ?> (<?= $count->publish ?>)
                                        </label>
                                    </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </form>
            </div>
            <div class="wp-block-ns-advanced-search__results-col">
                <div class="wp-block-ns-advanced-search__results-list js-results" data-testid="search-results-list" data-total-results="<?= $all_posts_query->found_posts ?>">
                    <?php if( $prepopulate && have_posts() ) : ?>
                        <?php while( have_posts() ) : ?>
                            <?php the_post(); ?>

                            <?php get_template_part( 'template-parts/listcards/search-full-width' ); ?>
                        <?php endwhile; ?>

                    <?php endif; ?>
                </div>
                <?php if( $wp_query->max_num_pages > 1 ) : ?>
                    <nav class="page-nav js-pageNav" data-testid="navigation-bar">
                        <button class="page-nav__prev --next js-navPrev" data-testid="previous-page" disabled>Prev</button>
                        <div class="page-nav__nav-pages js-navPageNumbers">
                            <?php if( $prepopulate ) : ?>
                                <?php for ($i = 0; $i < count($pagination_values); $i++) : ?>
                                    <?php $currentClass = "";
                                    if ($i === 0) {
                                        $currentClass = "--current";
                                    }
                                ?>
                                    <?php if ( $pagination_values[$i] != '...' ) : ?>
                                        <button type="button" data-page="<?= $pagination_values[$i]; ?>" class="page-nav__page-num js-navPageNum <?= $currentClass; ?>"><?= $pagination_values[$i]; ?></button>
                                    <?php else : ?>
                                        <span class="wp-block-ns-listing__pagination-dots">...</span>
                                    <?php endif; ?>
                                <?php endfor; ?>
                                <?php if ( $wp_query->max_num_pages > 1 ) : ?>
                                <?php endif; ?>
                            <?php endif; ?>
                        </div>
                        <button class="page-nav__next --prev js-navNext" data-testid="next-page">Next</button>
                    </nav>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>
