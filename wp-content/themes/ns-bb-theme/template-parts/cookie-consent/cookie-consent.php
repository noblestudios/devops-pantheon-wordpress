<?php

$banner = get_option('ns_notice_cookies');

if( !$banner['message'] ) return;

?>

<div id="js-footerBanners" class="footer-banners">
    <div class="cookie-consent --background-two js-cookieConsent">
        <div class="cookie-consent__width">
            <div class="cookie-consent__message">
                <?= $banner['message'] ?>
            </div>
            <div class="cookie-consent__links">
                <?php if( $banner['more_info_link'] ) : ?>
                    <a class="cookie-consent__more-info" href="<?= get_the_permalink($banner['more_info_link']) ?>"><?= get_the_title($banner['more_info_link']) ?></a>
                <?php endif; ?>
                <button id="js-closeCookieConsent" type="button" class="--micro-cta" data-testid="cookie-constent-close">
                    <?= $banner['cta_text'] ?>
                </button>
            </div>
        </div>
    </div>
</div>
