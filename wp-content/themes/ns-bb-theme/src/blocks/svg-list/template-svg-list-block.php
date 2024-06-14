<?php

if(!function_exists('list_svgs')) {
    function list_svgs( $dir, $svgs = [] ) {

        $scan = scandir(THEME_PATH . DIRECTORY_SEPARATOR . $dir );
        foreach( $scan as $file ) {
        if ( !is_dir( THEME_PATH . DIRECTORY_SEPARATOR . $dir . DIRECTORY_SEPARATOR . $file ) && str_ends_with( $file, '.svg' ) ) {
            $path = remove_base_path( $dir . DIRECTORY_SEPARATOR . $file );
            $pathinfo = pathinfo( $path );

            if( $pathinfo['dirname'] && $pathinfo['dirname'] !== '.' && $pathinfo['dirname'] !== '..') {
            $paths = explode( '/', $pathinfo['dirname'] );

            if( count( $paths ) === 1 ) {
                $svgs[ $paths[0] ][] = $path;
            }
            }

            else $svgs[] = $path;

            //$svgs[] =
        }
        else if( is_dir( THEME_PATH . DIRECTORY_SEPARATOR . $dir . DIRECTORY_SEPARATOR . $file ) && $file !== '.' && $file !== '..' ) {
            $svgs = list_svgs( $dir . DIRECTORY_SEPARATOR . $file, $svgs );
        }
        }
        return $svgs;
    }

    function remove_base_path( $path ) {
        $base_path = 'assets/svgs/';

        if ( substr( $path, 0, strlen( $base_path ) ) == $base_path ) {
        $path = substr( $path, strlen( $base_path ) );
        }
        return $path;
    }

    $svgs = list_svgs( 'assets/svgs' );

    $list = [];

    foreach( $svgs['icons'] as $file ) {
    $title = $file;
    $file = str_replace('icons/', '', $file);
    $title = str_replace('.svg', '', $title);
    $title = str_replace('icons/', '', $title);
    $title = str_replace('fa-', '', $title);
    $title = str_replace('-', ' ', $title);
    $title = ucwords($title);
    $list[$file] = $title;

    }
}

// print_r($list);

?>


<section class="svg-list-block alignwide">
  <?php foreach( $svgs as $key => $svg ) : ?>
    <?php if ( is_array( $svg ) ) : ?>
      <h2><?= $key ?></h2>
      <div class="svg-list__list">
        <?php foreach( $svg as $svg2 ) : ?>
          <div class="svg-list__item">
            <img src="<?= get_template_directory_uri() . '/assets/svgs/' . $svg2 ?>"/>
            <p><?= basename( $svg2 ) ?></p>
          </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  <?php endforeach; ?>
</section>
