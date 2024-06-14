<ul id="js-menu-main" class="<?= $args['class_prefix'] ?>__menu-items --<?= $args['alignment'] ?>">
    <li class="<?= $args['class_prefix'] ?>__menu-item --phone-row <?= ($args['show_phone_desktop'] ? ' --desktop-show' : '') ?>">
        <?php if ( $args['phone'] ) : ?>
            <a href="tel:<?= \NobleStudios\helpers\string\phone_link($args['phone']) ?>" class="<?= $args['class_prefix'] ?>__menu-item-link --phone"><?= $args['phone'] ?></a>
        <?php else : ?>
            &nbsp;
        <?php endif ?>
    </li>
    <li class="<?= $args['class_prefix'] ?>__menu-item --search-row">
        <form class="<?= $args['class_prefix'] ?>__mobile-search" action="/" method="get">
            <input type="search" name="s" required placeholder="Search" data-testid="mobile-search-field" />
            <button type="submit" aria-label="submit-search" data-testid="mobile-search-submit"></button>
        </form>
    </li>
    <?php foreach ($args['menu_items'] as $item) : ?>
        <li class="<?= $args['class_prefix'] ?>__menu-item<?= $item->children ? ' js-hasSubMenu --has-children' : '' ?>">
            <a class="<?= $args['class_prefix'] ?>__menu-item-link" href="<?= $item->url ?>"><?= $item->title ?></a>
            <?php if ($item->children) : ?>
                <div class="<?= $args['class_prefix'] ?>__menu-item-toggle js-tgglSubMenu"></div>
                <div class="<?= $args['class_prefix'] ?>__menu-item-caret"></div>
            <?php endif; ?>
            <?php if ($item->children) : ?>
                <div class="<?= $args['class_prefix'] ?>__sub-menu js-navSubMenu">
                    <?php
                    $className = false;
                    foreach ($item->children as $child) {
                        if ($child->children) $className = ' --columns';
                    }
                    ?>
                    <ul class="<?= $args['class_prefix'] ?>__sub-menu-items --background-two <?= $className ?>">
                        <?php foreach ($item->children as $child) : ?>
                            <li class="<?= $args['class_prefix'] ?>__sub-menu-item <?= ($child->children ? ' --column' : '') ?>">
                                <?php if ($child->children) : ?>
                                    <ul class="<?= $args['class_prefix'] ?>__sub-menu-items">
                                        <li class="<?= $args['class_prefix'] ?>__sub-menu-item">
                                            <a class="<?= $args['class_prefix'] ?>__sub-menu-item-link" href="<?= $child->url ?>"><?= $child->title ?></a>
                                        </li>
                                        <?php foreach ($child->children as $sub_child) : ?>
                                            <li class="<?= $args['class_prefix'] ?>__sub-menu-item">
                                                <a class="<?= $args['class_prefix'] ?>__sub-menu-item-link" href="<?= $sub_child->url ?>"><?= $sub_child->title ?></a>
                                            </li>
                                        <?php endforeach; ?>
                                    </ul>
                                <?php else : ?>
                                    <a class="<?= $args['class_prefix'] ?>__sub-menu-item-link" href="<?= $child->url ?>"><?= $child->title ?></a>
                                <?php endif; ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>
        </li>
    <?php endforeach; ?>
    <?php if( $args['even-spacing-cta-search'] ) : ?>
        <li class="<?= $args['class_prefix'] ?>__menu-item --desktop-show --search-icon">
            <button class="<?= $args['class_prefix'] ?>__search-btn js-tgglSrch" type="button" aria-label="open search" data-testid="button-open-search"></button>
        </li>
        <?php if( !empty( $args['block']->attributes['navCTALink']['url'] ) && $args['show_phone_desktop'] ) : ?>
            <li class="<?= $args['class_prefix'] ?>__menu-item --desktop-show --cta-desktop-menu">
            <a href="<?= $args['block']->attributes['navCTALink']['url'] ?>" class="<?= $args['class_prefix'] ?>__mobile-cta --micro-cta"><?= $args['block']->attributes['navCTALabel'] ?></a>
        </li>
        <?php endif; ?>

    <?php endif; ?>
</ul>
