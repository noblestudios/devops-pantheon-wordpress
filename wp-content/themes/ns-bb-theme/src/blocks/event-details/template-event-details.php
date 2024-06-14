<?php

$terms = get_the_term_list( get_the_ID(), 'tribe_events_cat', '', ', ', '' );

$slides = array_filter([
    get_post_meta( get_the_ID(), 'slide_image_1', true ),
    get_post_meta( get_the_ID(), 'slide_image_2', true ),
    get_post_meta( get_the_ID(), 'slide_image_3', true ),
    get_post_meta( get_the_ID(), 'slide_image_4', true ),
    get_post_meta( get_the_ID(), 'slide_image_5', true ),
    get_post_meta( get_the_ID(), 'slide_image_6', true ),
]);

$socials = array_filter( [
    'facebook' => get_post_meta( get_the_ID(), 'event_facebook', true ),
    'google' => get_post_meta( get_the_ID(), 'event_google', true ),
    'youtube' => get_post_meta( get_the_ID(), 'event_youtube', true ),
    'linkedin' => get_post_meta( get_the_ID(), 'event_linkedin', true ),
    'instagram' => get_post_meta( get_the_ID(), 'event_instagram', true ),
    'twitter' => get_post_meta( get_the_ID(), 'event_twitter', true ),
    'vimeo' => get_post_meta( get_the_ID(), 'event_vimeo', true ),
] );

?>

<section class="wp-block-ns-event-details alignfull">
    <div class="wp-block-ns-event-details__grid <?= ( $slides ? '--has-slider' : '' ) ?>">
        <?php if( $slides ) : ?>
            <?= get_template_part( 'template-parts/details-modules/image-gallery-slider', '', [
                'parent_class' => 'wp-block-ns-event-details__slider',
                'slides' => $slides
            ] ) ?>
        <?php endif; ?>
        <div class="wp-block-ns-event-details__intro">
            <<?= $attributes['detailsHeadlineTag'] ?> class="wp-block-ns-event-details__intro-headline --hl-xl">
                <?= __( $attributes['detailsHeadline'], 'ns') ?>
            </<?= $attributes['detailsHeadlineTag'] ?>>
            <?php if( $terms ) : ?>
                <div class="wp-block-ns-event-details__intro-categories">
                    <?= __( 'Category', 'ns' ) ?>: <?= strip_tags( $terms ) ?>
                </div>
            <?php endif; ?>
            <div class="wp-block-ns-event-details__intro-body --wizzy">
                <?= get_the_content() ?>
            </div>
        </div>
        <?php if( $socials ) : ?>
            <ul class="wp-block-ns-event-details__socials">
                <?php foreach( $socials as $key => $url ) : ?>
                    <li class="wp-block-ns-event-details__socials-item"><a href="<?= $url ?>" class="--<?= $key ?>" aria-label="<?= __($key, 'ns') ?>"></a></li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>

        <div class="wp-block-ns-event-details__cal-links">
            <a href="<?= tribe_get_single_ical_link( get_the_ID() ) ?>"><?= __( 'Add to ICal', 'ns' ) ?></a>
            <a href="<?= tribe_get_gcal_link( get_the_ID() ) ?>"><?= __( 'Add to Google Calendar', 'ns' ) ?></a>
            <?php
                //  will format outlook link later
                // $start_date = tribe_get_start_date( get_the_ID(), true, 'Y-m-d H:i:s' );
                // $end_date = tribe_get_end_date( get_the_ID(), true, 'Y-m-d H:i:s' );
                /*<a href="https://outlook.office.com/calendar/0/deeplink/compose?subject=<?= urlencode( get_the_title() ) ?>&startdt=2022-03-05T10:30:00+00:00&enddt=2022-03-05T18:45:00+00:00path=%2Fcalendar%2Faction%2Fcompose&rru=addevent">Add to Outlook</a>*/
            ?>
        </div>
        <div class="wp-block-ns-event-details__map">
            <?= tribe_get_embedded_map(null, '100%', '100%') ?>
        </div>
    </div>
</section>
