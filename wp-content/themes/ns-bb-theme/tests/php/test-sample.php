<?php declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class SampleTest extends TestCase
{
    public function test_sample(): void
    {
        $this->assertIsBool( true );
        self::assertIsNotIterable( false );
    }
}
