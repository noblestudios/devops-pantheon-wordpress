<?php

$key = get_option( 'ns_gmap_key');
$location = get_post_meta( get_the_ID(), 'stkMapObject', true );

?>

<section <?= $attributes['anchor'] ? 'id="' . $attributes['anchor'] . '"' : '' ?> class="wp-block-ns-stake-prop-details alignfull">
    <div class="wp-block-ns-stake-prop-details__grid">
        <div class="wp-block-ns-stake-prop-details__body">
            <?= $content ?>
        </div>
        <?php if( $key && $location ) : ?>
            <div class="wp-block-ns-stake-prop-details__map">
                <iframe frameBorder="0" id="location" src="https://www.google.com/maps/embed/v1/place?key=<?= $key ?>&amp;q=<?= urlencode($location['address']) ?>" title="Google Maps" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        <?php endif; ?>
    </div>
</section>
