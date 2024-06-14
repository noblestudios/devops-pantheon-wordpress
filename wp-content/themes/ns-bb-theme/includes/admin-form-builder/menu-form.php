<?php

namespace NobleStudios\adminForms;

require_once __DIR__ . '/fields.php';

class menu_form extends fields {
    protected $fields = [];
    protected $depth;
    protected $menu_location;
    protected $menu_id;

    function __construct( $args ) {
        $this->fields = $args['fields'];
        $this->depth = $args['depth'];
        $locations = get_nav_menu_locations();
        $this->menu_location = $args['menu_location'];
        $object = wp_get_nav_menu_object( $locations[$this->menu_location] );
        $this->menu_id = $object->term_id;
        add_action( 'wp_nav_menu_item_custom_fields', [ $this,'menu_fields' ], 99, 5 );
        add_action( 'wp_update_nav_menu_item', [ $this, 'save_menu_meta' ], 10, 3 );
    }

    function menu_fields( $id,  $menu_item,  $depth,  $args, $current_object_id ) {

        // just for future debug use
        // $menu_id = isset( $_REQUEST['menu'] ) ? (int) $_REQUEST['menu'] : 0;

        // this seems to reliably get the correct current menu
        $menu_id = absint( get_user_option( 'nav_menu_recently_edited' ) );

        if( $menu_id == $this->menu_id && $depth == $this->depth ) {

            foreach( $this->fields as $field ) :
                $value = get_post_meta( $id, $field['name'], true );
                $field = self::SET_FIELD_ID( $field );
                $field['id'] .= '-' . $id;
                $field['name'] .= '[' . $id . ']';
                if( $field['type'] === 'wysiwyg' ) $field['mce_id'] = $field['id'] . '-' . $id;
                ?>
                <div style="margin-top: 8px;" id="field-row-<?= $field['id'] ?>">
                    <div>
                        <label for="<?= $field['id'] ?>"><?= $field['label'] ?></label>
                    </div>
                    <?php self::ECHO_FIELD( $field, $value ) ?>
                </div>
            <?php endforeach;
        }
    }

    function save_menu_meta( $menu_id, $menu_item_db_id, $args ) {
        if( $menu_id == $this->menu_id ) {

            foreach( $this->fields as $field ) {
                if( isset( $_POST[$field['name']][$menu_item_db_id] ) ) {
                    if( $_POST[$field['name']][$menu_item_db_id] ) {
                        update_post_meta( $menu_item_db_id, $field['name'], $_POST[$field['name']][$menu_item_db_id] );
                    } else {
                        delete_post_meta( $menu_item_db_id, $field['name'] );
                    }

                } else if( $field['type'] === 'checkbox' ) {
                    delete_post_meta( $menu_item_db_id, $field['name'] );
                }
            }
        }
    }
}
