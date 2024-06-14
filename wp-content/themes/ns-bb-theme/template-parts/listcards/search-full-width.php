<?php

// this is using a shared stylesheet, we might have to split, time will tell

$post_type_obj = get_post_type_object(get_post_type());

?>



<div class="paginated-result-wide" data-post-type="<?= get_post_type() ?>">
    <div class="paginated-result-wide__image">
    <?php
    //Adding logic to check for thumbnail before rendering it. When applying filters, an empty broken image appears on posts without an image
    if(get_the_post_thumbnail() !== null) : ?>
        <?= get_the_post_thumbnail() ?>
    <?php endif; ?>
    </div>
    <div class="paginated-result-wide__body">
        <div class="paginated-result-wide__body-type --eyebrow">
            <?= __($post_type_obj->labels->singular_name, 'ns') ?>
        </div>
        <div class="paginated-result-wide__body-title --hl-xs">
            <?= get_the_title() ?>
        </div>
        <?php if( get_post_type() === 'post' ) : ?>
            <div class="paginated-result-wide__body-byline">
                Posted on <date><?= get_the_date() ?><date> by <?= get_the_author_meta( 'display_name' ) ?>
            </div>
        <?php endif; ?>
        <div class="paginated-result-wide__body-excerpt">
            <?= get_the_excerpt() ?>
        </div>
        <a class="paginated-result-wide__body-cta" href="<?= get_the_permalink() ?>"><?= __('View Page', 'ns') ?></a>
    </div>
</div>
