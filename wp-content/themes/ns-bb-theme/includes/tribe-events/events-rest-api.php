<?php

namespace NobleStudios\restapi\events;

// allows event_date to be set as an orderby
add_action( 'rest_api_init', __NAMESPACE__ . '\event_rest_extension' );

function event_rest_extension(){

    add_filter( 'rest_tribe_events_collection_params', function( $params ) {
        $params['orderby']['enum'][] = 'event_date';
        $params['filtered'] = [
            'description' => 'Set to specify the request is for filtered listings, and term any/all rules should apply.',
            'type' => 'boolean',
            'default' => false,
            'required' => false,
        ];
        $params['start_date'] = [
            'description' => 'Earliest event date to return.',
            'type' => 'string',
            'default' => '',
            'required' => false,
        ];

        $params['end_date'] = [
            'description' => 'Latest event date to return.',
            'type' => 'string',
            'default' => '',
            'required' => false,
        ];

        $params['future_only'] = [
            'description' => 'Show only future events.',
            'type' => 'boolean',
            'default' => false,
            'required' => false,
        ];
        return $params;
    }, 99, 1 );

    add_filter( 'rest_tribe_events_query', function ( $args, $request ) {
        $params = $request->get_params();

        error_log(print_r($params, 1));

        if ( $params['order_by'] === 'event_date' ) {
            $args['meta_key'] = '_EventStartDate';
            $args['orderby']  = 'meta_value';
            $args['order']  = 'asc';
        }

        if( $params['future_only'] || $params['start_date'] || $params['end_date'] ) {
            $new_meta = array(
                'relation' => 'AND'
            );

            if( $params['future_only'] ) {
                $new_meta[] = array(
                    'key'     => '_EventEndDate',
                    'value'   => date('Y-m-d') . ' 00:00:00',
                    'compare' => '>=',
                );
            }

            if( $params['start_date'] ) {
                $new_meta[] = array(
                    'key'     => '_EventEndDate',
                    'value'   => $params['start_date'] . ' 00:00:00',
                    'compare' => '>=',
                );
            }

            if( $params['end_date'] ) {
                $new_meta[] = array(
                    'key'     => '_EventStartDate',
                    'value'   => $params['end_date'] . ' 00:00:00',
                    'compare' => '<=',
                );
            }

            $args['meta_query'] = $new_meta;
        }

        return $args;
    }, 99, 2 );
}
