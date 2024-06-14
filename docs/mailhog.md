# Mailhog Setup

## Purpose
These configurations prevent WordPress from sending mail through production SMTP servers when testing features on our local environments. This prevents confusing or alarming emails from appearing in our inboxes when users are edited, and also prevents form submissions from being sent to clients or others who manage form submissions.

This code does 2 things. First, it overrules the SMTP settings setup in the WP Mail SMTP plugin. Second, it adds the Mailhog utility to our Lando container so that we can still test emails sent by WP or form plugins.

## Requirements
1. Lando
2. WP Mail SMTP plugin

## Lando Configuration
Adding Mailhog to our Lando containers is accomplished by adding the following code to the .lando.yml file:

    services:
        mailhog:
            type: mailhog

## wp-config.php Setup
Add the following code to your wp-config.php file:

    if ( $_ENV['PANTHEON_ENVIRONMENT'] === 'lando' ) {
        define( 'WPMS_ON', true );
        define( 'WPMS_MAILER', 'smtp' );
        define( 'WPMS_SSL', '' );
        define( 'WPMS_SMTP_AUTOTLS', true );
        define( 'WPMS_SMTP_HOST', 'mailhog' );
        define( 'WPMS_SMTP_PORT', 1025 );
        define( 'WPMS_SMTP_AUTH', false );
    }

For more information about these constants, refer to [Securing SMTP Settings With Constants](https://wpmailsmtp.com/docs/how-to-secure-smtp-settings-by-using-constants/)

## Viewing local emails
The link to the email inbox is listed when Lando boots up a container. It will be listed under "MAILHOG URLS"
