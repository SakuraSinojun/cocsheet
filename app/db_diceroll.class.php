<?php

include_once(dirname(__FILE__) . "/../config.php");

class db_diceroll extends database_table {
    private static $instance = null;
    public static function inst() {
        if (self::$instance == null)
            self::$instance = new db_diceroll();
        return self::$instance;
    }

    private function db_diceroll() {
        parent::__construct(MYSQL_DATABASE, MYSQL_PREFIX . "diceroll");
    }

    public function all() {
        return $this->get_all("", "ORDER BY id DESC");
    }

    public function add($who, $what, $skill, $face, $result) {
        $now = date("Y/m/d H:i:s");
        return $this->insert(array("who" => $who, "what" => $what, "skill" => $skill, "dice" => $face, "result" => $result, "date" => $now));
    }
};


