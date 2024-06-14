<?php
$parent_items = [];

if (!empty($attributes['parentLinks'])) {
    $base_data = $attributes['parentLinks'];
    $render_data = [];
    foreach ($base_data as $link_item) {

        $args = array(
            'post_type'      => 'page',
            'posts_per_page' => -1,
            'post_parent'    => $link_item['link']['id'],
            'order'          => 'ASC',
            'orderby'        => 'title'
        );
        $parent_pages = new WP_Query($args);
        $parent_data = [];
        if ($parent_pages->have_posts()) {
            foreach ($parent_pages->posts as $parent) {
                $child_args = array(
                    'post_type'      => 'page',
                    'posts_per_page' => -1,
                    'post_parent'    => $parent->ID,
                    'order'          => 'ASC',
                    'orderby'        => 'title'
                );
                $children_pages = new WP_Query($child_args);
                $children_data = [];
                if ($children_pages->have_posts()) {
                    foreach ($children_pages->posts as $child) {
                        $children_data[] = array(
                            'title' => get_the_title($child->ID),
                            'url' => get_the_permalink($child->ID)
                        );
                    }
                }
                $parent_data[] = array(
                    'title' => get_the_title($parent->ID),
                    'url' => get_the_permalink($parent->ID),
                    'children' => $children_data
                );
            }
        }
        $title = $link_item['title'];
        if (empty($link_item['title'])) {
            $title = $link_item['link']['title'];
        }
        $render_data[] = array(
            'title' => $title,
            'url' => $link_item['link']['url'],
            'excerpt' => get_the_excerpt($link_item['link']['id']),
            'children' => $parent_data
        );
    }
}

$classes = [];
if (!empty($attributes['className'])) {
    $classes[] = $attributes['className'];
}
$classes[] = 'site-map';
$classes[] = 'alignwide';
$classes = join(' ', $classes);

?>
<section class="<?= $classes; ?>">
    <div class="site-map__wrapper">
        <header class="site-map__header">
            <?php if ($attributes['eyebrow']) : ?>
                <div class="site-map__eyebrow"><?= $attributes['eyebrow']; ?></div>
            <?php endif; ?>
            <?php if ($attributes['headline']) : ?>
                <h2 class="site-map__headline"><?= $attributes['headline']; ?></h2>
            <?php endif; ?>
            <?php if ($content) : ?>
                <div class="site-map__header-content"><?= $content; ?></div>
            <?php endif; ?>
        </header>

        <div class="site-map__jump-links">
            <div class="site-map__jump-links-action">I'm looking for</div>
            <?php if (!empty($render_data)) : ?>
                <ul class="site-map__jump-links-items">
                    <?php foreach ($render_data as $top) : ?>
                        <li class="site-map__jump-links-item">
                            <a class="site-map__jump-links-item-toggle js-jump-toggle" href="#section-<?= \NobleStudios\helpers\string\id_attribute($top['title']) ?>"><?= $top['title']; ?></a>
                        </li>
                    <?php endforeach; ?>

                </ul>
            <?php endif; ?>
        </div>
        <?php foreach ($render_data as $level1) : ?>
            <div class="site-map__base" id="section-<?= \NobleStudios\helpers\string\id_attribute($level1['title']) ?>">

                <div class="site-map__base-header">
                    <div class="site-map__base-header-headline"><?= $level1['title']; ?></div>
                    <div class="site-map__base-header-content"><?= $level1['excerpt']; ?></div>
                    <div class="site-map__base-header-cta-wapper">
                        <a href="<?= $level1['url']; ?>" class="site-map__base-header-cta">Learn More</a>
                    </div>
                </div>
                <div class="site-map__base-list">
                    <?php if (!empty($level1['children'])) : ?>
                        <ul class="site-map__grandparent">
                            <?php foreach ($level1['children'] as $level2) : ?>
                                <li class="site-map__grandparent-item">
                                    <div class="site-map__grandparent-links-wrapper">
                                        <a href="<?= $level2['url']; ?>" class="site-map__grandparent-link"><?= $level2['title']; ?></a>
                                        <?php if (!empty($level2['children'])) : ?>
                                            <button class="site-map__grandparent-toggle js-drop-toggle" type="button">Toggle Children</button>
                                        <?php endif; ?>
                                    </div>
                                    <div class="site-map__grandparent-wrapper">
                                        <?php if (!empty($level2['children'])) : ?>
                                            <ul class="site-map__parent">
                                                <?php foreach ($level2['children'] as $level3) : ?>
                                                    <li class="site-map__parent-item">
                                                        <div class="site-map__parent-links-wrapper">
                                                            <a href="<?= $level3['url']; ?>" class="site-map__parent-link"><?= $level3['title']; ?></a>
                                                            <?php if (!empty($level3['children'])) : ?>
                                                                <button class="site-map__parent-toggle js-drop-toggle" type="button">Toggle Children</button>
                                                            <?php endif; ?>
                                                        </div>
                                                        <div class="site-map__parent-wrapper">
                                                            <?php if (!empty($level3['children'])) : ?>
                                                                <ul class="site-map__child">
                                                                    <?php foreach ($level3['children'] as $level4) : ?>
                                                                        <li class="site-map__child-item">
                                                                            <div class="site-map__child-links-wrapper">
                                                                                <a href="<?= $level4['url']; ?>" class="site-map__child-link"><?= $level4['title']; ?></a>
                                                                            </div>
                                                                        </li>
                                                                    <?php endforeach; ?>
                                                                </ul>
                                                            <?php endif; ?>
                                                        </div>
                                                    </li>
                                                <?php endforeach; ?>
                                            </ul>
                                        <?php endif; ?>
                                    </div>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</section>
