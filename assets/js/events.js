// vim: noai:ts=4:sw=4

// "js/events"
// This submodule handles the Flower IDE custom events that
// work outside the editor and over all the application.
//
// The handled events are:
// -   Ctrl+b: Compile the code.
// -   Ctrl+m: Toggle the terminal.
//
// The other events are defined in "js/ace" because they work only in the
// editor.

define("js/events", function(require, exports, module) {
"use strict";

    var main;

    var catchCtrlKeys = [
        2,  // Ctrl+b in the chromebook
        66, // Ctrl+b
        77  // Ctrl+m
    ];

    function catchCtrls(e) {
        if (!e.ctrlKey || !~catchCtrlKeys.indexOf(e.which)) {
            return true;
        }
        e.preventDefault();
        switch (e.which) {
        case 2:
        case 66:
            if (main.status.terminal_is_focused) {
                main.status.terminal_is_command = true;
                main.ace.editor.blur();
                main.terminal.focus();
            }
            if (main.status.editor_is_focused) {
                main.ace.editor.focus();
            }
            main.$.compile.click();
            break;
        case 77:
            if (main.status.terminal_is_open) {
                main.$.hide_output.click();
                main.ace.editor.focus();
            } else {
                main.$.show_output.click();
                main.ace.editor.blur();
                main.terminal.focus();
            }
            break;
        }
        return false;
    }

    exports.init = function($, _main) {
        main     = _main;
        main.$.window.keydown(catchCtrls);
        main.utils.catchCtrls = catchCtrls;
    };

});
