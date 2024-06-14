<?php

namespace NobleStudios\hooks\loginScreen;

function login_logo() {

  $logo_id = get_option( 'login_splash_image' );

  if( $logo_id ) :
    $logo_src = wp_get_attachment_image_url( $logo_id, 'medium_large');

  ?>
  <style type="text/css">
    body.login div#login h1 a {
      background-image: url('<?= $logo_src ?>');
      padding-bottom: 30px;
      aspect-ratio: 1;
      background-size: cover;
      height: unset;
      width: 60%;
    }
  </style>
 <?php endif;
}

add_action( 'login_enqueue_scripts', __NAMESPACE__ . '\login_logo' );
