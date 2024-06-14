<?php
    add_filter('render_block', function($block_content, $block) {
        if($block['blockName'] != 'core/embed' || $block['attrs']['providerNameSlug'] != 'youtube') {
            return $block_content;
        }

        $dom = new DomDocument();
        $dom->loadHTML($block_content, LIBXML_NOERROR);

        $iframe = $dom->getElementsByTagName('iframe')->item(0);
        $wrapper = $iframe->parentNode;
        $wrapper->setAttribute('class', 'wp-block-embed__wrapper --no-padding-top');

        $matches = [];
        preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user|shorts)\/))([^\?&\"'>]+)/", $iframe->getAttribute('src'), $matches);
        $video_id = $matches[1] ?? null;

        $high_res = "https://img.youtube.com/vi/{$video_id}/maxresdefault.jpg";
        $med_res = "https://img.youtube.com/vi/{$video_id}/hqdefault.jpg";
        $low_res = "https://img.youtube.com/vi/{$video_id}/mqdefault.jpg";

        $srcset = "{$high_res} 3000w, {$med_res} 800w, {$low_res} 500vw";

        $thumbnail_img = $dom->createElement('img');
        $thumbnail_img->setAttribute('class', 'wp-block-embed__thumbnail-image');
        $thumbnail_img->setAttribute('src', $high_res);
        $thumbnail_img->setAttribute('alt', 'YouTube Video');
        $thumbnail_img->setAttribute('loading', 'lazy');
        $thumbnail_img->setAttribute('srcset', $srcset);
        $thumbnail_img->setAttribute('sizes', '(max-width: 3000px) 100vw, 3000px');

        $link = $dom->createElement('a');
        $link->setAttribute('class', 'wp-block-embed__thumbnail-link js-yt-embed-load');
        $link->setAttribute('data-video-url', "https://www.youtube.com/embed/{$video_id}?autoplay=1");
        $link->setAttribute('href', '#');

        $wrapper->removeChild($iframe);
        $link->appendChild($thumbnail_img);
        $wrapper->appendChild($link);

        return $dom->saveHTML();
    }, 10, 2);