<?php

$permalink = get_permalink();

?>

<div class="sidebar-post-shares">
    <h2 class="sidebar-post-shares__headline --hl-l"><?= __($args['attributes']['socialHeadline'], 'ns' ) ?></h2>
    <ul class="sidebar-post-shares__links">
        <li>
            <a href="<?= \NobleStudios\helpers\socialLinks\facebook( $permalink ) ?>" class="sidebar-post-shares__link --facebook" target="_blank" aria-label="share on Facebook"></a>
        </li>
        <li>
            <a href="<?= \NobleStudios\helpers\socialLinks\linkedin( $permalink ) ?>" class="sidebar-post-shares__link --linkedin" target="_blank" aria-label="share on LinkedIn"></a>
        </li>
        <li>
            <a href="<?= \NobleStudios\helpers\socialLinks\twitter( $permalink ) ?>" class="sidebar-post-shares__link --twitter" target="_blank" aria-label="share on Twitter"></a>
        </li>
        <li>
            <a href="<?= \NobleStudios\helpers\socialLinks\facebook( $permalink ) ?>" class="sidebar-post-shares__link --mail" target="_blank" aria-label="Email Link"></a>
        </li>
        <li>
            <a href="<?= \NobleStudios\helpers\socialLinks\facebook( $permalink ) ?>" class="sidebar-post-shares__link --link" target="_blank" aria-label="Copy Link"></a>
        </li>
    </ul>
</div>
