<?php

$banner_1 = get_option('ns_notice_banner_1');
$banner_2 = get_option('ns_notice_banner_2');
$banners = [];
if($banner_1['display']) {
    $banners[] = $banner_1;
}
if($banner_2['display']) {
    $banners[] = $banner_2;
}

if (!$banners) return;

?>
<div class="alert-banners">
    <?php foreach ($banners as $banner) :
        $style_class = $banner['style'] === 'info' ? ' --info --background-two' : '';
    ?>

        <div class="alert-banner js-alertBanner <?= $style_class ?>" data-banner-id="<?= $banner['id'] ?>">
            <div class="alert-banner__wrapper">
                <div class="alert-banner__body">
                    <?= $banner['message'] ?>
                    <button class="alert-banner__close js-closeAlert" type="button" aria-label="close alert"></button>
                </div>
            </div>
        </div>
    <?php endforeach; ?>
</div>
