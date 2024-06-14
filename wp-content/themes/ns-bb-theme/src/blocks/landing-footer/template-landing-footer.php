<?php

$cta_text1 = '';
$cta_text2 = '';

$post_id = get_the_ID();

$post_meta = array(
    'footerLogo' => get_post_meta($post_id, 'footerLogo', true),
    'footerCTALink' => get_post_meta($post_id, 'footerCTALink', true),
    'footerCTALink2' => get_post_meta($post_id, 'footerCTALink2', true),
    'footerCTALabel' => get_post_meta($post_id, 'footerCTALabel', true),
    'footerCTALabel2' => get_post_meta($post_id, 'footerCTALabel2', true),
);

if (!empty($post_meta['footerCTALink'])) {
    $cta_text1 = !empty($post_meta['footerCTALink']['title']) ? $post_meta['footerCTALink']['title'] : '';
    if ($post_meta['footerCTALabel']) {
        $cta_text1 = $post_meta['footerCTALabel'];
    }
}

if (!empty($post_meta['footerCTALink2'])) {
    $cta_text2 = !empty($post_meta['footerCTALink2']['title']) ? $post_meta['footerCTALink2']['title'] : '';
    if ($post_meta['footerCTALabel2']) {
        $cta_text2 = $post_meta['footerCTALabel2'];
    }
}

?>
<section class="wp-block-ns-landing-footer alignfull">
    <div class="wp-block-ns-landing-footer__wrapper">
        <?php if ($post_meta['footerLogo']) : ?>
            <div class="wp-block-ns-landing-footer__logo">
                <?= wp_get_attachment_image($post_meta['footerLogo'], 'medium') ?>
            </div>
        <?php endif; ?>
        <div class="wp-block-ns-landing-footer__ctas">
            <?php if (!empty($post_meta['footerCTALink'])) : ?>
                <a class="wp-block-ns-landing-footer__cta --cta" href="<?= $post_meta['footerCTALink']['url']; ?>"><?= $cta_text1; ?></a>
            <?php endif; ?>
            <?php if (!empty($post_meta['footerCTALink2'])) : ?>
                <a class="wp-block-ns-landing-footer__cta --cta" href="<?= $post_meta['footerCTALink2']['url']; ?>"><?= $cta_text2; ?></a>
            <?php endif; ?>
        </div>
    </div>
    <div class="wp-block-ns-landing-footer__legal">
        <div class="wp-block-ns-landing-footer__copyright">
            &copy; <?= date("Y") ?> <?= $attributes['copyrightText'] ?><span class="wp-block-ns-landing-footer__copyright-dot">&nbsp;·&nbsp;</span>
        </div>
        <div class="wp-block-ns-landing-footer__copyright-links">
            <?php if ($attributes['showPrivacy'] && !empty($attributes['privacyLink']['url'])) : ?>
               <a href="<?= $attributes['privacyLink']['url'] ?>">Privacy Policy</a>
                <?php if($attributes['showTerms'] && !empty($attributes['termsLink']['url'])) : ?>
                    <span> · </span>
                <?php endif; ?>
            <?php endif; ?>
            <?php if ($attributes['showTerms'] && !empty($attributes['termsLink']['url'])) : ?>
               <a href="<?= $attributes['termsLink']['url'] ?>">Terms of Service</a>
            <?php endif; ?>
        </div>
        <div class="wp-block-ns-landing-footer__legal-noble"><a href="https://noblestudios.com" target="_blank">Website by Noble Studios</a></div>
    </div>
    <?php get_template_part('template-parts/cookie-consent/cookie-consent'); ?>
</section>
