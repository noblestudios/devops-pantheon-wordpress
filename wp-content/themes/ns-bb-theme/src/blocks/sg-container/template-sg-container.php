<?php
$title = "Block Title";
if (!empty($attributes['blockTitle'])) {
    $title = $attributes['blockTitle'];
}

?>

<section class="sg-container alignfull">
    <div class="sg-container__wrapper">
        <div class="sg-container__title"><?= $title; ?></div>
        <div class="sg-container__content">
            <?= $content ?>
        </div>

    </div>
</section>
