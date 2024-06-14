<?php
  $image_id = $attributes['backgroundImage'] ? $attributes['backgroundImage'] : get_post_thumbnail_id();
  $image_url = wp_get_attachment_image_url($image_id, 'hero');
  $title = $attributes['headline'] ? $attributes['headline'] : get_the_title();
  $excerpt = $attributes['excerptOverride'] ? $attributes['excerptOverride'] : get_the_excerpt();

  $categories = array_slice(get_the_category(), 0, 4);
  $post_date = get_the_date();
?>
<section class="wp-block-ns-default-hero alignfull">
  <div class="wp-block-ns-default-hero__background" <?php if(!empty($image_url)) : ?>style="background-image: url(<?= $image_url ?>);"<?php endif; ?>>
    <div class="wp-block-ns-default-hero__grid --<?= $attributes['textAlign'] ?> --theme-background-image">
      <div class="wp-block-ns-default-hero__body">
        <?php if(get_post_type() == 'post') : ?>
          <p class="wp-block-ns-default-hero__subtitle">Posted <?= $post_date ?>
          <?php if(is_array($categories) && !empty($categories)) : ?>
            in
            <?php foreach($categories as $key => $category) : ?>
              <a class="wp-block-ns-default-hero__post-info__link" href="<?= $category->permalink ?>"><?= $category->name ?></a><?= (++$key == sizeof($categories) ? null : ', ') ?>
            <?php endforeach; ?>
          <?php endif; ?>
          </p>
        <?php endif; ?>
        <<?= $attributes['headlineTag'] ?> class="wp-block-ns-default-hero__title"><?= $title ?></<?= $attributes['headlineTag'] ?>>
        <?php if($attributes['showExcerpt'] && !empty($excerpt)) : ?>
          <p class="wp-block-ns-default-hero__description"><?= $excerpt ?></p>
        <?php endif; ?>
      </div>
    </div>
  </div>
  <?php if($attributes['showExcerpt'] == true && !empty($excerpt)) : ?>
    <p class="wp-block-ns-default-hero__mobile-description"><?= $excerpt ?></p>
  <?php endif; ?>
</section>
