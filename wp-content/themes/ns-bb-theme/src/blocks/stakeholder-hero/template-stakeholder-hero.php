<?php
$fields = [
    'stkAddress1' => get_post_meta(get_the_ID(), 'stkAddress1', true),
    'stkAddressUnit' => get_post_meta(get_the_ID(), 'stkAddressUnit', true),
    'stkAddress2' => get_post_meta(get_the_ID(), 'stkAddress2', true),
    'stkPhone' => get_post_meta(get_the_ID(), 'stkPhone', true),
];

if (!$attributes['headline']) $attributes['headline'] = get_the_title();

$background_image_id = $attributes['backgroundImage'] ? $attributes['backgroundImage'] : get_post_thumbnail_id();

$offer_id = $attributes['offer'];
$offer = [];
if (!empty($offer_id)) {

    $offer_exp = get_post_meta($offer_id, 'offerExpiration');
    $now = date("Y-m-d H:i:s");
    if ($offer_exp > $now) {
        $offer = get_post($offer_id);
    }
}
?>
<section class="wp-block-ns-stakeholder-hero alignfull">
    <div class="wp-block-ns-stakeholder-hero__main-grid">
        <div class="wp-block-ns-stakeholder-hero__image-wrap">
            <?= wp_get_attachment_image($background_image_id, 'full') ?>
        </div>
        <div class="wp-block-ns-stakeholder-hero__anchor-bar">
            <?php if( $attributes['anchorLinks'] ) : ?>
                <ul class="wp-block-ns-stakeholder-hero__anchor-bar-links">
                    <?php foreach( $attributes['anchorLinks'] as $link ) : ?>
                        <li class="wp-block-ns-stakeholder-hero__anchor-bar-link"><a href="#<?= $link['target'] ?>"><?= $link['text'] ?></a></li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>
        </div>
        <div class="wp-block-ns-stakeholder-hero__breadcrumbs">
            <a href="#">Breadcrumbs</a>
        </div>
        <div class="wp-block-ns-stakeholder-hero__content">
            <div class="wp-block-ns-stakeholder-hero__content-body --theme-background-image-desktop">
                <<?= $attributes['headlineTag'] ?> class="wp-block-ns-stakeholder-hero__headline --hl-xxl">
                    <?= $attributes['headline'] ?>
                </<?= $attributes['headlineTag'] ?>>
                <div class="wp-block-ns-stakeholder-hero__contact">
                    <?php if ($fields['stkAddress1'] || $fields['stkAddress2'] || $fields['stkAddressUnit']) : ?>
                        <div class="wp-block-ns-stakeholder-hero__contact-address">
                            <?php if ($fields['stkAddress1']) : ?>
                                <div class="wp-block-ns-stakeholder-hero__contact-address-1">
                                    <?= $fields['stkAddress1'] ?>
                                </div>
                            <?php endif; ?>
                            <?php if ($fields['stkAddressUnit']) : ?>
                                <div class="wp-block-ns-stakeholder-hero__contact-address-2">
                                    <?= $fields['stkAddressUnit'] ?>
                                </div>
                            <?php endif; ?>
                            <?php if ($fields['stkAddress2']) : ?>
                                <div class="wp-block-ns-stakeholder-hero__contact-address-3">
                                    <?= $fields['stkAddress2'] ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                    <?php if ($fields['stkPhone']) : ?>
                        <div class="wp-block-ns-stakeholder-hero__contact-phone">
                            <?= $fields['stkPhone'] ?>
                        </div>
                    <?php endif; ?>
                </div>
                <div class="wp-block-ns-stakeholder-hero__ctas">
                    <a class="wp-block-ns-stakeholder-hero__cta --cta">Primary CTA</a>
                    <a class="wp-block-ns-stakeholder-hero__cta --cta --secondary">Secondary CTA</a>
                    <a class="wp-block-ns-stakeholder-hero__cta --cta --tertiary">Tertiarty CTA</a>
                </div>
            </div>
            <?php if (!empty($offer)) : ?>
                <div class="wp-block-ns-stakeholder-hero__offer --background-two-mobile">
                    <div class="wp-block-ns-stakeholder-hero__offer-headline"><?= get_the_title($offer_id); ?></div>
                    <div class="wp-block-ns-stakeholder-hero__offer-body"><?= get_the_excerpt($offer_id) ?></div>
                    <div class="wp-block-ns-stakeholder-hero__offer-ctas">
                        <a class="--micro-cta" href="<?= get_the_permalink($offer_id) ?>">View Offer</a>
                        <a class="--micro-text">View All Offers</a>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>
