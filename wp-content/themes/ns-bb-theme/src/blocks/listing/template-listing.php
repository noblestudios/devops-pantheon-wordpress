<?php


// Here we get our available taxonomy filters
$tax_filters = \NS\blocks\listing\functions\listings_filters($attributes);

$prepopulate = $attributes['prepopulateResults'] && !$_GET;

$prepopulated_results = $prepopulate ? \NS\blocks\listing\functions\pre_populated_results($attributes) : false;

$sort_options = $attributes['sortingOptions'];

$listing_args = [
    'postType' => $attributes['postType'],
    'limit' => $attributes['perPage'],
    'posts_per_page' => $attributes['perPage'],
    'orderBy' => $attributes['defaultSort'],
    'autoSubmit' => $attributes['autoSubmit'],
    'noResultsText' => $attributes['noResultsText'],
    'prepopulateResults' => $prepopulate,
    'sortingOptions' => $attributes['sortingOptions'],
    'taxFilterOptions' => $attributes['taxFilterOptions'],
    'preSelectedTaxonomy' => $attributes['preSelectedTaxonomy'],
    'preSelectedTerm' => $attributes['preSelectedTerm'],
];

if ($prepopulated_results) {
    $number_pages = $prepopulated_results->max_num_pages;
    $pagination_values = [];
    if ($number_pages <= 6) {
        for ($i = 1; $i <= $number_pages; $i++)
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
    const listingArgs = <?= json_encode($listing_args); ?>
</script>

<section <?= $attributes['anchor'] ? 'id="' . $attributes['anchor'] . '"' : '' ?> class="wp-block-ns-listing alignfull js-listing">
    <div class="wp-block-ns-listing__wrapper">
        <?php if( !$attributes['isCheckboxVariation'] ) : ?>
            <div class="wp-block-ns-listing__header">
                <div class="wp-block-ns-listing__title">
                    <<?= $attributes['headlineTag']; ?> class="<?= $attributes['titleStyle']; ?>"><?= $attributes['headline']; ?></<?= $attributes['headlineTag']; ?>>
                </div>
                <button type="button" type="button" class="wp-block-ns-listing__filter-toggle js-toggle-filters">Filters</button>
                <form id="js-filterForm" class="wp-block-ns-listing__filter-wrapper js-filter-wrapper">
                    <button type="button" class="wp-block-ns-listing__filter-mobile-close --filter-drawer-close js-toggle-filters">Close</button>
                    <div class="wp-block-ns-listing__filters js-filters-wrap --filter-drawer-wrap">
                        <div class="wp-block-ns-listing__filter-mobile-header">Filters</div>
                        <?php if( !empty( $attributes['availablePostTypes'][$attributes['postType']]['searchParams'] ) ) : ?>
                            <?php foreach ( $attributes['availablePostTypes'][$attributes['postType']]['searchParams'] as $search_slug => $options ) : ?>
                                <label class="wp-block-ns-listing__filter-label">
                                    <div class="wp-block-ns-listing__filter-label-text"><?= $options['label'] ?>:</div>
                                    <input type="<?= $options['type'] ?>" name="<?= $search_slug ?>" class="js-filter js-autoFilter"/>
                                </label>
                            <?php endforeach; ?>
                        <?php endif; ?>

                        <?php if (!empty($tax_filters)) : ?>
                            <?php foreach ($tax_filters as $tax_slug => $filter) :
                                $is_base_tax = $attributes['preSelectedTaxonomy'] === $tax_slug && $attributes['preSelectedTerm'];
                                ?>
                                <label class="wp-block-ns-listing__filter-label">
                                    <div class="wp-block-ns-listing__filter-label-text"><?= $filter['label_name'] ?>:</div>
                                    <div class="wp-block-ns-listing__filter-select-wrapper">
                                        <?php wp_dropdown_categories( [
                                            'hierarchical' => true,
                                            'name' => $filter['filter_name'],
                                            'class' => 'wp-block-ns-listing__filter-select js-filter js-autoFilter',
                                            'orderby' => 'name',
                                            'taxonomy' => $tax_slug,
                                            'child_of' => $is_base_tax ? $attributes['preSelectedTerm'] : 0,
                                            'show_option_all' => 'Show All',
                                        ] ) ?>
                                    </div>
                                </label>
                            <?php endforeach; ?>
                        <?php endif; ?>
                        <?php if (!$attributes['hideSort']) : ?>
                            <label class="wp-block-ns-listing__filter-label">
                                <div class="wp-block-ns-listing__filter-label-text">Sort:</div>
                                <div class="wp-block-ns-listing__filter-select-wrapper">
                                    <select class="wp-block-ns-listing__filter-select js-autoFilter" name="orderby">
                                        <?php foreach ($attributes['availablePostTypes'][$attributes['postType']]['sorts'] as $sort) : ?>
                                            <option value="<?= $sort ?>" <?= selected($attributes['defaultSort'] === $sort) ?>><?= $sort_options[$sort]['label'] ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </label>
                        <?php endif; ?>
                        <?php if (!$attributes['autoSubmit'] && (!empty($tax_filters) || !$attributes['hideSort'])) : ?>
                            <button type="button" class="wp-block-ns-listing__filter-button js-formSubmit">Apply Filters</button>
                        <?php endif; ?>

                    </div>
                </form>
            </div>
        <?php endif; ?>
        <?php if ( $attributes['isCheckboxVariation'] ) : ?>
            <div class="wp-block-ns-listing__columns">
                <?php if (!empty($attributes['showFilters'])) : ?>
                    <div class="wp-block-ns-listing__filter-column --desktop">
                        <?php if( $attributes['headline'] ) : ?>
                            <<?= $attributes['headlineTag'] ?> class="wp-block-ns-sidebar__title --hl-xl">
                                <?= $attributes['headline']; ?>
                            </<?= $attributes['headlineTag']; ?>>
                        <?php endif; ?>
                        <button type="button" type="button" class="wp-block-ns-listing__filter-toggle js-toggle-filters">Filters</button>


                        <form id="js-filterForm" class="wp-block-ns-listing__filter-sidebar-filters js-filter-wrapper">
                            <button type="button" class="wp-block-ns-listing__filter-mobile-close --filter-drawer-close js-toggle-filters">Close</button>
                            <div class="wp-block-ns-listing__filter-sidebar-filters-wrap --filter-drawer-wrap">
                                <div class="wp-block-ns-listing__filter-sidebar-filters-headline --hl-m">Filters</div>

                                <?php if(!$attributes['hideSort']) : ?>
                                    <div class="wp-block-ns-listing__filter-sidebar-group --is-open js-subMenu">
                                        <div class="wp-block-ns-listing__filter-sidebar-group-headline js-submenuToggle">
                                            Sort
                                        </div>
                                        <div class="wp-block-ns-listing__filter-sidebar-group-wrap">
                                            <ul class="wp-block-ns-listing__filter-sidebar-group-list">
                                                <?php foreach ($attributes['availablePostTypes'][$attributes['postType']]['sorts'] as $sort) : ?>
                                                    <li class="wp-block-ns-listing__filter-sidebar-group-field">
                                                        <label class="wp-block-ns-listing__filter-sidebar-inline-field">
                                                            <input type="radio" name="orderby" value="<?= $sort ?>" class="js-autoFilter" <?= checked( $sort, $attributes['defaultSort'] ) ?>/>
                                                            <?= $sort_options[$sort]['label'] ?>
                                                        </label>
                                                    </li>
                                                <?php endforeach; ?>
                                            </ul>
                                        </div>
                                    </div>
                                <?php endif; ?>
                                <?php if( !empty( $attributes['availablePostTypes'][$attributes['postType']]['searchParams'] ) ) : ?>
                                    <div class="wp-block-ns-listing__filter-sidebar-group js-subMenu --is-open">
                                        <div class="wp-block-ns-listing__filter-sidebar-group-headline js-submenuToggle">
                                            Search
                                        </div>
                                        <div class="wp-block-ns-listing__filter-sidebar-group-wrap">
                                            <div class="wp-block-ns-listing__filter-sidebar-group-list">
                                                <?php foreach( $attributes['availablePostTypes'][$attributes['postType']]['searchParams'] as $name => $options) : ?>
                                                    <div class="wp-block-ns-listing__filter-sidebar-group-search-field">
                                                        <label for="filter-<?= $name ?>"><?= $options['label'] ?></label>
                                                        <div class="wp-block-ns-listing__filter-sidebar-group-<?= $options['type'] ?>-field-style-wrap">
                                                            <input id="filter-<?= $name ?>" type="<?= $options['type'] ?>" name="<?= $name ?>" class="js-filter js-searchField"/>
                                                        </div>
                                                    </div>
                                                <?php endforeach; ?>

                                                <button type="button" class="wp-block-ns-listing__filter-sidebar-group-search-field-submit js-formSubmit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                <?php endif; ?>
                                <?php foreach ($tax_filters as $filter) : ?>
                                    <div class="wp-block-ns-listing__filter-sidebar-group <?= (!empty($_GET[$filter['filter_name']]) || $attributes['hideSort'] ? ' --is-open' : '') ?> js-subMenu">
                                        <div class="wp-block-ns-listing__filter-sidebar-group-headline js-submenuToggle">
                                            <?= $filter['label_name'] ?>
                                        </div>
                                        <div class="wp-block-ns-listing__filter-sidebar-group-wrap">
                                            <ul class="wp-block-ns-listing__filter-sidebar-group-list">
                                                <?php foreach ($filter['options'] as $k => $term) : ?>
                                                    <li class="wp-block-ns-listing__filter-sidebar-group-field">
                                                        <label class="wp-block-ns-listing__filter-sidebar-inline-field">
                                                            <input type="checkbox" name="<?= $filter['filter_name'] ?>" value="<?= $k ?>" class="js-autoFilter" />
                                                            <?= $term ?>
                                                        </label>
                                                    </li>
                                                <?php endforeach; ?>
                                            </ul>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </form>
                    </div>
                <?php endif; ?>
            <?php endif; ?>
            <div class="wp-block-ns-listing__results">
                <?php if (!$attributes['hideResultsCount']) : ?>
                    <div class="js-resultsCount">
                        <?php if ($prepopulate) : ?>
                            <?= \NS\blocks\listing\functions\results_count($attributes, $prepopulated_results) ?>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
                <ul class="wp-block-ns-listing__items js-results">
                    <?php if ($prepopulate) : ?>
                        <?php if ($prepopulated_results->have_posts()) : ?>
                            <?php while ($prepopulated_results->have_posts()) : ?>
                                <?php $prepopulated_results->the_post(); ?>
                                <?= get_template_part('template-parts/listcards/listing', get_post_type()) ?>
                            <?php endwhile; ?>
                            <?php wp_reset_postdata(); ?>
                        <?php endif; ?>
                    <?php endif; ?>
                </ul>
                <?php if (!$attributes['hidePagination']) : ?>
                    <nav class="page-nav js-pageNav">
                        <button class="page-nav__prev --next js-navPrev" data-testid="previous-page" disabled>Prev</button>
                        <div class="page-nav__nav-pages js-navPageNumbers">
                            <?php if ($prepopulate) : ?>
                                <?php for ($i = 0; $i < count($pagination_values); $i++) : ?>
                                    <?php $currentClass = "";
                                    if ($i === 0) {
                                        $currentClass = "--current";
                                    }
                                    ?>
                                    <?php if ($pagination_values[$i] != '...') : ?>
                                        <button type="button" data-page="<?= $pagination_values[$i]; ?>" class="page-nav__page-num js-navPageNum <?= $currentClass; ?>"><?= $pagination_values[$i]; ?></button>
                                    <?php else : ?>
                                        <span class="wp-block-ns-listing__pagination-dots">...</span>
                                    <?php endif; ?>
                                <?php endfor; ?>
                                <?php if ($prepopulated_results->max_num_pages > 1) : ?>
                                <?php endif; ?>
                            <?php endif; ?>
                        </div>
                        <button class="page-nav__next --prev js-navNext" data-testid="next-page">Next</button>
                    </nav>
                <?php endif; ?>
            </div>
        <?php if ($attributes['isCheckboxVariation'] ) : ?>
            </div>
        <?php endif; ?>
    </div>
</section>
