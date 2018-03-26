$(document).ready(function() {
    function __copyToClipboard (text) {
        if(text.indexOf('-') !== -1) {
            let arr = text.split('-');
            text = arr[0] + arr[1];
        }
        var textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? '成功复制到剪贴板\n(' + text + ")" : '该浏览器不支持点击复制到剪贴板';
            alert(msg);
        } catch (err) {
            alert('该浏览器不支持点击复制到剪贴板');
        }

        document.body.removeChild(textArea);
    }
    var page = new Vue({
        el: "#roll-history",
        data: {
            rolls: null,
        },
        methods: {
            copy: function(event) {
                var rk = $(event.currentTarget).attr("rk");
                var roll = this.rolls[rk];
                var text = "【" + roll.who + "】 ";
                text += roll.what + ": ";
                if (roll.dice == 100) {
                    text += roll.result + "/" + roll.skill;
                } else {
                    text += "1d" + roll.dice + " = " + roll.result;
                }
                text += "    " + roll.comment;
                // alert(text);
                __copyToClipboard(text);
            },
        },
    });

    var reload_data = function() {
        __request("api.roll.history", {}, function(res) {
            console.debug(res);
            for (var k in res.data) {
                res.data[k].comment = res.data[k].result;
                res.data[k].level = 0;

                if (res.data[k].dice == 100) {
                    var skill = res.data[k].skill;
                    var result = res.data[k].result;
                    if (result > 95) {
                        res.data[k].comment = "大失败";
                        res.data[k].level = -1;
                    } else if (result < 6) {
                        res.data[k].comment = "大成功";
                        res.data[k].level = 1;
                    } else {
                        if (result > skill) {
                            res.data[k].comment = "失败";
                            res.data[k].level = -2;
                        } else if (result > skill / 2) {
                            res.data[k].comment = "普通成功";
                            res.data[k].level = 2;
                        } else if (result > skill / 5) {
                            res.data[k].comment = "困难成功";
                            res.data[k].level = 3;
                        } else {
                            res.data[k].comment = "极难成功";
                            res.data[k].level = 4;
                        }
                    }
                } else {
                    res.data[k].skill = '-';
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


