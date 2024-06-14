<section class="wp-block-ns-vertical-anchor alignfull">
    <div class="wp-block-ns-vertical-anchor__wrapper">
        <ul class="wp-block-ns-vertical-anchor__items">
            <?php foreach( $attributes['anchorLinks'] as $link ) : ?>
                <li class="wp-block-ns-vertical-anchor__item">
                    <a href="#<?= $link['target'] ?>" class="wp-block-ns-vertical-anchor__link">
                        <?= $link['text'] ?>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
</section>
