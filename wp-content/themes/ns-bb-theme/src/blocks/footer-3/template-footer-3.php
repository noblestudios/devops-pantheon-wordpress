<?php

$locations = get_nav_menu_locations();

if (array_key_exists('footer', $locations)) {
    $menu = wp_get_nav_menu_object($locations['footer']);
    $footer_items = \MenuBuilder::buildNav($menu->name);
}

$contact_info = get_option('ns_contact');
$phone = $contact_info['phone'];
$phone_number_plain = \NobleStudios\helpers\string\phone_link( $phone );
$address_1 = $contact_info['address_line_1'];
$address_2 = $contact_info['address_line_2'];
$social_links = get_option('ns_social_links');

?>
<section class="wp-block-ns-site-footer3 alignfull">
    <div class="wp-block-ns-site-footer3__wrapper">
        <div class="wp-block-ns-site-footer3__contact">
            <?php if( $attributes['logo'] ) : ?>
                <div class="wp-block-ns-site-footer3__contact-logo">
                    <?= wp_get_attachment_image( $attributes['logo'], 'medium' ) ?>
                </div>
            <?php endif; ?>
            <div class="wp-block-ns-site-footer3__contact-info">
                <div class="wp-block-ns-site-footer3__contact-address">
                    <?php if( $address_1 ) : ?>
                        <span class="wp-block-ns-site-footer3__contact-address-line1"><?= $address_1 ?></span>
                    <?php endif; ?>
                    <?php if( $address_2 ) : ?>
                        <span class="wp-block-ns-site-footer3__contact-address-line2"><?= $address_2 ?></span>
                    <?php endif; ?>
                </div>
                <?php if( $phone ) : ?>
                    <div class="wp-block-ns-site-footer3__contact-phone">
                        <a href="tel:<?= $phone_number_plain ?>" class="wp-block-ns-site-footer3__contact-phone-link"><?= $phone ?></a>
                    </div>
                <?php endif; ?>
            </div>
            <ul class="wp-block-ns-site-footer3__contact-social">
                <?php if( $social_links['facebook'] ) : ?>
                    <li class="wp-block-ns-site-footer3__contact-social-item">
                        <a href="<?= $social_links['facebook'] ?>" class="wp-block-ns-site-footer3__contact-social-link --facebook" target="_blank">facebook</a>
                    </li>
                <?php endif; ?>
                <?php if( $social_links['google'] ) : ?>
                    <li class="wp-block-ns-site-footer3__contact-social-item">
                        <a href="<?= $social_links['google'] ?>" class="wp-block-ns-site-footer3__contact-social-link --google" target="_blank">google</a>
                    </li>
                <?php endif; ?>
                <?php if( $social_links['youtube'] ) : ?>
                    <li class="wp-block-ns-site-footer3__contact-social-item">
                        <a href="<?= $social_links['youtube'] ?>" class="wp-block-ns-site-footer3__contact-social-link --youtube" target="_blank">youtube</a>
                    </li>
                <?php endif; ?>
                <?php if( $social_links['linkedin'] ) : ?>
                    <li class="wp-block-ns-site-footer3__contact-social-item">
                        <a href="<?= $social_links['linkedin'] ?>" class="wp-block-ns-site-footer3__contact-social-link --linkedin" target="_blank">linkedin</a>
                    </li>
                <?php endif; ?>
                <?php if( $social_links['instagram'] ) : ?>
                    <li class="wp-block-ns-site-footer3__contact-social-item">
                        <a href="<?= $social_links['instagram'] ?>" class="wp-block-ns-site-footer3__contact-social-link --instagram" target="_blank">instagram</a>
                    </li>
                <?php endif; ?>
                <?php if( $social_links['twitter'] ) : ?>
                    <li class="wp-block-ns-site-footer3__contact-social-item">
                        <a href="<?= $social_links['twitter'] ?>" class="wp-block-ns-site-footer3__contact-social-link --twitter" target="_blank">twitter</a>
                    </li>
                <?php endif; ?>
            </ul>
        </div>
        <nav class="wp-block-ns-site-footer3__nav">
            <?php if (!empty($footer_items)) : ?>
                <ul class="wp-block-ns-site-footer3__nav-items">
                    <?php foreach ($footer_items as $item) : ?>
                        <li class="wp-block-ns-site-footer3__nav-item">
                            <a class="wp-block-ns-site-footer3__nav-item-link" href="<?= $item->url ?>"><?= $item->title ?></a>
                            <?php if (!empty($item->children)) : ?>
                                <ul class="wp-block-ns-site-footer3__subnav">
                                    <?php foreach ($item->children as $child) : ?>
                                        <li class="wp-block-ns-site-footer3__subnav-item">
                                            <a class="wp-block-ns-site-footer3__subnav-link" href="<?= $child->url ?>"><?= $child->title ?></a>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php endif; ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>
        </nav>
        <div class="wp-block-ns-site-footer3__newsletter">
            <<?= $attributes['formHeadlineTag'] ?> class="wp-block-ns-site-footer3__newsletter-title">
                <?= $attributes['formHeadline'] ?>
            </<?= $attributes['formHeadlineTag'] ?>>
            <div class="wp-block-ns-site-footer3__newsletter-blurb">
                <?= $attributes['formIntro'] ?>
            </div>
            <div class="wp-block-ns-site-footer3__newsletter-form">
                <?= $content ?>
            </div>
        </div>
    </div>
    <div class="wp-block-ns-site-footer3__legal">
        <div class="wp-block-ns-site-footer3__copyright">
            &copy; <?= date("Y") ?> <?= $attributes['copyrightText'] ?><span class="wp-block-ns-site-footer3__copyright-dot">&nbsp;·&nbsp;</span>
        </div>
        <div class="wp-block-ns-site-footer3__copyright-links">
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
        <div class="wp-block-ns-site-footer3__legal-noble"><a href="https://noblestudios.com" target="_blank">Website by Noble Studios</a></div>
    </div>

    <?php get_template_part('template-parts/cookie-consent/cookie-consent') ?>
</section>
