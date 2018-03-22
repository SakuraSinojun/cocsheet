<?php
include_once(dirname(__FILE__) . "/../config.php");
include_once(dirname(__FILE__) . "/../app/db_diceroll.php");

class index_controller {

    public function index_action() {
        $tpl = new tpl("header", "footer");
        $tpl->display("index");
    }

    public function roll_action() {
        $tpl = new tpl("header", "footer");
        $tpl->display("roll");
    }
}













