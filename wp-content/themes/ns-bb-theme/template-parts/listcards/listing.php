<li class="wp-block-ns-listing__item" data-post-type="<?= get_post_type() ?>">
    <div class="wp-block-ns-listing__item-wrapper">
        <div class="wp-block-ns-listing__item-image">
            <?= get_the_post_thumbnail() ?>
        </div>
        <div class="wp-block-ns-listing__item-info">
            <?php if( get_post_type() === 'post' ) : ?>
                <span class="wp-block-ns-listing__item-info-date">Posted <?= get_the_date() ?>
                </span>
            <?php endif; ?>
            <?php if( get_post_type() !== 'page' && get_the_terms( get_the_ID(), 'catagory' ) ) : ?>
                <span class="wp-block-ns-listing__item-info-categories">
                    <span> in </span>
                    <?= strip_tags(get_the_term_list( get_the_ID(), 'category', '', ', ', '' )) ?>
                </span>
            <?php endif; ?>
        </div>
        <div class="listing__item-title"><?= get_the_title() ?></div>
        <div class="listing__item-link">
            <a href="<?= get_the_permalink() ?>" class="--arrow-link --small">Read More</a></div>
    </div>
</li>
