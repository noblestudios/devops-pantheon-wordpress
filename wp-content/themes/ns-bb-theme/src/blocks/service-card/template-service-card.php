<article class="wp-block-ns-service-card">
    <div class="wp-block-ns-service-card__wrapper">
        <div class="wp-block-ns-service-card__image">
            <?php if( $attributes['cardImage'] ) : ?>
                <?= wp_get_attachment_image( $attributes['cardImage'], 'medium' ) ?>
            <?php endif; ?>
        </div>
        <?php if ( $attributes['headline'] ) : ?>
            <div class="wp-block-ns-service-card__title-wrapper">
                <h3 class="wp-block-ns-service-card__title --hl-xs"><?= $attributes['headline'] ?></h3>
            </div>
        <?php endif; ?>
        <?php if ( $attributes['intro'] ) : ?>
            <div class="wp-block-ns-service-card__content">
                <?= $attributes['intro'] ?>
            </div>
        <?php endif; ?>
        <?php if ( $attributes['links'] ) : ?>
            <div class="wp-block-ns-service-card__items">
                <?php foreach ( $attributes['links'] as $link ) : ?>
                    <?php if( !empty( $link['link']['url'] ) && !empty( $link['title'] ) ) : ?>
                        <a href="<?= $link['link']['url'] ?>" class="wp-block-ns-service-card__item-link">
                            <?= $link['title'] ?>
                        </a>
                    <?php endif; ?>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</article>
