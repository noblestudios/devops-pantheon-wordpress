<section class="wp-block-ns-starter-block alignfull">
    <div class="wp-block-ns-starter-block__grid">
        <div class="wp-block-ns-starter-block__left-col">
            <<?= $attributes['eyebrowTag'] ?> class="--eyebrow">
                <?= $attributes['eyebrow'] ?>
            </<?= $attributes['eyebrowTag'] ?>>
            <<?= $attributes['headlineTag'] ?> class="--hl-xxl">
                <?= $attributes['headline'] ?>
            </<?= $attributes['headlineTag'] ?>>
            <?= $content ?>

            <?php if( !empty( $attributes['cta']['url'] ) ) : ?>
                <a class="--cta" href="<?= $attributes['cta']['url'] ?>"><?= $attributes['cta']['title'] ?></a>
            <?php endif; ?>

        </div>
        <div class="wp-block-ns-starter-block__right-col">
            <div className="wp-block-ns-starter-block__image">
                <?= wp_get_attachment_image( $attributes['image'], 'large' ) ?>
            </div>

        </div>

    </div>


</section>
