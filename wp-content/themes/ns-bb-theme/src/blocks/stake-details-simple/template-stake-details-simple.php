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

<section <?= $attributes['anchor'] ? 'id="' . $attributes['anchor'] . '"' : '' ?> class="wp-block-ns-stake-details-simple alignfull">
    <div class="wp-block-ns-stake-details-simple__grid">
        <div class="wp-block-ns-stake-details-simple__offer --background-two">
            <div class="wp-block-ns-stake-details-simple__offer-headline">Offer 1</div>
            <div class="wp-block-ns-stake-details-simple__offer-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis augue vitae erat gravida...</div>
            <div class="wp-block-ns-stake-details-simple__offer-ctas">
                <a class="--micro-cta">Micro Button</a>
                <a class="--micro-text">View All Offers</a>
            </div>
        </div>
        <div class="wp-block-ns-stake-details-simple__left-col">
            <div class="wp-block-ns-stake-details-simple__intro">
                <<?= $attributes['detailsHeadlineTag'] ?> class="wp-block-ns-stake-details-simple__intro-headline --hl-xl">
                    <?= __( $attributes['detailsHeadline'], 'ns') ?>
                </<?= $attributes['detailsHeadlineTag'] ?>>
                <div class="wp-block-ns-stake-details-simple__intro-body --wizzy">
                    <?= $content ?>
                </div>
            </div>
            <?php if( $fields['socials'] ) : ?>
                <ul class="wp-block-ns-stake-details-simple__socials">
                    <?php foreach( $fields['socials'] as $key => $url ) : ?>
                        <li class="wp-block-ns-stake-details-simple__socials-item"><a href="<?= $url ?>" class="--<?= $key ?>" aria-label="<?= __($key, 'ns') ?>"></a></li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>
            <?php if( $amenities ) : ?>
                <div class="wp-block-ns-stake-details-simple__amenities">
                    <<?= $attributes['amenitiesHeadlineTag'] ?> class="wp-block-ns-stake-details-simple__amenities-headline --hl-l">
                        <?= __( $attributes['amenitiesHeadline'], 'ns') ?>
                    </<?= $attributes['amenitiesHeadlineTag'] ?>>
                    <ul class="wp-block-ns-stake-details-simple__amenities-list">
                        <?php foreach( $amenities as $term ) : ?>
                            <li>
                                <?= $term->name ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>
        </div>
        <div class="wp-block-ns-stake-details-simple__anchor-bar">
            <ul class="wp-block-ns-stake-details-simple__anchor-bar-links">
                <li class="wp-block-ns-stake-details-simple__anchor-bar-link"><a href="">Anchor Links</a></li>
                <li class="wp-block-ns-stake-details-simple__anchor-bar-link"><a href="">Anchor Links</a></li>
                <li class="wp-block-ns-stake-details-simple__anchor-bar-link"><a href="">Anchor Links</a></li>
                <li class="wp-block-ns-stake-details-simple__anchor-bar-link"><a href="">Anchor Links</a></li>
                <li class="wp-block-ns-stake-details-simple__anchor-bar-link"><a href="">Anchor Links</a></li>
                <li class="wp-block-ns-stake-details-simple__anchor-bar-link"><a href="">Anchor Links</a></li>
                <li class="wp-block-ns-stake-details-simple__anchor-bar-link"><a href="">Anchor Links</a></li>
            </ul>
        </div>
    </div>
</section>
