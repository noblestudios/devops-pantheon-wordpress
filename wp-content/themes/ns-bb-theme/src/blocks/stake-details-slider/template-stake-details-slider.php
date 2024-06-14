<?php

$fields['socials'] = [];
if( $url = get_post_meta( get_the_ID(), 'stkFacebook', true ) ) $fields['socials']['facebook'] = $url;
if( $url = get_post_meta( get_the_ID(), 'stkGoogle', true ) ) $fields['socials']['google'] = $url;
if( $url = get_post_meta( get_the_ID(), 'stkYoutube', true ) ) $fields['socials']['youtube'] = $url;
if( $url = get_post_meta( get_the_ID(), 'stkLinkedin', true ) ) $fields['socials']['linkedin'] = $url;
if( $url = get_post_meta( get_the_ID(), 'stkInstagram', true ) ) $fields['socials']['instagram'] = $url;
if( $url = get_post_meta( get_the_ID(), 'stkTwitter', true ) ) $fields['socials']['twitter'] = $url;

// just in case a site wants Pinterest
//if( $url = get_post_meta( get_the_ID(), 'stkPinterest', true ) ) $fields['socials']['pinterest'] = $url;
if( $url = get_post_meta( get_the_ID(), 'stkVimeo', true ) ) $fields['socials']['vimeo'] = $url;

$amenities = get_the_terms( get_the_ID(), 'amenities' );

?>

<section <?= $attributes['anchor'] ? 'id="' . $attributes['anchor'] . '"' : '' ?> class="wp-block-ns-stake-details-slider alignfull">
    <div class="wp-block-ns-stake-details-slider__grid">
        <div class="wp-block-ns-stake-details-slider__breadcrumbs">
            Breabcrumbs
        </div>
        <div class="wp-block-ns-stake-details-slider__intro">
            <<?= $attributes['detailsHeadlineTag'] ?> class="wp-block-ns-stake-details-slider__intro-headline --hl-xl">
                <?= __( $attributes['detailsHeadline'], 'ns') ?>
            </<?= $attributes['detailsHeadlineTag'] ?>>
            <div class="wp-block-ns-stake-details-slider__intro-body --wizzy">
                <?= $content ?>
            </div>
        </div>
        <?php if( $fields['socials'] ) : ?>
            <ul class="wp-block-ns-stake-details-slider__socials">
                <?php foreach( $fields['socials'] as $key => $url ) : ?>
                    <li class="wp-block-ns-stake-details-slider__socials-item"><a href="<?= $url ?>" class="--<?= $key ?>" aria-label="<?= __($key, 'ns') ?>"></a></li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
        <?php if( $amenities ) : ?>
            <div class="wp-block-ns-stake-details-slider__amenities">
                <<?= $attributes['amenitiesHeadlineTag'] ?> class="wp-block-ns-stake-details-slider__amenities-headline --hl-l">
                    <?= __( $attributes['amenitiesHeadline'], 'ns') ?>
                </<?= $attributes['amenitiesHeadlineTag'] ?>>
                <ul class="wp-block-ns-stake-details-slider__amenities-list">
                    <?php foreach( $amenities as $term ) : ?>
                        <li>
                            <?= $term->name ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>
        <?= get_template_part( 'template-parts/details-modules/image-gallery-slider', '', [
            'parent_class' => 'wp-block-ns-stake-details-slider__slider',
            'slides' => $attributes['galleryImages']
        ] ) ?>
    </div>
</section>
