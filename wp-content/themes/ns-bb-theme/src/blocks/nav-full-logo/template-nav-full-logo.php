<?php

$locations = get_nav_menu_locations();
$main_menu = wp_get_nav_menu_object( $locations['primary-nav'] );
$main_menu_items = \MenuBuilder::buildNav( $main_menu->name );

if ( isset( $locations['secondary-nav'] ) ) {
    $secondary_menu = wp_get_nav_menu_object( $locations['secondary-nav'] );
    $secondary_menu_items = $secondary_menu ? \MenuBuilder::buildNav( $secondary_menu->name ) : false;
} else {
    $secondary_menu_items = [];
}

$contact_info = get_option('ns_contact');
$phone_number = $contact_info['phone'];
$phone_number_plain = \NobleStudios\helpers\string\phone_link( $phone_number );

$cta = $attributes['navCTALink'];

?>
<?= get_template_part( 'template-parts/nav-header/alert-banner' ) ?>
<section class="wp-block-ns-nav-full-logo alignfull">
    <div class="wp-block-ns-nav-full-logo__width js-sticky-nav-wrap">

        <div class="wp-block-ns-nav-full-logo__grid">
            <?php if ( $attributes['desktopImage'] ) : ?>
                <?= get_template_part( 'template-parts/nav-header/logo', '', [
                    'mobile' => $attributes['mobileImage'],
                    'desktop' => $attributes['desktopImage'],
                    'class_prefix' => 'wp-block-ns-nav-full-logo',
                ] ) ?>
            <?php endif; ?>
            <nav id="js-secondaryNav" class="wp-block-ns-nav-full-logo__secondary-header">
                <div class="wp-block-ns-nav-full-logo__secondary-header-width">
                    <?= get_template_part( 'template-parts/nav-header/secondary-menu', '', [
                        'block' => $block,
                        'menu-items' => $secondary_menu_items,
                        'phone' => $phone_number,
                        'class_prefix' => 'wp-block-ns-nav-full-logo',
                    ] ) ?>
                    <button class="wp-block-ns-nav-full-logo__search-btn js-tgglSrch" type="button" aria-label="open search" data-testid="button-open-search"></button>
                    <?php if ( $cta ) : ?>
                        <a href="<?= $cta['url'] ?>" class="wp-block-ns-nav-full-logo__mobile-cta --micro-cta"><?= $attributes['navCTALabel'] ?></a>
                    <?php endif; ?>
                </div>
            </nav>
            <nav id="js-mainNav" class="wp-block-ns-nav-full-logo__header">

                <div id="js-mobileMenu" class="wp-block-ns-nav-full-logo__menu --background-two-mobile">
                    <?= get_template_part( 'template-parts/nav-header/primary-menu', '', [
                        'block' => $block,
                        'menu_items' => $main_menu_items,
                        'alignment' => 'right',
                        'phone' => $phone_number,
                        'show_phone_desktop' => false,
                        'even-spacing-cta-search' => false,
                        'class_prefix' => 'wp-block-ns-nav-full-logo',
                    ] ) ?>
                    <ul class="wp-block-ns-nav-full-logo__secondary-mobile-links">
                        <?php foreach ( $secondary_menu_items as $item ) : ?>
                            <li class="wp-block-ns-nav-full-logo__secondary-menu-item">
                                <a href="<?= $item->url ?>"><?= $item->title ?></a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <?php if ( $cta ) : ?>
                    <a href="<?= $cta['url'] ?>" class="wp-block-ns-nav-full-logo__mobile-cta --micro-cta <?= ( $attributes['navMobileCTA'] ? '--show-mobile' : '' ) ?> --hide-desktop"><?= $attributes['navCTALabel'] ?></a>
                <?php endif; ?>
                <?php if ( $phone_number && $attributes['navMobilePhone'] ) : ?>
                    <a href="tel:<?= $phone_number_plain ?>" class="wp-block-ns-nav-full-logo__mobile-phone" aria-label="call us"></a>
                <?php endif ?>

                <?= get_template_part( 'template-parts/nav-header/hamburger', '', [
                    'class_prefix' => 'wp-block-ns-nav-full-logo',
                ] ) ?>
            </nav>
        </div>
    </div>
</section>
<?= get_template_part('template-parts/nav-header/search-modal', '', $attributes) ?>
