<section class="wp-block-ns-horizontal-anchor alignfull">
    <div class="wp-block-ns-horizontal-anchor__wrapper">
        <ul class="wp-block-ns-horizontal-anchor__items">
            <?php foreach( $attributes['anchorLinks'] as $link ) : ?>
                <li class="wp-block-ns-horizontal-anchor__item">
                    <a href="#<?= $link['target'] ?>" class="wp-block-ns-horizontal-anchor__link">
                        <?= $link['text'] ?>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
</section>
