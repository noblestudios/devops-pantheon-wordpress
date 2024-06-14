<?php


//print_r( get_post_meta( get_the_ID()) );

$event = tribe_get_event( get_the_ID() );
$start_date = tribe_get_start_date( get_the_ID(), true, 'd-m-Y H:i:s' );
$end_date = tribe_get_end_date( get_the_ID(), true, 'd-m-Y H:i:s' );
$cost = tribe_get_cost(get_the_ID(), true);

$venue_id = tribe_get_venue_id( get_the_ID() );
$venue = tribe_get_venue_object( $venue_id );

$organizer_id = tribe_get_organizer_id( get_the_ID() );
$organizer = tribe_get_organizer_object( $organizer_id );

$phone = $organizer->phone;
$email = $organizer->email;

?>
<section class="wp-block-ns-event-hero alignfull">
    <?php if( $attributes['showImage'] ) : ?>
        <div class="wp-block-ns-event-hero__image-wrap">
            <?= get_the_post_thumbnail( null, 'full' ) ?>
        </div>
    <?php endif; ?>
    <div class="wp-block-ns-event-hero__main-grid">
        <div class="wp-block-ns-event-hero__breadcrumbs">
            <a href="#">Breadcrumbs</a>
        </div>
        <<?= $attributes['headlineTag'] ?> class="wp-block-ns-event-hero__headline --hl-xxl">
            <?= get_the_title() ?>
        </<?= $attributes['headlineTag'] ?>>
        <div class="wp-block-ns-event-hero__details">
            <div class="wp-block-ns-event-hero__details-col-1">
                <div class="wp-block-ns-event-hero__details-date-time">
                    <div class="wp-block-ns-event-hero__details-date">
                        <?= \NobleStudios\helpers\dates\nsMakeDateLabel( $start_date, $end_date ) ?>
                    </div>
                    <div class="wp-block-ns-event-hero__details-time">
                        <?= \NobleStudios\helpers\dates\nsMakeTimeLabel($start_date, $end_date, tribe_event_is_all_day( get_the_ID())) ?>
                    </div>
                </div>
                <div class="wp-block-ns-event-hero__details-cost">
                    <?= $cost ? $cost : __( 'Free', 'ns' ) ?>
                </div>
            </div>
            <div class="wp-block-ns-event-hero__details-col-2">
                <div class="wp-block-ns-event-hero__details-location">
                    <div class="wp-block-ns-event-hero__details-location-name">
                        <?= $venue->post_title ?>
                    </div>
                    <div class="wp-block-ns-event-hero__details-location-address-1">
                        <?= $venue->address ?>
                    </div>
                    <div class="wp-block-ns-event-hero__details-location-address-2">
                        <?= $venue->city ?>, <?= $venue->state_province ?> <?= $venue->zip ?>
                    </div>
                </div>
            </div>
            <div class="wp-block-ns-event-hero__details-col-3">
                <?php if( $phone ) : ?>
                    <div class="wp-block-ns-event-hero__details-phone">
                        <?= $phone ?>
                    </div>
                <?php endif; ?>
                <?php if( $email ) : ?>
                    <div class="wp-block-ns-event-hero__details-email">
                        <?= $email ?>
                    </div>
                <?php endif; ?>
            </div>

        </div>
        <div class="wp-block-ns-event-hero__ctas">
            <a class="wp-block-ns-event-hero__cta --cta">Primary CTA</a>
            <a class="wp-block-ns-event-hero__cta --cta --secondary">Secondary CTA</a>
            <a class="wp-block-ns-event-hero__cta --cta --tertiary">Tertiarty CTA</a>
        </div>
    </div>
</section>
