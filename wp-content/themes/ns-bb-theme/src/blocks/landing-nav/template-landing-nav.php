<?php
$cta_text1 = '';
$cta_text2 = '';

$post_id = get_the_ID();

$post_meta = array(
    'navLogo' => get_post_meta($post_id, 'navLogo', true),
    'navCTALink' => get_post_meta($post_id, 'navCTALink', true),
    'navCTALink2' => get_post_meta($post_id, 'navCTALink2', true),
    'navCTALabel' => get_post_meta($post_id, 'navCTALabel', true),
    'navCTALabel2' => get_post_meta($post_id, 'navCTALabel2', true),
    'anchorLinks' => get_post_meta($post_id, 'anchorLinks', true),
);


if (!empty($post_meta['navCTALink'])) {
    $cta_text1 = !empty($post_meta['navCTALink']['title']) ? $post_meta['navCTALink']['title'] : '';
    if ($post_meta['navCTALabel']) {
        $cta_text1 = $post_meta['navCTALabel'];
    }
}

if (!empty($post_meta['navCTALink2'])) {
    $cta_text2 = !empty($post_meta['navCTALink2']['title']) ? $post_meta['navCTALink2']['title'] : '';
    if ($post_meta['navCTALabel2']) {
        $cta_text2 = $post_meta['navCTALabel2'];
    }
}

?>
<section class="wp-block-ns-landing-nav alignfull">
    <nav class="wp-block-ns-landing-nav__wrapper">
        <?php if ($post_meta['navLogo']) : ?>
            <a class="wp-block-ns-landing-nav__logo-wrapper" href="<?= get_home_url(); ?>">
                <div class="wp-block-ns-landing-nav__logo">
                    <?= wp_get_attachment_image($post_meta['navLogo'], 'medium') ?>
                </div>
            </a>
        <?php endif; ?>
        <div class="wp-block-ns-landing-nav__links">
            <ul class="wp-block-ns-landing-nav__items">
                <?php foreach( $post_meta['anchorLinks'] as $link ) : ?>
                    <li class="wp-block-ns-landing-nav__item">
                        <a href="#<?= $link['anchorId'] ?>" class="wp-block-ns-landing-nav__item-jump"><?= $link['anchorText'] ?></a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
        <div class="wp-block-ns-landing-nav__ctas">
            <?php if (!empty($post_meta['navCTALink'])) : ?>
                <div class="wp-block-ns-landing-nav__cta-wrapper">
                    <a class="wp-block-ns-landing-nav__cta-link" href="<?= $post_meta['navCTALink']['url']; ?>"><?= $cta_text1; ?></a>
                </div>
            <?php endif; ?>
            <?php if (!empty($post_meta['navCTALink2'])) : ?>
                <div class="wp-block-ns-landing-nav__cta-wrapper">
                    <a class="wp-block-ns-landing-nav__cta-link" href="<?= $post_meta['navCTALink2']['url']; ?>"><?= $cta_text2; ?></a>
                </div>
            <?php endif; ?>
        </div>
    </nav>
</section>
