<?php
    $image_id = $attributes['backgroundImage'] ? $attributes['backgroundImage'] : get_post_thumbnail_id();
    $image_url = wp_get_attachment_image_url($image_id, 'hero');
    $title = $attributes['headline'] ? $attributes['headline'] : get_the_title();
?>
<section class="wp-block-ns-tertiary-hero alignfull">
  <div class="wp-block-ns-tertiary-hero__background --<?= $attributes['heroStyle'] ?>" <?php if( $attributes['heroStyle'] == 'bg-image' && !empty( $image_url ) ) : ?>style="background-image: url(<?= $image_url ?>);"<?php endif; ?>>
    <div class="wp-block-ns-tertiary-hero__grid">
      <?php if($attributes['heroStyle'] == 'square-image' && !empty( $image_id ) ) : ?>
        <div class="wp-block-ns-tertiary-hero__image">
            <?= wp_get_attachment_image( $image_id, 'featured' ) ?>
        </div>
      <?php endif; ?>
      <div class="wp-block-ns-tertiary-hero__body <?= ( $attributes['heroStyle'] == 'bg-image' ? '--theme-background-image' : '' ) ?>">
        <?php if( $attributes['eyebrow'] ) : ?>
          <<?= $attributes['eyebrowTag'] ?> class="wp-block-ns-tertiary-hero__subtitle --eyebrow"><?= $attributes['eyebrow'] ?></<?= $attributes['eyebrowTag'] ?>>
        <?php endif; ?>
        <<?= $attributes['headlineTag'] ?> class="wp-block-ns-tertiary-hero__title --hl-xxl">
            <?= $title ?>
        </<?= $attributes['headlineTag'] ?>>
        <?php if( $attributes['intro'] ) : ?>
          <p class="wp-block-ns-tertiary-hero__description"><?= $attributes['intro'] ?></p>
        <?php endif; ?>
        <?php if( !empty( $attributes['links'] ) && is_array( $attributes['links'] ) ) : ?>
          <div class="wp-block-ns-tertiary-hero__links">
            <?php foreach( $attributes['links'] as $key => $link) : ?>
              <a class="wp-block-ns-tertiary-hero__link" href="<?= $link['link']['url'] ?>" <?= ( !empty( $link['link']['target'] ) ? ' target="' .  $link['link']['target'] . '"' : '' ) ?>><?= $link['title'] ?></a>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>
