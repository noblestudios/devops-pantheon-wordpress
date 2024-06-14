<?php

namespace NobleStudios\restapi\stakeholders;

// allows random to be set as an orderby
add_action( 'rest_api_init', __NAMESPACE__ . '\extend_stake_rest_api' );

function extend_stake_rest_api(){

    add_filter( 'rest_stakeholder_collection_params', function( $params ) {
        $params['orderby']['enum'][] = 'random';
        $params['filtered'] = [
            'description' => 'Set to specify the request is for filtered listings, and term any/all rules should apply.',
            'type' => 'boolean',
            'default' => false,
            'required' => false,
        ];
        return $params;
    }, 99, 1 );

    add_filter( 'rest_stakeholder_query', function ( $args, $request ) {
        $params = $request->get_params();

        if( $params['filtered'] ) {
            if( isset( $args['tax_query'] ) ) {
                foreach( $args['tax_query'] as $key => $tax_query ) {
                    if ( in_array( $tax_query['taxonomy'], [ 'stakeholder_cat'] ) ) {
                        $args['tax_query'][$key]['operator'] = 'AND';
                    }
                }
            }
        }

        return $args;

    }, 99, 2 );
}
