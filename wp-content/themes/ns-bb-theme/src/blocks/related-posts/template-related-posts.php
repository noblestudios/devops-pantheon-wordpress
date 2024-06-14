<?php

$post = get_queried_object();

// prevents a bunch of php errors during archive queries
if( !$post ) return;

$args = [
    'post_type' => $post->post_type,
    'posts_per_page' => 3,
    'orderby' => $attributes['postTypes'][$post->post_type]['orderby'],
    'order' => $attributes['postTypes'][$post->post_type]['order'],
    'post__not_in' => [$post->ID]
];

if( isset( $attributes['postTypes'][$post->post_type] ) ) {
    if( !empty($attributes['postTypes'][$post->post_type]['taxonomy'] ) ) {
        $tax = $attributes['postTypes'][$post->post_type]['taxonomy'];
        $post_terms = get_the_terms( $post->ID, $tax );
        $term_ids = wp_list_pluck( $post_terms, 'term_id' );
        $args['tax_query'] = [
            [
                'taxonomy' => $tax,
                'terms' => $term_ids,
            ]
        ];
    }
}

if( $post->post_type === 'tribe_events' ) {
    $args['meta_query'] = [
        [
            'key' => '_EventEndDate',
            'value' => date('Y-m-d H:i:s', time()),
            'compare' => '>='
        ]
    ];
}

$posts = new WP_Query($args);

if ( $posts->have_posts() ) : ?>
    <section <?= $attributes['anchor'] ? 'id="' . $attributes['anchor'] . '"' : '' ?> class="wp-block-ns-related-posts alignfull">
        <div class="wp-block-ns-related-posts__grid">
            <<?= $attributes['headlineTag'] ?> class="wp-block-ns-related-posts__headline --hl-xl">
                <?= $attributes['headline'] ?>
            </<?= $attributes['headlineTag'] ?>>
            <ul class="wp-block-ns-related-posts__list">
                <?php while( $posts->have_posts()) :
                    $posts->the_post();
                    get_template_part( 'template-parts/listcards/listing', get_post_type() );
                endwhile; ?>
            </ul>
        </div>
    </section>
<?php wp_reset_postdata();
endif;

?>
