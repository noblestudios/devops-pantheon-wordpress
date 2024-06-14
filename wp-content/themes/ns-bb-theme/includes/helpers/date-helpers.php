<?php

namespace NobleStudios\helpers\dates;

/**
 * These functions are used to generate formatted dates and times.
 */

/**
 * Use to get a formatted date given the expected start and end dates.
 *
 * @param $start_date
 * @param $end_date
 * @param bool $show_year
 * @return false|string containing formatted date.
 */
function nsMakeDateLabel($start_date, $end_date, bool $show_year = true)
{
    if(is_string($start_date)) {
        $start_date = strtotime($start_date);
    }

    if(is_string($end_date)) {
        $end_date = strtotime($end_date);
    }

    if(!$start_date || !$end_date) {
        return false;
    }

    $year = null;
    $current_year = (date('Y', time()) === date('Y', $end_date));

    if($show_year && !$current_year) {
        $year = ', Y';
    }

    if(date('Y', $start_date) == date('Y', $end_date)) {
        if(date('F', $start_date) == date('F', $end_date)) {
            if(date('j', $start_date) == date('j', $end_date)) {
                //Jun 15, 2020
                return date('F j' . $year, $start_date);
            } else {
                //Jun 15 - 18, 2020
                return date('F j', $start_date) . " - " . date('j' . $year, $end_date);
            }
        } else {
            //Jun 15 - May 20, 2020
            return date('F j', $start_date) . " - " . date('F j' . $year, $end_date);
        }
    }

    return date('F j' . $year, $start_date) . " - " . date('F j' . $year, $end_date);
}

/**
 * Use to get a formatted time given the expected start and end times (plus support for all day).
 *
 * @param $start_date
 * @param $end_date
 * @param $all_day
 * @return false|string containing formatted time.
 */
function nsMakeTimeLabel($start_date, $end_date, $all_day)
{
    if($all_day) {
        return "All Day";
    }

    $start_date = strtotime($start_date);
    $end_date = strtotime($end_date);

    $multi_day = ( date('Y-m-d', $start_date) !== date('Y-m-d', $end_date) ) ? true : false;



    if(!$start_date || !$end_date) {
        return false;
    }

    //if(date('Y-m-d', $start_date) == date('Y-m-d', $end_date)) {
        //5:00 pm - 8:00 pm
        return date('g:i a', $start_date) . " - " . date('g:i a', $end_date) . ( $multi_day ? ' daily' : '' );
    //}

    //return false;
}
