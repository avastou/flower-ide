// vim: noai:ts=4:sw=4

// "js/utils"
// This function creates the general use functions that are used and shared
// among the other submodules.

define("js/utils", [

    // }v}:'<,'>s/ *,/,/g
    // :Tab / \(["']\).\{-}\\\@<!\1,\{0,1}/l0

    "require",  "exports", "module",
    "js/events"

], function(require, exports, module) {
"use strict";

    var main;

    // Local Storage wrapper.
    // main.utils.store.get('key')
    // main.utils.store.set('key', val)
    // main.utils.store.del('key')
    var store = (function() {
        var localStorage = window.localStorage || {};
        function get(key) {
            try {
                return JSON.parse(localStorage[key]);
            } catch(e) {
                return;
            }
        }
        function set(key, val) {
            if (val) {
                localStorage[key] = JSON.stringify(val);
                return;
            }
        }
        function del(key) {
            delete localStorage[key];
        }
        return {
            get : get,
            set : set,
            del : del
        };
    })();

    // Get the user's scroll position
    function getScrollTop() {
        if (!main.ace.editor) return 0;
        var scroll = main.ace.editor.session.$scrollTop;
        scroll = Math.floor(scroll/main.settings.base_height) * main.settings.base_height; // base_height comes from $(".ace_cursor")
        return scroll;
    }

    // Generates random pastel colors for 118 users, before repeating.
    var generated_colors = {};
    var total_colors     = 0;
    var hue_low          = 90;
    var hue_substraction = 0;
    var golden_substract = 7.6388; // 137.5 deg of twenty.
    var restart          = false;
    function newColor(){
        if (total_colors && total_colors === 59) {
            if (restart) {
                generated_colors = {};
                hue_low          = 90;
                hue_substraction = 0;
                restart          = false;
            } else {
                hue_low -= hue_substraction;
                restart = true;
            }
            total_colors = 0;
        }
        hue_substraction    = hue_low - golden_substract * Math.floor(total_colors / 5);
        var pastel_hue_low  = hue_substraction;
        var pastel_hue_high = 196;
        var pastel_hue_int  = Math.floor(Math.random()*6) + 1;  // 6 possible pastle colors
        var pastel_hue_byte = pastel_hue_int.toString(2);       // Converted to byte: 001, 010, 011, 100, 101, 110
        var color = "";
        if (pastel_hue_byte.length === 2) {
            pastel_hue_byte = "0" + pastel_hue_byte;
        }
        if (pastel_hue_byte.length === 1) {
            pastel_hue_byte = "00" + pastel_hue_byte;
        }
        for (var i = 0; i < 3; i++) {
            if (pastel_hue_byte[i] === "0") {
                color += pastel_hue_low;
            } else {
                color += pastel_hue_high;
            }
            if (i != 2) {
                color += ",";
            }
        }
        if (generated_colors[color]) {
            return newColor(); // Continue checking...
        }
        generated_colors[color] = true;
        total_colors++;
        return {
            "border-left" : "2px solid rgb("+color+")",
            "background"  : "rgba("+color+",.2)"
        };
    }

    exports.setTo = function(_main) {
        main      = _main;

        main.utils = {};

        main.utils.store        = store;
        main.utils.getScrollTop = getScrollTop;
        main.utils.newColor     = newColor;

        require("js/events").init($, main);
    };

});
