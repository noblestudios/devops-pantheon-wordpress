<li class="paginated-result" data-post-type="<?= get_post_type() ?>">
    <div class="paginated-result__image">
        <?= get_the_post_thumbnail() ?>
    </div>
    <div class="paginated-result__body">
        <div class="paginated-result__body-title">
            <?= get_the_title() ?>
        </div>
        <div class="paginated-result__body-excerpt"><?= get_the_excerpt() ?></div>
        <a class="paginated-result__body-cta" href="<?= get_the_permalink() ?>"><?= __('Read More', 'ns') ?></a>
    </div>
</li>
