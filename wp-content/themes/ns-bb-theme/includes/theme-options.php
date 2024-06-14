<?php

namespace NobleStudios\ThemeOptions;

const GROUP_LOGIN = 'ns-login';
const GROUP_BANNERS = 'ns-banners';
const GROUP_CONTACT = 'ns-contact-info';
const GROUP_SOCIALS = 'ns-socials';
const GROUP_GTAG = 'ns-gtag';
const GROUP_API = 'ns-api-keys';

add_action( 'init', __NAMESPACE__ . '\add_options_page', 99 );

function add_options_page() {

    new \NobleStudios\adminForms\settings_form( array(
        'parent_slug' => 'options-general.php',
        'page_title' => 'Theme Options',
        'menu_title' => 'Theme Options',
        'menu_slug' => 'ns-theme-options',
        'position' => 50,
        'tabs' => array(
            'login' => array(
                'tab_label' => 'Login Screen Options',
                'fields_slug' => GROUP_LOGIN,
                'fields' => array(
                    array(
                        'label' => 'Splash Image',
                        'type' => 'image',
                        'name' => 'login_splash_image',
                        'option' => 'login_splash_image',
                    ),
                ),
            ),
            'banners' => array(
                'tab_label' => 'Banners',
                'fields_slug' => GROUP_BANNERS,
                'fields' => array(
                    array(
                        'title' => 'Notice Banner 1',
                        'type' => 'title',
                        'desc' => 'The notice banner displays at the top of the page, and is used to display important updates or alerts to site visitors. Once an alert is closed by a visitor, they will not see it again for the duration of their visit on the site.',
                    ),
                    array(
                        'label' => 'Show Notice Banner',
                        'name' => 'ns_notice_banner_1[display]',
                        'option' => ['ns_notice_banner_1', 'display'],
                        'type' => 'checkbox',
                    ),
                    array(
                        'label' => 'Banner ID',
                        'name' => 'ns_notice_banner_1[id]',
                        'option' => ['ns_notice_banner_1', 'id'],
                        'type' => 'text',
                        'help' => 'Each banner must have a unique ID. Must be alphanumeric with no spaces or special characters..'
                    ),
                    array(
                        'label' => 'Banner Message',
                        'name' => 'ns_notice_banner_1[message]',
                        'option' => ['ns_notice_banner_1', 'message'],
                        'type' => 'wysiwyg',
                        'mce_id' => 'banner-message-1-mce',
                        'rows' => 4,
                    ),
                    array(
                        'label' => 'Banner Style',
                        'help' => 'Signifies important or urgency of the notice. Update is good for store updates like upcoming sales, new store hours, etc.. Alert is a severe notice, like temporary changes in business hours or online sales availability.',
                        'name' => 'ns_notice_banner_1[style]',
                        'option' => ['ns_notice_banner_1', 'style'],
                        'type' => 'radio',
                        'options' => array(
                            'info' => 'Informational',
                            'alert' => 'Alert'
                        ),
                    ),
                    array(
                        'type' => 'sectionend',
                    ),
                    array(
                        'title' => 'Notice Banner 2',
                        'type' => 'title',
                        'desc' => 'The notice banner displays at the top of the page, and is used to display important updates or alerts to site visitors. Once an alert is closed by a visitor, they will not see it again for the duration of their visit on the site.',
                    ),
                    array(
                        'label' => 'Show Notice Banner',
                        'name' => 'ns_notice_banner_2[display]',
                        'option' => ['ns_notice_banner_2', 'display'],
                        'type' => 'checkbox',
                    ),
                    array(
                        'label' => 'Banner ID',
                        'name' => 'ns_notice_banner_2[id]',
                        'option' => ['ns_notice_banner_2', 'id'],
                        'type' => 'text',
                        'help' => 'Each banner must have a unique ID. Must be alphanumeric with no spaces or special characters..'
                    ),
                    array(
                        'label' => 'Banner Message',
                        'name' => 'ns_notice_banner_2[message]',
                        'option' => ['ns_notice_banner_2', 'message'],
                        'type' => 'wysiwyg',
                        'mce_id' => 'banner-message-2-mce',
                        'rows' => 4,
                    ),
                    array(
                        'label' => 'Banner Style',
                        'help' => 'Signifies important or urgency of the notice. Update is good for store updates like upcoming sales, new store hours, etc.. Alert is a severe notice, like temporary changes in business hours or online sales availability.',
                        'name' => 'ns_notice_banner_2[style]',
                        'option' => ['ns_notice_banner_2', 'style'],
                        'type' => 'radio',
                        'options' => array(
                            'info' => 'Informational',
                            'alert' => 'Alert'
                        ),
                    ),
                    array(
                        'type' => 'sectionend',
                    ),
                    array(
                        'title' => 'Cookie Banner',
                        'type' => 'title',
                        'desc' => 'The cookie banner informs visitors that cookies will be saved during their visit.',
                    ),
                    array(
                        'label' => 'Cookie Banner Text',
                        'name' => 'ns_notice_cookies[message]',
                        'option' => ['ns_notice_cookies', 'message'],
                        'type' => 'wysiwyg',
                        'mce_id' => 'message-cookie',
                        'rows' => 4,
                    ),
                    array(
                        'label' => 'Privacy Page',
                        'name' => 'ns_notice_cookies[more_info_link]',
                        'option' => ['ns_notice_cookies', 'more_info_link'],
                        'type' => 'page_select',
                        'help' => 'Privacy policy page.'
                    ),
                    array(
                        'label' => 'Confirmation Button Text',
                        'name' => 'ns_notice_cookies[cta_text]',
                        'option' => ['ns_notice_cookies', 'cta_text'],
                        'type' => 'text',
                        'help' => 'Button text for the cookie policy confirmation button.'
                    ),
                    array(
                        'type' => 'sectionend',
                    ),
                ),
            ),
            'contact-info' => array(
                'tab_label' => 'Contact Info',
                'fields_slug' => GROUP_CONTACT,
                'fields' => array(
                    array(
                        'title' => 'Contact Info',
                        'type' => 'title',
                        'desc' => 'These fields are used for display of your business contact information in the site footer and other contact info areas.',
                    ),
                    array(
                        'label' => 'Address Line 1',
                        'name' => 'ns_contact[address_line_1]',
                        'option' => ['ns_contact', 'address_line_1'],
                        'size' => 'large',
                        'type' => 'text',
                    ),
                    array(
                        'label' => 'Address Line 2',
                        'name' => 'ns_contact[address_line_2]',
                        'option' => ['ns_contact', 'address_line_2'],
                        'size' => 'large',
                        'type' => 'text',
                    ),
                    array(
                        'label' => 'Phone Number',
                        'name' => 'ns_contact[phone]',
                        'option' => ['ns_contact', 'phone'],
                        'type' => 'text',
                    ),
                    array(
                        'type' => 'sectionend',
                    ),
                ),
            ),
            'socials' => array(
                'tab_label' => 'Social Links',
                'fields_slug' => GROUP_SOCIALS,
                'fields' => array(
                    array(
                        'title' => 'Social Links',
                        'type' => 'title',
                        'desc' => 'These are used in the footer and other sections for links to your social network pages.',
                    ),
                    array(
                        'label' => 'Facebook',
                        'name' => 'ns_social_links[facebook]',
                        'option' => ['ns_social_links', 'facebook'],
                        'type' => 'text',
                        'size' => 'full',
                    ),
                    array(
                        'label' => 'Twitter/X',
                        'name' => 'ns_social_links[twitter]',
                        'option' => ['ns_social_links', 'twitter'],
                        'type' => 'text',
                        'size' => 'full',
                    ),
                    array(
                        'label' => 'Linkedin',
                        'name' => 'ns_social_links[linkedin]',
                        'option' => ['ns_social_links', 'linkedin'],
                        'type' => 'text',
                        'size' => 'full',
                    ),
                    array(
                        'label' => 'Google',
                        'name' => 'ns_social_links[google]',
                        'option' => ['ns_social_links', 'google'],
                        'type' => 'text',
                        'size' => 'full',
                    ),
                    array(
                        'label' => 'Instagram',
                        'name' => 'ns_social_links[instagram]',
                        'option' => ['ns_social_links', 'instagram'],
                        'type' => 'text',
                        'size' => 'full',
                    ),
                    array(
                        'label' => 'Youtube',
                        'name' => 'ns_social_links[youtube]',
                        'option' => ['ns_social_links', 'youtube'],
                        'type' => 'text',
                        'size' => 'full',
                    ),
                    array(
                        'label' => 'Tiktok',
                        'name' => 'ns_social_links[tiktok]',
                        'option' => ['ns_social_links', 'tiktok'],
                        'type' => 'text',
                        'size' => 'full',
                    ),
                    array(
                        'label' => 'Pinterest',
                        'name' => 'ns_social_links[pinterest]',
                        'option' => ['ns_social_links', 'pinterest'],
                        'type' => 'text',
                        'size' => 'full',
                    ),
                    array(
                        'type' => 'sectionend',
                    ),
                ),
            ),
            'gtag' => array(
                'tab_label' => 'Tag Manager Scripts',
                'fields_slug' => GROUP_GTAG,
                'fields' => array(
                    array(
                        'title' => 'Tag Manager Scripts',
                        'type' => 'title',
                        //'desc' => '',
                    ),
                    array(
                        'label' => 'Head Script',
                        'name' => 'ns_gtag[head]',
                        'option' => ['ns_gtag', 'head'],
                        'type' => 'textarea',
                        'rows' => 4,
                        'size' => 'full',
                    ),
                    array(
                        'label' => 'Body Script',
                        'name' => 'ns_gtag[body]',
                        'option' => ['ns_gtag', 'body'],
                        'type' => 'textarea',
                        'rows' => 4,
                        'size' => 'full',
                    ),
                    array(
                        'type' => 'sectionend',
                    ),
                ),
            ),
            'apikeys' => array(
                'tab_label' => 'API Keys',
                'fields_slug' => GROUP_API,
                'fields' => array(
                    array(
                        'title' => 'API Keys',
                        'type' => 'title',
                        //'desc' => '',
                    ),
                    array(
                        'label' => 'Google Maps',
                        'name' => 'ns_gmap_key',
                        'option' => 'ns_gmap_key',
                        'type' => 'text',
                        'size' => 'full',
                    ),
                    array(
                        'type' => 'sectionend',
                    ),
                ),
            ),
        ),
    ) );
}

add_action( 'init',  __NAMESPACE__ . '\register_theme_settings' );

function register_theme_settings(){

    register_setting( GROUP_LOGIN, 'login_splash_image', [
        'type' => 'integer',
        'show_in_rest' => false,
        'default' => 0
    ] );

    register_setting( GROUP_BANNERS, 'ns_notice_banner_1', [
        'type' => 'object',
        'sanitize_callback' => function( $value ) {
            if( !isset( $value['display'] ) ) {
                $value['display'] = 0;
            }
            return $value;
        },
        'default' => [
            'display' => 0,
            'message' => '',
            'style' => 'alert',
            'id' => ''
        ]
    ] );

    register_setting( GROUP_BANNERS, 'ns_notice_banner_2', [
        'type' => 'object',
        'sanitize_callback' => function( $value ) {
            if( !isset( $value['display'] ) ) {
                $value['display'] = 0;
            }
            return $value;
        },
        'default' => [
            'display' => 0,
            'message' => '',
            'style' => 'alert',
            'id' => ''
        ]
    ] );

    register_setting( GROUP_BANNERS, 'ns_notice_cookies', [
        'type' => 'object',
        'default' => [
            'message' => 'This site uses cookies to enhance your browsing experience.',
            'more_info_link' => '',
            'cta_text' => 'I Understand',
        ]
    ] );

    register_setting( GROUP_CONTACT, 'ns_contact', [
        'type' => 'object',
        'show_in_rest' => [
            'schema' => [
                'type' => 'object',
                'properties' => [
                    'address_line_1' => [
                        'type' => 'string'
                    ],
                    'address_line_2' => [
                        'type' => 'string'
                    ],
                    'phone' => [
                        'type' => 'string'
                    ],
                ]
            ]
        ],
        'default' => [
            'address_line_1' => '',
            'address_line_2' => '',
            'phone' => '',
        ]
    ] );

    register_setting( GROUP_SOCIALS, 'ns_social_links', [
        'type' => 'object',
        'show_in_rest' => [
            'schema' => [
                'type' => 'object',
                'properties' => [
                    'facebook' => [
                        'type' => 'string'
                    ],
                    'twitter' => [
                        'type' => 'string'
                    ],
                    'linkedin' => [
                        'type' => 'string'
                    ],
                    'google' => [
                        'type' => 'string'
                    ],
                    'instagram' => [
                        'type' => 'string'
                    ],
                    'youtube' => [
                        'type' => 'string'
                    ],
                    'tiktok' => [
                        'type' => 'string'
                    ],
                    'pinterest' => [
                        'type' => 'string'
                    ],
                ]
            ]
        ],
        'default' => [
            'facebook' => '',
            'twitter' => '',
            'instagram' => '',
            'google' => '',
            'youtube' => '',
            'tiktok' => '',
            'pinterest' => '',
            'linkedin' => ''
        ]
    ] );

    register_setting( GROUP_GTAG, 'ns_gtag', [
        'type' => 'object',
        'default' => [
            'head' => '',
            'body' => '',
        ]
    ]);

    register_setting( GROUP_API, 'ns_gmap_key', [
        'type' => 'string',
        'show_in_rest' => true,
        'default' => '',
    ]);
}
