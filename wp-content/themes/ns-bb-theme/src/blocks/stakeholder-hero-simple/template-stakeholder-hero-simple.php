<?php
$fields = [
    'stkAddress1' => get_post_meta( get_the_ID(), 'stkAddress1', true ),
    'stkAddressUnit' => get_post_meta( get_the_ID(), 'stkAddressUnit', true ),
    'stkAddress2' => get_post_meta( get_the_ID(), 'stkAddress2', true ),
    'stkPhone' => get_post_meta( get_the_ID(), 'stkPhone', true ),
];

if( !$attributes['headline'] ) $attributes['headline'] = get_the_title();

?>
<section class="wp-block-ns-stakeholder-hero-simple alignfull">
    <div class="wp-block-ns-stakeholder-hero-simple__main-grid">
        <div class="wp-block-ns-stakeholder-hero-simple__breadcrumbs">
            <a href="#">Breadcrumbs</a>
        </div>
        <<?= $attributes['headlineTag'] ?> class="wp-block-ns-stakeholder-hero-simple__headline --hl-xxl">
            <?= $attributes['headline'] ?>
        </<?= $attributes['headlineTag'] ?>>
        <div class="wp-block-ns-stakeholder-hero-simple__contact">
            <?php if( $fields['stkAddress1'] || $fields['stkAddress2'] || $fields['stkAddressUnit']) : ?>
                <div class="wp-block-ns-stakeholder-hero-simple__contact-address">
                    <?php if( $fields['stkAddress1'] ) : ?>
                        <div class="wp-block-ns-stakeholder-hero-simple__contact-address-1">
                            <?= $fields['stkAddress1'] ?>
                        </div>
                    <?php endif; ?>
                    <?php if( $fields['stkAddressUnit'] ) : ?>
                        <div class="wp-block-ns-stakeholder-hero-simple__contact-address-2">
                            <?= $fields['stkAddressUnit'] ?>
                        </div>
                    <?php endif; ?>
                    <?php if( $fields['stkAddress2'] ) : ?>
                        <div class="wp-block-ns-stakeholder-hero-simple__contact-address-3">
                            <?= $fields['stkAddress2'] ?>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
            <?php if( $fields['stkPhone'] ) : ?>
                <div class="wp-block-ns-stakeholder-hero-simple__contact-phone">
                    <?= $fields['stkPhone'] ?>
                </div>
            <?php endif; ?>
        </div>
        <div class="wp-block-ns-stakeholder-hero-simple__ctas">
            <a class="wp-block-ns-stakeholder-hero-simple__cta --cta">Primary CTA</a>
            <a class="wp-block-ns-stakeholder-hero-simple__cta --cta --secondary">Secondary CTA</a>
            <a class="wp-block-ns-stakeholder-hero-simple__cta --cta --tertiary">Tertiarty CTA</a>
        </div>
    </div>
</section>
