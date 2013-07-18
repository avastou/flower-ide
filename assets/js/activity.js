// vim: noai:ts=4:sw=4

// "js/activity"
// Creates an interval of requests to the server that sends the current
// user's activity, and receives all the other users activities.

// I've thought on using long-polling, but we use normal polling to
// notice if the current user is active.

define("js/activity", function(require, exports, module) {
"use strict";

    var main;

    var maxTimeScrolled = 500;

    // The colors variable is filled with the newColor function in
    // "js/utils"
    var colors = {};

    var $cursors      = {};
    var data_users    = {};
    var last_activity = {};
    var current_user  = {};

    var ajax_object   = {
        type    : "POST",
        url     : "/activity",
        data    : {},
        timeout : 3000,
        success : success,
        error   : error
    };

    // On AJAX success, loop through the received users and create,
    // reposition, hide and/or delete their cursors.
    // Cursors are hidden if the user is scrolling.
    // We also update the number of active users in the top bar.
    function success(data) {
        // console.log(data);
        current_user = data.current;
        // Show position
        for (var k in data.users) {
            data_users[k] = data.users[k];
            // console.log(data_users[k].cursor, $cursors[k], colors[k]);
            if (k !== current_user.index && data.users[k].active && data.users[k].cursor) {
                // console.log(k, data.users[k]);
                if (!$cursors[k]) {
                    $cursors[k] = main.$.remote_cursor.clone();
                    $cursors[k].appendTo(main.$.cursor.parent());
                    $cursors[k].attr("style", main.$.cursor.attr("style"));
                    colors[k] = main.utils.newColor();
                }
                var cursor = data.users[k].cursor;
                // console.log(cursor);
                // lastScrolled is updated on "js/ace.js" on event "changeScrollTop"
                if (!main.status.lastScrolled || ((new Date()) - main.status.lastScrolled) > maxTimeScrolled) {
                    var scroll_top = main.utils.getScrollTop();
                    $cursors[k].css("left", (cursor.left*main.settings.base_width) + main.settings.base_left); // +4 because ace
                    $cursors[k].css("top", (cursor.top*main.settings.base_height) + 1*cursor.scroll_top - scroll_top);
                    $cursors[k].show();
                } else {
                    $cursors[k].hide();
                }
                $cursors[k].css(colors[k]);
            } else {
                if ($cursors[k]) $cursors[k].hide();
            }
        }

        // Delete old cursors
        for (k in data_users) {
            if (!data.users[k]) {
                if ($cursors[k]) $cursors[k].remove();
                delete data.users[k];
                delete colors[k];
            }
        }

        main.status.pinging = false;

        if (data.active !== last_activity.active) {
            main.$.number_of_users.html(data.active);
        }

        last_activity = data;

        if (main.status.connected) return;

        main.$.connection_error.hide();
        main.$.connection_success.show();

        setTimeout(function(){
            main.$.connection_success.fadeOut(300);
            main.status.connected = true;
        }, 3000);
    }

    // On AJAX error, show the connection error element.
    function error(err) {
        // console.log(err);
        main.status.pinging = false;
        if (!main.status.connected) return;
        main.status.connected = false;
        main.$.connection_error.fadeIn(300);
    }

    // The activityInterval first checks if the user have stopped
    // scrolling, if so, it show the cursors.
    // It also prepares the current user's position and send it with
    // $.ajax(ajax_object)
    function activityInterval() {
        if (!main.status.ready) return;

        if (main.status.lastScrolled && ((new Date()) - main.status.lastScrolled) > maxTimeScrolled) {
            for (var i = 0; i < $cursors.length; i++) {
                if ($cursors[k]) $cursors[k].show();
            }
            main.status.lastScrolled = null;
        }

        if (main.status.pinging) return;
        main.status.pinging = true;

        // This was commented because it resulted more effective to keep
        // a default value
        // main.settings.base_width  = main.$.cursor.width();
        // I moved this to "js/ace.js"
        // main.settings.base_height = main.$.cursor.height();

        var left = main.$.cursor[0].style.left;
        left = left.substr(0, left.length - 2);
        var top = main.$.cursor[0].style.top;
        top = top.substr(0, top.length - 2);

        current_user.cursor = {
            left       : Math.floor(left/main.settings.base_width),
            top        : Math.floor(top/main.settings.base_height),
            scroll_top : main.utils.getScrollTop()
        };

        var cursor = main.ace.editor.getCursorPosition();

        main.utils.store.set("cursor", {
            row : cursor.row,
            col : cursor.column
        });

        ajax_object.data.user = current_user;
        $.ajax(ajax_object);
    }

    // On init, get the document elements we care and start the
    // activityInterval.
    exports.init = function($, _main) {
        main     = _main;

        main.$.number_of_users    = $("#users .number-of-users");
        main.$.connection_error   = $("#connection-error");
        main.$.connection_success = $("#connection-success");
        main.$.cursor             = $(".ace_cursor");
        main.$.remote_cursor      = $(".remote_cursor");

        // This was commented because it resulted more effective to keep
        // a default value
        // main.settings.base_width  = main.$.cursor.width();
        // I moved this to "js/ace.js"
        // main.settings.base_height = main.$.cursor.height();

        ajax_object.data.docname = main.settings.docname;

        setInterval(activityInterval, 500);
    };

});
