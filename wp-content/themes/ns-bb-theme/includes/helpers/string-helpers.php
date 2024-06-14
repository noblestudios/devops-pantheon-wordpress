<?php

namespace NobleStudios\helpers\string;

function phone_link( $phone_num ) {
    return preg_replace("/[^0-9]/", "", $phone_num);
}

function id_attribute( $phone_num ) {
    return strtolower(preg_replace("/[^0-9a-zA-Z]/", "", $phone_num));
}

/**
 * Truncates text to specified length without breaking words.
 *
 * @param string $string
 * @param int $length
 * @param string $append
 * @return string
 */
function truncate_text( $string, $length = 100, $append = "&hellip;" ) {
    $string = trim( $string );
    if( strlen($string) > $length ) {
        $string = wordwrap( $string, $length );
        $string = explode( "\n", $string, 2 );
        $string = $string[0] . $append;
    }
    return $string;
}

function str_ends_with($suffix, $haystack) {
    $length = strlen( $suffix );
    if( !$length ) {
        return true;
    }
    return substr( $haystack, -$length ) === $suffix;
}



function remove_suffix($suffix, $string) {
    return str_ends_with($suffix, $string) ? substr($string, 0, strlen($string) - strlen($suffix)) : $string;
}


