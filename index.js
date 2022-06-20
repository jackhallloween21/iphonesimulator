// Created by reda redox

document.createElement("application");
window.onload = function(){
    window.detectingSecondClick = false;
    window.siri_active = true;
    window.atHome = true;
    window.game = {
        cookies : 0
    };
    window.ctrl = Date.now();
    window.ctrl_ = Date.now();
    window.recentAppsScreen = false;
    window.apps = {
        'safari' : "browser",
        'calc' : "calculator",
        'sett' : "settings",
        'phone' : "dialer",
        'game' : "cookie_clicker",
        'social' : "griderly",
        'calendar' : "cal_app",
        'weather' : "weather_app"
    };
        var d = new Date();
        var days = {
            0 : "Sunday",
            1 : "Monday",
            2 : "Tuesday",
            3 : "Wednesday",
            4 : "Thursday",
            5 : "Friday",
            6 : "Saturday"
        };
        var day = d.getDay();
        day = days[day];
    $("#calendar").html("<div style='text-align: center;margin: 0;padding: 0;'><span style='color: red; font-size: 5pt;margin: 0;display: block'>" + day + "</span><span style='font-family: \"Montserrat\";font-size: 20pt !important;color: #333;margin: 0;font-weight: lighter;'>" + d.getDate() + "</span></div>");
    window.getTime = function(){
        var time = "";
        var med = "";
        var d = new Date();
        var m = d.getMinutes();
        var h = d.getHours();
        if(h > 12){
            h -= 12;
            med = "PM";
        } else {
            med = "AM";
        }
        if(h === 0){
            h = 12;
            med = 'AM';
        }
        time += h;
        if(m <= 9){
            m = "0" + m;
        } else {}
        time += ":" + m + " " + med;
        return time;
    };
    window.goHome = function(){
        window.atHome = true;
        $.each($("application"), function(){
            $(this).hide();
        });
        $(".home").show();
    };
    window.goHome();
    window.end = function(appName){
        $("#" + appName).hide();
    };
    window.start = function(appName){
        $.each($("application"), function(){
            $(this).hide();
        });
        $("#" + appName).show();
    };
    
    $("#ctrl").on("touchstart mousedown", function(e){
        e.preventDefault();
        window.ctrl_ = Date.now();
        $(this).css("background", "linear-gradient(65deg, #333, #555, #333)");
    });
    $("#ctrl").on("touchend mouseup", function(e){
        e.preventDefault();
        $(this).css("background", "linear-gradient(45deg, #333, #555, #333)");
        if((Date.now() - window.ctrl_) >= 750){
            if(window.siri_active === true){
                window.start("siri");
            }
            else {
                window.start('brokenSiri');
            }
        }
        else if((Date.now() - window.ctrl) <= 250){
            // Double Clicked
            window.recentAppsScreen = true;
            window.start("recentApps");
            $(".home").css({
                "height" : "80%",
                "width" : "80%",
                "display" : "inline-block"
            }).appendTo("#currentRecent");
        }
        else {
            if(window.recentAppsScreen === false){
                $(".home").css({
                    "height" : "100%",
                    "width" : "100%",
                    "display" : "inline-block"
                }).appendTo("#screen");
                window.goHome();
            }
            else {
                // Single clicked
                window.recentAppsScreen = false;
                $(".home").css({
                    "height" : "100%",
                    "width" : "100%",
                    "display" : "inline-block"
                }).appendTo("#screen");
                window.goHome();
            }
        }
        window.ctrl = Date.now();
    });
    $(".appIcon").on("touchend click", function(){
        if(window.recentAppsScreen === false){
            window.atHome = false;
            var which = $(this).attr("id");
            window.start(window.apps[which]);
        }
    });
    $("#screen").on("touchstart click", function(e){
        if(window.recentAppsScreen === true){
            e.preventDefault();
            e.stopPropagation();
            window.recentAppsScreen = false;
                $(".home").css({
                    "height" : "100%",
                    "width" : "100%",
                    "display" : "inline-block"
                }).appendTo("#screen");
                window.goHome();
        } else {}
    });
    $(".calcCtrl, .lightCalc, .orangeCalc").on("touchstart click", function(e){
        e.preventDefault();
        var which = $(this).text();
        switch(which){
            case "AC":
                $("#calc_scn").html("");
                break;
            case "+/-":
                var currentVal = $("#calc_scn").text();
                currentVal = currentVal.split("");
                if(currentVal[currentVal.length - 1] == "-"){
                    currentVal[currentVal.length - 1] = "";
                    currentVal = currentVal.join("");
                    $("#calc_scn").text(currentVal);
                }
                else {
                    $("#calc_scn").append("-");
                }
                break;
            case "=":
                var equation = $("#calc_scn").text();
                equation = equation.replace(/\×/g, "*");
                equation = equation.replace(/\÷/g, "/");
                $("#calc_scn").text(eval(equation));
                break;
            default:
                $("#calc_scn").append(which);
                break;
        }
    });
    $("#cookie").on("touchstart mousedown", function(e){
        e.preventDefault();
        $(this).css({
            "height" : "47vw",
            "width" : "47vw"
        });
    });
    $("#cookie").on("touchend mouseup", function(e){
        e.preventDefault();
        $(this).css({
            "height" : "50vw",
            "width" : "50vw"
        });
        window.game.cookies += 1;
        $("#cookies").text(window.game.cookies + " Cookies");
    });
    $(".dialerBtn").on("touchstart mouseup", function(e){
        e.preventDefault();
        $("#dialer_scn").append($(this).text());
        $("#callBtn").attr("href", "tel:" + $("#dialer_scn").text());
    });
    $("input[type=checkbox]").on('click', function(){
        window[$(this).attr('id')] = $(this).is(":checked");
    });
    $("#recentApps").on("touchstart mouseup", function(e){
        e.stopPropagation();
    });
    setInterval(function(){
        $("#topBarClock").text(window.getTime());
    }, 1000);
    // Set Calendar
    function cal() {
        var calBox = document.querySelector("#cal");
        var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date();
        var maxDays = 31;
        var month = date.getMonth();
        if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
            maxDays = 31;
        } else if (month == 1) {
            maxDays = 28;
        } else if (month == 3 || month == 5 || month == 8 || month == 10) {
            maxDays = 30;
        }
        var day = days[date.getDay()];
        // Day of Week ^
        var dateNum = date.getDate();
        // Day of Month ^
        // Calculate first day of month
        date.setDate(1)
        var dateX = date.getDay();
        date.setDate(dateNum)
        var i = dateX;
        while (dateX > 0) {
            if ((dateX % 6) >= 1) {
                dateX -= 6;
            } else {
                i -= dateX
                dateX -= dateX;
            }
        }
        i += 8;
        $(".day").eq(0).html(months[month] + " <span style='font-family: \"Montserrat\", sans-serif;'>" + new Date().getFullYear() + "</span>").css({
            "font-size" : "15pt",
            "texy-align" : "left"
        });
        $(".day").eq(i).text("1").css("border-bottom", "solid 1px #DDD");
        var cnt = 1;
        while (cnt <= maxDays) {
            $(".day").eq(i).text(" " + cnt + " ").css("border-bottom", "solid 1px #DDD");
            ++cnt;
            ++i;
        }
        $(".day:contains(' " + dateNum + " ')").css({
            "background": "#F33",
            "border-radius" : "50%",
            "color" : "#FFF"
        });
    }
    cal();
    $("#searchbar").on("keyup", function(e){
        e.preventDefault();
        if(e.which == 13){
            $("#browse").remove();
            var browse = $("<embed>")
                .css({
                    "width" : "75vw",
                    "height" : "65vh",
                    "margin" : "0",
                    "overflow" : "auto"
                })
        var value = $(this).val();
        $(this).trigger("blur");
        if(value.match(/\./)){
            $(browse).attr("src", value);
            var text = value.replace(/http:\/\/|https:\/\//g, "");
            text = value.split("/")[0];
            $("#searchbar").text(text);
        }
        else {
            $(browse).attr("src", "https://bing.com/search?q=" + value);
        }
        $("#browser").append(browse)
        } else {}
    });
};
