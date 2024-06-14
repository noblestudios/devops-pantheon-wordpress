<?php

$desktop_url = $args['desktop'] ? wp_get_attachment_image_url( $args['desktop'], 'medium' ) : false;
$mobile_url = $args['mobile'] ? wp_get_attachment_image_url( $args['mobile'], 'small' ) : false;
$custom_class = isset( $args['custom_class'] ) ? ' ' . $args['custom_class'] : '';

?>

<a class="<?= $args['class_prefix'] ?>__logo <?= $custom_class ?>" href="<?= get_home_url() ?>" aria-label="home">
    <picture class="custom-logo" alt="<?= get_bloginfo( 'name', 'display' ) ?>">
        <?php if( $desktop_url && $mobile_url ) : ?>
            <source media="(min-width: 1366px)" srcset="<?= $desktop_url ?>">
            <img src="<?= $mobile_url ?>">
        <?php elseif( $desktop_url ) : ?>
            <img src="<?= $desktop_url ?>">
        <?php elseif ( $mobile_url ) : ?>
            <img src="<?= $mobile_url ?>">
        <?php endif; ?>
    </picture>
</a>
