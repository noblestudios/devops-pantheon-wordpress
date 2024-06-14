<?php

if (!$attributes['headline']) $attributes['headline'] = get_the_title();

$background_image_id = $attributes['backgroundImage'] ? $attributes['backgroundImage'] : get_post_thumbnail_id();

?>
<section class="wp-block-ns-form-hero alignfull">
    <div class="wp-block-ns-form-hero__main-grid">
        <div class="wp-block-ns-form-hero__image-wrap">
            <?= wp_get_attachment_image($background_image_id, 'full') ?>
        </div>
        <div class="wp-block-ns-form-hero__content">
            <div class="wp-block-ns-form-hero__content-body --theme-background-image-desktop">
                <<?= $attributes['headlineTag'] ?> class="wp-block-ns-form-hero__headline --hl-xxl">
                    <?= $attributes['headline'] ?>
                </<?= $attributes['headlineTag'] ?>>
                <?php if( $attributes['subHeadline'] ) : ?>
                    <<?= $attributes['subHeadlineTag'] ?> class="wp-block-ns-form-hero__subheadline --hl-m">
                        <?= $attributes['subHeadline'] ?>
                    </<?= $attributes['subHeadlineTag'] ?>>
                <?php endif; ?>
                <?php if( !empty( $attributes['cta1']['url'] ) || !empty( $attributes['cta1']['url'] )) : ?>
                    <div class="wp-block-ns-form-hero__ctas">
                        <?php if( !empty( $attributes['cta1']['url'] ) ) : ?>
                            <a class="wp-block-ns-form-hero__cta --cta" href="<?= $attributes['cta2']['url'] ?>"><?= $attributes['cta2']['title'] ?></a>
                        <?php endif; ?>
                        <?php if( !empty( $attributes['cta2']['url'] ) ) : ?>
                            <a class="wp-block-ns-form-hero__cta --cta --secondary" href="<?= $attributes['cta2']['url'] ?>"><?= $attributes['cta2']['title'] ?></a>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            </div>
            <div class="wp-block-ns-form-hero__form-wrap">
                <?= $content ?>
            </div>
        </div>
    </div>
</section>
