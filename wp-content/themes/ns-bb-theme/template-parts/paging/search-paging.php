<?php

global $wp_query;
$current_page = (get_query_var( 'paged', 1 ));
if(!$current_page) $current_page = 1;
$search = urlencode(get_query_var( 's', 1 ));
$number_pages = $wp_query->max_num_pages;

$pagination_values = [];
if($number_pages <= 6) {
    for($i = 1; $i <= $number_pages; $i++) {
        $pagination_values[] = $i;
    }
} else if($current_page + 5 < $number_pages) {
    $pagination_values[] = $current_page;
    $pagination_values[] = ($current_page + 1);
    $pagination_values[] = ($current_page + 2);
    $pagination_values[] = '...';
    $pagination_values[] = ($number_pages - 2);
    $pagination_values[] = ($number_pages - 1);
    $pagination_values[] = $number_pages;
}
else {
    for($i = $number_pages; $i >= $number_pages - 5; $i--) {
        array_unshift($pagination_values, $i);
    }
    array_unshift($pagination_values, '...');
}

?>

<div class="page-nav">
	<h2 class="screen-reader-text">Posts navigation</h2>
    <?php if( $current_page == 1 ) : ?>
        <span class="page-nav__prev --is-disabled"><span class="mobile-hide"><?= __( 'Previous', 'ns' ) ?></span></span>
    <?php else : ?>
        <a class="page-nav__prev" href="/page/<?= ( $current_page - 1 ) ?>/?s=<?= $search ?>" data-testid="previous-page"><span class="mobile-hide"><?= __( 'Previous', 'ns' ) ?></span></a>
    <?php endif; ?>

    <div class="page-nav__nav-pages">
    <?php foreach( $pagination_values as $p ) :
        if( $p == '...' ) : ?>
            <span class="page-nav__page-num --ellipses">…</span>
        <?php elseif( $p == $current_page ) : ?>
            <span aria-current="page" class="page-nav__page-num --current"><?= $current_page ?></span>
        <?php else : ?>
            <a class="page-nav__page-num" href="/page/<?= $p ?>/?s=<?= $search ?>"><?= $p ?></a>
        <?php endif; ?>
    <?php endforeach; ?>
    </div>


    <?php if( $current_page < $number_pages ) : ?>
        <a class="page-nav__next" href="/page/<?= ($current_page + 1) ?>/?s=<?= $search ?>" data-testid="next-page"><span class="mobile-hide"><?= __( 'Next', 'ns' ) ?></span></a>
    <?php else : ?>
        <span class="page-nav__next --is-disabled"><span class="mobile-hide"><?= __( 'Next', 'ns' ) ?></span></span>
    <?php endif; ?>
</div>
