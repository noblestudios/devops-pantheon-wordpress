<div class="sidebar-categories">
    <h2 class="sidebar-categories__headline --hl-l"><?= __( $args['attributes']['categoriesHeadline'], 'ns' ) ?></h2>
    <?= wp_list_categories( [
        'echo' => 0,
        'separator' => ' , ',
        'style' => '',
    ] ) ?>
    <a href="<?= esc_url( get_permalink( get_option( 'page_for_posts' ) ) ) ?>"><?= __( 'All Articles', 'ns' ) ?></a>
</div>
