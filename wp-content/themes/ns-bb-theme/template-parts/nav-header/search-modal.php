<section id="search-modal" class="search-form --background-two" data-testid="search-modal">
    <button class="search-form__close js-tgglSrch" type="button" aria-label="close search form" data-testid="button-close-search"><div class="search-form__close-icon"></div></button>
    <div class="search-form__width">
        <div class="search-form__headline --hl-l">
            <?= __( $args['searchHeadline'], 'ns' ) ?>
        </div>
        <form action="/">
            <input type="search" name="s" required placeholder="<?= __( $args['searchPlaceholder'], 'ns' ) ?>" data-testid="search-field"/>
            <button type="submit" class="search-icon" aria-label="<?= __( 'submit search', 'ns' ) ?>" data-testid="search-modal-submit"></button>
        </form>
        <?php if ( !have_posts() && function_exists( 'relevanssi_didyoumean' ) ) {
            relevanssi_didyoumean(
                get_search_query( false ),
                '<p>' . __('Did you mean', 'ns') . ': ',
                '</p>',
                5
            );
        } ?>


        <?php if( $args['recommendedPages'] ) : ?>
            <div class="search-form__recommended">
                <div class="search-form__recommended-headline h3">
                    <?= __( $args['recommendedHeadline'], 'ns' ) ?>
                </div>
            </div>
            <ul class="search-form__recommended-list">
                <?php foreach( $args['recommendedPages'] as $link ) : ?>
                    <li>
                        <a href="<?= get_permalink( $link['link']['id'] ) ?>"><?= get_the_title( $link['link']['id'] ) ?></a>
                    </li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
    </div>
</section>
