<?php
$parent_page = $attributes['parentPage'];
$parent_id = 0;
if (!empty($parent_page)) {
    $parent_id = $parent_page['id'];
}

$children = array();
if (!empty($parent_id)) {
    $children = get_pages(array('child_of' => $parent_id, 'hierarchical' => true));
    $top_id = $parent_id;
}
if (empty($children)) {
    $top_id = get_the_ID();
    $children = get_pages(array('child_of' => $top_id, 'hierarchical' => true));
}

?>

<section class="wp-block-ns-side-nav">
    <div class="wp-block-ns-side-nav__wrapper">
        <div class="wp-block-ns-side-nav__content">
            <?= $content; ?>
        </div>
        <div class="wp-block-ns-side-nav__sidebar">
            <div>
                <h2 class="wp-block-ns-side-nav__sidebar-title"><?= $attributes['title']; ?></h2>
            </div>
            <?php if (!empty($children)) : ?>
                <ul class="wp-block-ns-side-nav__items">
                    <?php foreach ($children as $child) : ?>
                        <?php
                        $current_page = "";
                        $sub_children = get_pages(array('child_of' => $child->ID));
                        if ($child->ID === get_the_ID()) {
                            $current_page = '--current';
                        }
                        ?>
                        <?php if ($child->post_parent === $top_id) : ?>
                            <li class="wp-block-ns-side-nav__item">
                                <div class="wp-block-ns-side-nav__item-top">
                                    <a href="<?= get_the_permalink($child->ID); ?>" class="wp-block-ns-side-nav__item-link"><?= $child->post_title; ?></a>
                                    <?php if (!empty($sub_children)) : ?>
                                        <button type="button" class="wp-block-ns-side-nav__item-toggle js-sidebar-toggle"></button>
                                    <?php endif; ?>
                                </div>
                                <?php if (!empty($sub_children)) : ?>
                                    <div class="wp-block-ns-side-nav__item-children-wrapper">
                                        <ul class="wp-block-ns-side-nav__item-children">
                                            <?php foreach ($sub_children as $gchild) : ?>
                                                <li class="wp-block-ns-side-nav__item-child"><a href="<?= get_the_permalink($gchild->ID); ?>" class="wp-block-ns-side-nav__item-child-link"><?= $gchild->post_title; ?></a></li>
                                            <?php endforeach; ?>
                                        </ul>
                                    </div>
                                <?php endif; ?>
                            </li>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>
        </div>
    </div>
</section>
