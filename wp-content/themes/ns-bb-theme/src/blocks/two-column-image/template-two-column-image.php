<?php
$classes = ['wp-block-ns-two-column-image__wrapper'];
if ($attributes['flip']) {
    $classes[] = '--flip';
}

$classes = join(" ", $classes);
?>

<section <?= $attributes['anchor'] ? 'id="' . $attributes['anchor'] . '"' : '' ?> class="wp-block-ns-two-column-image alignwide">
    <div class="<?= $classes; ?>">
        <div class="wp-block-ns-two-column-image__image-wrapper">
            <?php if ($attributes['sideImage']) : ?>
                <?= wp_get_attachment_image($attributes['sideImage'], 'large'); ?>
            <?php endif; ?>
        </div>
        <div class="wp-block-ns-two-column-image__content">
            <?= $content ?>
        </div>
    </div>
</section>
