<?php

namespace NobleStudios\adminForms;

require_once __DIR__ . '/fields.php';

class tribe_settings_form extends fields {
    protected $tab_id;
    protected $tab_label;
    protected $position;
    protected $fields = [];

    function __construct( $settings ) {
        $this->tab_id = $settings['tab_id'];
        $this->tab_label = $settings['tab_label'];
        $this->position = $settings['position'];
        $this->fields = $settings['fields'] ?? [];

        // adds the tab and contents panel
        add_action('tribe_settings_do_tabs', [ $this, 'add_custom_tab' ], $this->position );

        // remove the tribe form opening and replaces with tha WP settings form action
        add_filter( 'tribe_settings_form_element_tab_' . $settings['tab_id'], function(){
            return '<form method="post" action="options.php">';
        }, 10 );

        // renders the form contents
        add_action( 'tribe_settings_content_tab_' . $this->tab_id, [ $this, 'tab_callback' ] );

        // tells tribe not to add the standard hidden fields and submit
        add_filter( 'tribe_settings_no_save_tabs', function( $tabs, $admin_page ){
            $tabs[] = $this->tab_id;
            return $tabs;
        }, 10, 2 );

        // adds the standard WP options hiddens and submit
        add_action( 'tribe_settings_after_content_tab_' . $this->tab_id, function(){
            settings_fields( $this->tab_id );
            submit_button();
        } );
    }

    function add_custom_tab() {
        add_filter( 'tribe_settings_tabs', function( $tabs, $admin_page ){
            $tabs[$this->tab_id] = $this->tab_label;
            return $tabs;
        }, $this->position, 2 );
    }

    function tab_callback() {
        ?>
        <div class="tribe-settings-form-wrap">
            <?php $this->render_fields(); ?>
        </div>
        <?php
    }

    protected function render_fields( $tab = false ) {

        $fields = $this->fields;

        foreach( $fields as $field ) {

            if( $field['type'] === 'title' ) {

                if( !empty( $field['title'] ) ) : ?>
                    <h2><?= $field['title'] ?></h2>
                <?php endif;
                if( !empty( $field['desc'] ) ) : ?>
                    <p><?= $field['desc'] ?></p>
                <?php endif; ?>
                    <table class="form-table" role="presentation"><tbody>
                <?php
            }

            else if( $field['type'] === 'sectionend' ) {
                ?>
                </tbody></table>
                <?php
            }

            else {
                $value = self::FIELD_VALUE( $field );
                $field = self::SET_FIELD_ID( $field );

                ?>
                <tr id="field-row-<?= $field['id'] ?>">
                    <th scope="row">
                        <label for="<?= $field['id'] ?>"><?= $field['label'] ?></label>
                    </th>
                    <td>
                    <?php self::ECHO_FIELD( $field, $value ) ?>
                    </td>
                </tr>
                <?php
            }
        }
    }

    protected static function FIELD_VALUE( $args ) {
        $option_name = is_array( $args['option'] ) ? $args['option'][0] : $args['option'];
        $option = get_option( $option_name );
        return is_array( $args['option'] ) && is_array( $option ) ? $option[$args['option'][1]] : $option;
    }
}
