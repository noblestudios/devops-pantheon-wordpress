<?php declare( strict_types=1 );

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../../../../includes/helpers/string-helpers.php';

final class TestStringHelpers extends TestCase {
    public function test_phone_link(): void {
        $result = NobleStudios\helpers\string\phone_link( '+1 775 883 6000' );
        $this->assertEquals( $result, '17758836000' );

        $result = NobleStudios\helpers\string\phone_link( '775 883 6000' );
        $this->assertEquals( $result, '7758836000' );

        $result = NobleStudios\helpers\string\phone_link( '1 (775) 883-6000' );
        $this->assertEquals( $result, '17758836000' );
    }

    public function test_truncate_text(): void {
        $text = 'Impedit quidem quas ipsa deserunt quibusdam debitis. Quis quibusdam neque vitae dolorum dolorum harum. Et occaecati voluptate voluptatem. Blanditiis et dolor eius quos officia esse sit id. Nobis quis voluptatem modi ut voluptates.';

        # Truncate default
        $result = NobleStudios\helpers\string\truncate_text( $text );
        $this->assertEquals( $result, 'Impedit quidem quas ipsa deserunt quibusdam debitis. Quis quibusdam neque vitae dolorum dolorum&hellip;' );

        # Truncate will not break words
        # Length is 5, but our first word is 7 chars long.
        $result = NobleStudios\helpers\string\truncate_text( $text, 5, '' );
        $this->assertEquals( $result, 'Impedit' );

        # Truncate will ignore if length > text
        $result = NobleStudios\helpers\string\truncate_text( "but what if short?" );
        $this->assertEquals( $result, 'but what if short?' );
    }

    public function test_remove_suffix(): void {
        $text   = "What Suffix?";
        $result = NobleStudios\helpers\string\remove_suffix( "?", $text );
        $this->assertEquals( $result, 'What Suffix' );
    }
}
