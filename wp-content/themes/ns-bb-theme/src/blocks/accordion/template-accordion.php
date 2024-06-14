
<section <?= $attributes['anchor'] ? 'id="' . $attributes['anchor'] . '"' : '' ?> class="wp-block-ns-accordion">
    <div class="wp-block-ns-accordion__wrapper">
        <ul class="wp-block-ns-accordion__items">
            <?= $content ?>
        </ul>
    </div>
</section>
