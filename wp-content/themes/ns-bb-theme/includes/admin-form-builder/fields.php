<?php

namespace NobleStudios\adminForms;

class fields {

    protected static function ECHO_FIELD( $field, $value ) {

        switch( $field['type'] ) {

            case 'text' : {
                self::TEXT( $field, $value );
                break;
            }

            case 'textarea' : {
                self::TEXTAREA( $field, $value );
                break;
            }

            case 'checkbox' : {
                self::CHECKBOX( $field, $value );
                break;
            }

            case 'wysiwyg' : {
                self::TINYMCE( $field, $value );
                break;
            }

            case 'select' : {
                self::SELECT( $field, $value );
                break;
            }

            case 'radio' : {
                self::RADIO( $field, $value );
                break;
            }

            case 'image' : {
                self::IMAGE( $field, $value );
                break;
            }

            case 'page_select' : {
                self::PAGE_SELECT( $field, $value );
                break;
            }

            case 'term_select' : {
                self::TERM_SELECT( $field, $value );
                break;
            }
        }
    }

    protected static function HELP( $field ) {
        if( !empty( $field['help'] ) ) {
            return '<p class="description">' . $field['help'] . '</p>';
        }
    }

    protected static function TEXT( $field, $value ) {
        $size_class = [
            'tiny' => 'tiny-text',
            'small' => 'small-text',
            'medium' => 'all-options',
            'large' => 'regular-text',
            'full' => 'large-text'
        ];

        $class = $size_class[$field['size'] ?? 'medium'] . ' ' . ( $field['class'] ?? '' );

        ?>
            <input type="text" id="<?= $field['id'] ?>" class="<?= $class ?>" name="<?= $field['name'] ?>" value="<?= $value ?>" />
            <?= self::HELP( $field ) ?>
        <?php
    }

    protected static function SELECT( $field, $value ) {
        ?>
            <select id="<?= $field['id'] ?>" class="<?= $field['class'] ?? '' ?>" name="<?= $field['name'] ?>">
                <option value="" <?= selected( '' ) ?>>Select One</option>
                <?php foreach( $field['options'] as $v => $l ) :
                    $option_value = is_array( $l ) ? $l['value'] : $v;
                    $option_text = is_array( $l ) ? $l['label'] : $l;
                    ?>
                    <option value="<?= $option_value ?>" <?= selected( $option_value, $value ) ?>><?= $option_text ?></option>
                <?php endforeach; ?>
            </select>
            <?= self::HELP( $field ) ?>
        <?php
    }

    protected static function TEXTAREA( $field, $value ) {
        $size_class = [
            'medium' => 'all-options',
            'large' => 'regular-text',
            'full' => 'large-text'
        ];
        ?>
            <textarea id="<?= $field['id'] ?>" class="<?= $size_class[$field['size'] ?? 'large'] ?> <?= $field['class'] ?? '' ?>" name="<?= $field['name'] ?>" rows="<?= $field['rows'] ?? 3 ?>"><?= $value ?></textarea>
            <?= self::HELP( $field ) ?>
        <?php
    }

    protected static function CHECKBOX( $field, $value ) {
        if( !empty( $field['help'] ) ) : ?>
            <label>
        <?php endif; ?>
            <input type="checkbox" id="<?= $field['id'] ?>" name="<?= $field['name'] ?>" value="1" <?= checked( $value ) ?>/>
            <?= !empty( $field['help'] ) ? $field['help'] : '' ?>
        <?php if( !empty( $field['help'] ) ) : ?>
            </label>
        <?php endif; ?>
        <?php
    }

    protected static function RADIO( $field, $value ) {
        ?>
        <fieldset>
            <?php foreach( $field['options'] as $k => $label ) : ?>
                <label style="display: block;"><input type="radio" name="<?= $field['name'] ?>" value="<?= $k ?>" <?= checked( $value, $k, false  ) ?>> <?= $label ?></label>
            <?php endforeach; ?>
        </fieldset>
        <?= self::HELP( $field ) ?>
        <?php
    }

    protected static function TINYMCE( $field, $value ) {
        $settings = array(
            'teeny' => true,
            'media_buttons' => false,
            'textarea_rows' => $field['rows'] ?? 4,
            'textarea_name' => $field['name'],
            'tinymce'       => array(
                'toolbar1'      => 'bold,italic,link',
            )
        );

        wp_editor( $value, $field['id'] . '-mce', $settings );
    }

    protected static function PAGE_SELECT( $field, $value ) {
        wp_dropdown_pages([
            'selected' => $value,
            'name' => $field['name'],
            'id'  => $field['id'] ?? '',
            'class' => $field['class'] ?? '',
            'show_option_none' => 'Select',
            'option_none_value' => 0,
        ]);
        echo self::HELP( $field );
    }

    protected static function TERM_SELECT( $field, $value ) {
        wp_dropdown_categories([
            'taxonomy' => $field['taxonomy'],
            'selected' => $value,
            'hierarchical' => 1,
            'orderby' => 'name',
            'name' => $field['name'],
            'id'  => $field['id'] ?? '',
            'class' => $field['class'] ?? '',
            'show_option_none' => 'Select',
            'option_none_value' => 0,
        ]);
        echo self::HELP( $field );
    }

    protected static function IMAGE( $field, $value ) {
        wp_enqueue_media();

        $src = $value ? wp_get_attachment_image_src( $value, 'medium')[0] : '';

        ?>
        <div class="image-select-field js-imageSelect <?= $field['class'] ?? '' ?> <?= ( $value ? ' --has-value' : '') ?>">
            <div class="image-select-field__img-wrap">
                <img src="<?= $src ?>">
            </div>
            <div class="image-select-field__button-wrap">
                <input class="js-selectImage button" type="button" value="Select/Upload Image" />
                <input class="image-select-field__remove js-remove button" type="button" value="Remove Image" />
            </div>
            <input type="hidden" name="<?= $field['name'] ?>" class="js-value" value="<?= $value ?>">
        </div>
        <?= self::HELP( $field ) ?>
        <?php
    }

    protected static function SET_FIELD_ID( $field ) {
        if( !isset( $field['id'] ) ) {
            if( isset( $field['option'] ) ) {
                $field['id'] = is_array( $field['option'] ) ? implode( '-', $field['option'] ) : $field['option'];
            }
            else {
                $field['id'] = $field['name'];
            }
        }
        return $field;
    }
}

