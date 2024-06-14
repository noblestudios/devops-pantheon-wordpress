<?php

namespace NobleStudios\helpers\socialLinks;

function facebook( $article_url ) {
    return esc_attr('https://www.facebook.com/sharer/sharer.php?u=' . $article_url);
}

function twitter( $article_url ) {
    return esc_attr('https://twitter.com/intent/tweet?text=&amp;url=' . $article_url);
}

function linkedin( $article_url ) {
    return esc_attr('https://www.linkedin.com/sharing/share-offsite/?url=' . $article_url);
}
