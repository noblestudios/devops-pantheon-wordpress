<ul class="<?= $args['class_prefix'] ?>__secondary-menu-items">
    <?php foreach( $args['menu-items'] as $item ) : ?>
        <li class="<?= $args['class_prefix'] ?>__secondary-menu-item">
            <a class="<?= $args['class_prefix'] ?>__secondary-menu-item-link" href="<?= $item->url ?>"><?= $item->title ?></a>
        </li>
    <?php endforeach; ?>
    <?php if( $args['phone'] ) : ?>
        <li class="<?= $args['class_prefix'] ?>__secondary-menu-item --phone-row">
            <a class="<?= $args['class_prefix'] ?>__secondary-menu-item-link" href="tel:<?= \NobleStudios\helpers\string\phone_link( $args['phone'] ) ?>" class="--phone"><?= $args['phone'] ?></a>
        </li>
    <?php endif ?>
</ul>
