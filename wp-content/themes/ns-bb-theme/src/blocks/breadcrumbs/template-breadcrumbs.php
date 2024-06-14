<?php
$current_id = get_the_ID();
$ancestors = !$attributes['manualSelection'] ? get_post_ancestors($current_id) : false;

?>
<section class="wp-block-ns-breadcrumbs alignfull">
    <div class="wp-block-ns-breadcrumbs__wrapper">
        <ul class="wp-block-ns-breadcrumbs__items">
            <?php if( !$attributes['manualSelection'] ) : ?>
                <li class="wp-block-ns-breadcrumbs__item">
                    <a href="<?= home_url(); ?>" class="wp-block-ns-breadcrumbs__item-link">Home<span class="wp-block-ns-breadcrumbs__item-arrow"></span></a>
                </li>
            <?php elseif($attributes['selectedPage']) : ?>
                <li class="wp-block-ns-breadcrumbs__item">
                    <a href="<?= get_the_permalink($attributes['selectedPage']) ?>" class="wp-block-ns-breadcrumbs__item-link"><span class="wp-block-ns-breadcrumbs__item-arrow --back"></span><?= get_the_title( $attributes['selectedPage'] ) ?></a>
                </li>
            <?php endif; ?>
            <?php
            if (!empty($ancestors)) : ?>
                <?php foreach (array_reverse( $ancestors ) as $k => $parent_item) :
                    $children = ( $attributes['dropDownChildren'] && $k === count($ancestors) - 1 ) ? get_children($parent_item) : false;
                    //print_r($children);

                    ?>
                    <li class="wp-block-ns-breadcrumbs__item">
                        <a href="<?= the_permalink($parent_item) ?>" class="wp-block-ns-breadcrumbs__item-link"><?= get_the_title($parent_item); ?><span class="wp-block-ns-breadcrumbs__item-arrow <?= $children ? ' --has-children' : '' ?>"></span></a>

                        <?php if( $children ) : ?>
                            <div class="wp-block-ns-breadcrumbs__children-wrap --theme-2">
                                <ul class="wp-block-ns-breadcrumbs__children">
                                    <?php foreach( array_reverse($children) as $child ) : ?>
                                        <li>
                                            <a class="wp-block-ns-breadcrumbs__item-link" href=""><?= get_the_title($child) ?></a>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        <?php endif; ?>
                    </li>
                <?php endforeach; ?>
            <?php endif; ?>
            <?php if(!$attributes['dropDownChildren'] && !$attributes['manualSelection'] ) : ?>
                <li class="wp-block-ns-breadcrumbs__item">
                    <div class="wp-block-ns-breadcrumbs__item-link"><?= get_the_title($current_id); ?></div>
                </li>
            <?php endif; ?>
        </ul>
    </div>
</section>
