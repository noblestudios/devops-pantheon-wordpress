<?php

namespace NobleStudios\filters\securityHeaders;

function add_security_headers($headers)
{
    if (!is_admin()) {
        //This is the default value, the same as if it were not set.
        $headers['Referrer-Policy'] = 'no-referrer-when-downgrade';
        $headers['X-Content-Type-Options'] = 'nosniff';

        // From MDN's CSP doc: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy#using_the_html_meta_element
        if (!is_env('local', 'docker') && getenv('HTTPS') === 'on') {
            $headers['Content-Security-Policy'] = "default-src https: 'unsafe-eval' 'unsafe-inline'; font-src 'self' data: https:; img-src 'self' data: https:;";
        }

        // The X-Frame-Options HTTP response header can be used to indicate whether a browser
        // should be allowed to render a page in a <frame>, <iframe>, <embed> or <object>.
        $headers['X-Frame-Options'] = 'SAMEORIGIN';
    }
    return $headers;
}

add_filter('wp_headers', __NAMESPACE__ . '\add_security_headers');
