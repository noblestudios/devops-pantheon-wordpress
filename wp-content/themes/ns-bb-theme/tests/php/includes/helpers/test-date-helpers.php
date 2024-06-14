<?php declare(strict_types=1);

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../../../../includes/helpers/date-helpers.php';

final class TestDateHelpers extends TestCase
{
    private function current_year() {
        return date( 'Y', time());
    }


    public function test_ns_make_date_label(): void
    {
        $current_year = $this->current_year();
        $result = NobleStudios\helpers\dates\nsMakeDateLabel( $current_year . '-10-12 06:00:00', $current_year . '-10-14 06:00:00');
        $this->assertEquals($result, 'October 12 - 14');
    }

    public function test_ns_make_date_label_with_same_date_current_year(): void
    {
        $current_year = $this->current_year();
        $result = NobleStudios\helpers\dates\nsMakeDateLabel($current_year . '-10-12 06:00:00', $current_year . '-10-12 06:00:00');
        $this->assertEquals($result, 'October 12');
    }

    public function test_ns_make_date_label_with_same_date_non_current_year(): void
    {
        $result = NobleStudios\helpers\dates\nsMakeDateLabel('2020-10-12 06:00:00', '2020-10-12 06:00:00');
        $this->assertEquals($result, 'October 12, 2020');
    }

    public function test_ns_make_date_label_with_different_dates_current_year(): void
    {
        $current_year = $this->current_year();
        $result = NobleStudios\helpers\dates\nsMakeDateLabel($current_year . '-10-01 06:00:00', $current_year . '-10-12 10:00:00');
        $this->assertEquals($result, 'October 1 - 12');
    }

    public function test_ns_make_date_label_with_different_dates(): void
    {
        $result = NobleStudios\helpers\dates\nsMakeDateLabel('2020-10-12 06:00:00', '2020-10-16 06:00:00');
        $this->assertEquals($result, 'October 12 - 16, 2020');
    }

    public function test_ns_make_date_label_disable_year(): void
    {
        $result = NobleStudios\helpers\dates\nsMakeDateLabel('1991-06-01 06:00:00', '1991-07-02 06:00:00', false);
        $this->assertEquals($result, 'June 1 - July 2');
    }

    public function test_ns_make_time_label(): void
    {
        $result = NobleStudios\helpers\dates\nsMakeTimeLabel('2023-06-01 18:00:00', '2023-06-01 20:00:00', false);
        $this->assertEquals($result, '6:00 pm - 8:00 pm');
    }

    public function test_ns_make_time_label_all_day(): void
    {
        $result = NobleStudios\helpers\dates\nsMakeTimeLabel('2023-06-01 18:00:00', '2023-06-01 20:00:00', true);
        $this->assertEquals($result, 'All Day');
    }

    public function test_ns_make_time_label_with_different_dates(): void
    {
        $result = NobleStudios\helpers\dates\nsMakeTimeLabel('2023-06-01 18:00:00', '2023-06-02 20:00:00', false);
        echo $result;
        $this->assertEquals($result, '6:00 pm - 8:00 pm daily');
    }
}
