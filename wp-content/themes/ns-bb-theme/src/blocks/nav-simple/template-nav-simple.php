<?php

$locations = get_nav_menu_locations();
$main_menu = wp_get_nav_menu_object( $locations['primary-nav'] );
$main_menu_items = \MenuBuilder::buildNav( $main_menu->name );

$contact_info = get_option('ns_contact');
$phone_number = $contact_info['phone'];
$phone_number_plain = \NobleStudios\helpers\string\phone_link( $phone_number );

?>
<?= get_template_part( 'template-parts/nav-header/alert-banner' ) ?>
<section class="wp-block-ns-nav-simple alignfull">
    <div class="wp-block-ns-nav-simple__width js-sticky-nav-wrap">
        <nav id="js-mainNav" class="wp-block-ns-nav-simple__header">
            <?php if ( $attributes['desktopImage'] ) : ?>
                <?= get_template_part( 'template-parts/nav-header/logo', '', [
                    'mobile' => $attributes['mobileImage'],
                    'desktop' => $attributes['desktopImage'],
                    'class_prefix' => 'wp-block-ns-nav-simple',
                ] ) ?>
            <?php endif; ?>
            <div id="js-mobileMenu" class="wp-block-ns-nav-simple__menu --background-two-mobile">
                <?= get_template_part( 'template-parts/nav-header/primary-menu', '', [
                    'block' => $block,
                    'menu_items' => $main_menu_items,
                    'alignment' => !$attributes['navDeskAlign'] ? 'right' : $attributes['navDeskAlign'],
                    'phone' => $phone_number,
                    'show_phone_desktop' => true,
                    'even-spacing-cta-search' => false,
                    'class_prefix' => 'wp-block-ns-nav-simple',
                ] ) ?>
            </div>
            <button class="wp-block-ns-nav-simple__search-btn js-tgglSrch" type="button" aria-label="open search" data-testid="button-open-search"></button>
            <?php if ( $attributes['navCTALink'] ) : ?>
                <a href="<?= $attributes['navCTALink']['url'] ?>" class="wp-block-ns-nav-simple__mobile-cta --micro-cta  <?= ( $attributes['navMobileCTA'] ? '--show-mobile' : '') ?>"><?= $attributes['navCTALabel'] ?></a>
            <?php endif; ?>
            <?php if ( $phone_number && $attributes['navMobilePhone'] ) : ?>
                <a href="tel:<?= $phone_number_plain ?>" class="wp-block-ns-nav-simple__mobile-phone" aria-label="call us"></a>
            <?php endif ?>
            <?= get_template_part( 'template-parts/nav-header/hamburger', '', [
                'class_prefix' => 'wp-block-ns-nav-simple',
            ] ) ?>
        </nav>
    </div>
</section>
<?= get_template_part('template-parts/nav-header/search-modal', '', $attributes) ?>
