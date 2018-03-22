<?php
include_once(dirname(__FILE__) . "/v1_base.php");
include_once(dirname(__FILE__) . "/../../config.php");
include_once(dirname(__FILE__) . "/../../app/db_diceroll.class.php");

class roll_controller extends v1_base {

    public function history_action() {
        $all = db_diceroll::inst()->all();
        $all = array_values($all);
        return array("op" => "history", "data" => $all);
    }

    public function roll_action() {
        $who = get_request_assert("who");
        $what = get_request_assert("what");
        $skill = get_request_assert("skill");
        $face = get_request_assert("face");

        $result = rand(1, $face);

        db_diceroll::inst()->add($who, $what, $skill, $face, $result);

        return array("op" => "dice", "data" => $result);
    }
}













