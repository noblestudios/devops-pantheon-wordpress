<?php

// this is using a shared stylesheet, we might have to split, time will tell

$post_type_obj = get_post_type_object(get_post_type());

?>



<div class="paginated-result">
    <div class="paginated-result__image">
        <?= get_the_post_thumbnail() ?>
    </div>
    <div class="paginated-result__body">
        <div class="paginated-result__body-type">
            <?= __($post_type_obj->labels->singular_name, 'ns') ?>
        </div>
        <div class="paginated-result__body-title">
            <?= get_the_title() ?>
        </div>
        <a class="paginated-result__body-cta" href="<?= get_the_permalink() ?>"><?= __('Read More', 'ns') ?></a>
    </div>
</div>
