<?php

namespace NobleStudios\filters\excerpt;

function excerpt_length( $length ) {
  return 25;
}

add_filter( 'excerpt_length', __NAMESPACE__ . '\excerpt_length' );

function excerpt_more( $length ) {
  return ' &hellip;';
}

add_filter( 'excerpt_more', __NAMESPACE__ . '\excerpt_more' );