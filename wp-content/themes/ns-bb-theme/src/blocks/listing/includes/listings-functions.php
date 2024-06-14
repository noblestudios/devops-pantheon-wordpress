<?php

namespace NS\blocks\listing\functions;

function listings_filters( $attributes ) {
    $tax_filters = [];

    foreach( $attributes['availablePostTypes'][$attributes['postType']]['taxonomies'] as $tax ) {

        // we only need the filter if it is enabled for the block
        if( in_array( $tax, $attributes['showFilters'] ) ) {
            $taxonomy_object = get_taxonomy($tax);

            if( $attributes['isCheckboxVariation'] ) {
                $args = array(
                    'taxonomy'   => $tax,
                    'hide_empty' => true,
                );
                if( $attributes['preSelectedTaxonomy'] === $tax && $attributes['preSelectedTerm'] ) {
                    $args['parent'] = $attributes['preSelectedTerm'];
                }

                $terms = get_terms( $args );
                $options = [];

                foreach( $terms as $term ) {
                    $options[$term->term_id] = $term->name;
                }
            }

            $tax_filters[$tax] = [
                // some taxonomies, like post category, have a different name for rest arguements. We want that if it's different for the filter name
                'filter_name' => !empty( $taxonomy_object->rest_base ) ? $taxonomy_object->rest_base : $taxonomy_object->name,
                'label_name' => $taxonomy_object->label,
                'options' => $attributes['isCheckboxVariation'] ? $options : false
            ];
        }
    }
    return $tax_filters;
}

function pre_populated_results( $attributes ) {

    $args = [
        'post_type' => $attributes['postType'],
        'posts_per_page' => $attributes['perPage'],
        'paged' => 1,
        'orderby' => $attributes['defaultSort'],
        'order' => $attributes['sortingOptions'][$attributes['defaultSort']]['order'],
    ];

    if( $attributes['preSelectedTaxonomy'] && $attributes['preSelectedTerm'] ) {
        $args['tax_query'] = [
            [
                'taxonomy' => $attributes['preSelectedTaxonomy'],
                'terms' => $attributes['preSelectedTerm']
            ]
        ];
    }
    $query = new \WP_Query($args);
    return $query;
}

function pre_populated_page_num( $attributes, $query = false ) {
    global $wp_query;
    $total_pages = $wp_query->max_num_pages;
    $found_posts = $wp_query->found_posts;
    $current_page = ( get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1 );
    $pagination_values = [];

    if( !$total_pages ) {
        $pagination_values[] = 1;
    }


    if( $total_pages <= 6 ) {
        for( $i = 1; $i <= $total_pages; $i++ ) {
            $pagination_values[] = $i;
        }
    }
    else if( ( $current_page + 5 ) < $total_pages ) {
        $pagination_values[] = $current_page;
        $pagination_values[] = ( $current_page + 1 );
        $pagination_values[] = ( $current_page + 2 );
        $pagination_values[] = "...";
        $pagination_values[] = ( $total_pages - 2 );
        $pagination_values[] = ( $total_pages - 1 );
        $pagination_values[] = ( $total_pages );
    }
    else {
        for( $i = $total_pages; $i >= ($total_pages - 5); $i-- ) {
            array_unshift( $pagination_values, $i );
        }
        array_unshift( $pagination_values, "..." );
    }

    return $pagination_values;
}

function results_count( $attributes, $query ) {
    $count_text = '';
    $max_pages = $query->max_num_pages;
    $max_results = $query->found_posts;
    $num_shown = $query->post_count;
    $per_page = $query->query['posts_per_page'];
    $current_page = $query->query['paged'];

    if( !$max_pages && !$max_results ) {
      return $count_text;
    }

    else if ( $max_pages === 1 && $max_results === 1 ) {
      return '1 Result';
    }
    else if ( $max_pages === 1 && $max_results ) {
      return $max_pages . ' Results';
    }
    else {
      $first = ( $current_page > 1 ? ( $per_page * $current_page ) - $per_page + 1 : 1 );
      $last = $first + $num_shown - 1;

      return 'Showing ' . $first . '&ndash;' . $last . ' of ' . $max_results . ' results';
    }




}
