<?php

namespace NobleStudios\adminForms;

require_once __DIR__ . '/fields.php';

class post_form extends fields {
    protected $fields = [];
    protected $post_type;
    protected $box_title;
    protected $box_id;

    function __construct( $args ) {
        $this->fields = $args['fields'];
        $this->post_type = $args['post_type'];
        $this->box_title = $args['box_title'];
        $this->box_id = $args['box_id'];

        add_action( 'add_meta_boxes', array( $this, 'register_meta_box' ), 99, 2 );
        add_action( 'save_post_' . $this->post_type, array( $this, 'save_meta' ), 99, 2 );
    }

    public function register_meta_box( $post_type, $post ) {
        add_meta_box( $this->box_id, $this->box_title, array( $this, 'meta_box' ), $this->post_type);
    }

    public function meta_box( $post ) {

        foreach( $this->fields as $field ) : ?>
            <?php $value = self::FIELD_VALUE( $field, $post ); ?>
            <p <?= ( $field['id'] ? 'id="' . $field['id']. '"' : '') ?>>
                <label>
                    <?= $field['label'] ?>
                </label>
                <?php self::ECHO_FIELD( $field, $value ) ?>
            </p>
        <?php endforeach;
    }

    public function save_meta( $post_id, $post) {

        foreach( $this->fields as $field ) {

            if ( isset( $_POST[$field['name']] ) ) {
                if( $_POST[$field['name']] ) {
                    update_post_meta( $post_id, $field['name'], $_POST[$field['name']] );
                } else {
                    delete_post_meta( $post_id, $field['name'] );
                }
            } else if ( $field['type'] === 'checkbox' ) {
                delete_post_meta( $post_id, $field['name'] );
            }
        }
    }

    protected static function FIELD_VALUE( $field, $post ) {
        return get_post_meta( $post->ID, $field['name'], true );
    }
}
