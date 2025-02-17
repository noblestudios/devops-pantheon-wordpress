<?php

$locations = get_nav_menu_locations();

if (array_key_exists('footer', $locations)) {
    $menu = wp_get_nav_menu_object($locations['footer']);
    $footer_items = \MenuBuilder::buildNav($menu->name);
}

$social_links = get_option('ns_social_links');

?>
<section class="wp-block-ns-site-footer6 alignfull">
    <div class="wp-block-ns-site-footer6__wrapper">
        <div class="wp-block-ns-site-footer6__extras">
            <div class="wp-block-ns-site-footer6__cta-block">
                <div class="wp-block-ns-site-footer6__cta-block-image">
                    <?= wp_get_attachment_image( $attributes['ctaImage'], 'medium' ) ?>
                </div>
                <div class="wp-block-ns-site-footer6__cta-block-content">
                    <<?= $attributes['ctaHeadlineTag'] ?> class="wp-block-ns-site-footer6__cta-block-title">
                        <?= $attributes['ctaHeadline'] ?>
                    </<?= $attributes['ctaHeadlineTag'] ?>>
                    <div class="wp-block-ns-site-footer6__cta-block-text">
                        <?= $attributes['ctaIntro'] ?>
                    </div>
                    <?php if( $attributes['ctaButtonLabel'] && !empty( $attributes['ctaButtonLink']['url'] ) ) : ?>
                        <a class="wp-block-ns-site-footer6__cta-block-link --tertiary" href="<?= $attributes['ctaButtonLink']['url'] ?>">
                            <?= $attributes['ctaButtonLabel'] ?>
                        </a>
                    <?php endif; ?>
                </div>
            </div>
            <div class="wp-block-ns-site-footer6__newsletter">
                <<?= $attributes['formHeadlineTag'] ?> class="wp-block-ns-site-footer6__newsletter-title">
                    <?= $attributes['formHeadline'] ?>
                </<?= $attributes['formHeadlineTag'] ?>>
                <div class="wp-block-ns-site-footer6__newsletter-blurb">
                    <?= $attributes['formIntro'] ?>
                </div>
                <div class="wp-block-ns-site-footer6__newsletter-form">
                    <?= $content ?>
                </div>
            </div>
        </div>
        <nav class="wp-block-ns-site-footer6__nav">
            <ul class="wp-block-ns-site-footer6__nav-items">
                <?php if ($attributes['logo']) : ?>
                    <li class="wp-block-ns-site-footer6__logo">
                        <?= wp_get_attachment_image($attributes['logo'], 'medium') ?>
                    </li>
                <?php endif; ?>
                <?php if (!empty($footer_items)) : ?>
                    <?php foreach ($footer_items as $item) : ?>
                        <li class="wp-block-ns-site-footer6__nav-item">
                            <a class="wp-block-ns-site-footer6__nav-item-link" href="<?= $item->url ?>"><?= $item->title ?></a>
                        </li>
                    <?php endforeach; ?>
                <?php endif; ?>
                <li class="wp-block-ns-site-footer6__contact-socials">
                    <ul class="wp-block-ns-site-footer6__contact-socials-list">
                        <?php if ($social_links['facebook']) : ?>
                            <li class="wp-block-ns-site-footer6__contact-social-item">
                                <a href="<?= $social_links['facebook'] ?>" class="wp-block-ns-site-footer6__contact-social-link --facebook" target="_blank">facebook</a>
                            </li>
                        <?php endif; ?>
                        <?php if ($social_links['google']) : ?>
                            <li class="wp-block-ns-site-footer6__contact-social-item">
                                <a href="<?= $social_links['google'] ?>" class="wp-block-ns-site-footer6__contact-social-link --google" target="_blank">google</a>
                            </li>
                        <?php endif; ?>
                        <?php if ($social_links['youtube']) : ?>
                            <li class="wp-block-ns-site-footer6__contact-social-item">
                                <a href="<?= $social_links['youtube'] ?>" class="wp-block-ns-site-footer6__contact-social-link --youtube" target="_blank">youtube</a>
                            </li>
                        <?php endif; ?>
                        <?php if ($social_links['linkedin']) : ?>
                            <li class="wp-block-ns-site-footer6__contact-social-item">
                                <a href="<?= $social_links['linkedin'] ?>" class="wp-block-ns-site-footer6__contact-social-link --linkedin" target="_blank">linkedin</a>
                            </li>
                        <?php endif; ?>
                        <?php if ($social_links['instagram']) : ?>
                            <li class="wp-block-ns-site-footer6__contact-social-item">
                                <a href="<?= $social_links['instagram'] ?>" class="wp-block-ns-site-footer6__contact-social-link --instagram" target="_blank">instagram</a>
                            </li>
                        <?php endif; ?>
                        <?php if ($social_links['twitter']) : ?>
                            <li class="wp-block-ns-site-footer6__contact-social-item">
                                <a href="<?= $social_links['twitter'] ?>" class="wp-block-ns-site-footer6__contact-social-link --twitter" target="_blank">twitter</a>
                            </li>
                        <?php endif; ?>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
    <div class="wp-block-ns-site-footer6__legal">
        <div class="wp-block-ns-site-footer6__copyright">
            &copy; <?= date("Y") ?> <?= $attributes['copyrightText'] ?><span class="wp-block-ns-site-footer6__copyright-dot">&nbsp;·&nbsp;</span>
        </div>
        <div class="wp-block-ns-site-footer6__copyright-links">
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
        <div class="wp-block-ns-site-footer6__legal-noble"><a href="https://noblestudios.com" target="_blank">Website by Noble Studios</a></div>
    </div>
    <?php get_template_part('template-parts/cookie-consent/cookie-consent'); ?>
</section>
