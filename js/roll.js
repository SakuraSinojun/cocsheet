$(document).ready(function() {
    var page = new Vue({
        el: "#roll-history",
        data: {
            rolls: null,
        },
        methods: {
        },
    });

    var reload_data = function() {
        __request("api.roll.history", {}, function(res) {
            console.debug(res);
            for (var k in res.data) {
                res.data[k].comment = res.data[k].result;
                if (res.data[k].dice == 100) {
                    var skill = res.data[k].skill;
                    var result = res.data[k].result;
                    if (result > 95) {
                        res.data[k].comment = "大失败";
                    } else if (result < 5) {
                        res.data[k].comment = "大成功";
                    } else {
                        if (result > skill) {
                            res.data[k].comment = "失败";
                        } else if (result > skill / 2) {
                            res.data[k].comment = "普通成功";
                        } else if (result > skill / 5) {
                            res.data[k].comment = "困难成功";
                        } else {
                            res.data[k].comment = "极难成功";
                        }
                    }
                }
            }
            page.rolls = res.data;
        });
    }
    reload_data();


    $(".btn-roll").click(function() {
        var who = $("#who").val();
        var what = $("#what").val();
        var skill = $("#skill").val();
        var val = $(this).attr("val");

        if (who == "" || what == "") {
            alert("填完");
            return;
        }
        if (val == 100) {
            if (skill == "") {
                alert("填完");
                return;
            }
        } else {
            skill = 0;
        }

        __request("api.roll.roll", {
            who: who,
            what: what,
            skill: skill,
            face: val
        }, function(res) {
            console.debug(res);
            window.location.reload();
        });
    });
});


