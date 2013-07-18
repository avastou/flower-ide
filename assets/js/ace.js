// vim: noai:ts=4:sw=4

// "js/ace"
// Is the module that starts the ace editor, creates the document with
// all our settings and custom events.

define("js/ace", [

    // Below we import the ace libs, the list of imports is roughly
    // copied from kitchen-sink demo.

    // }v}:'<,'>s/ *,/,/g
    // :Tab / \(["']\).\{-}\\\@<!\1,\{0,1}/l0

    "require",                "exports",                   "module",
    "ace/lib/fixoldbrowsers", "ace/config",                "ace/lib/dom",
    "ace/lib/net",            "ace/lib/lang",              "ace/lib/useragent",
    "ace/lib/event",          "ace/theme/monokai",         "ace/edit_session",
    "ace/undomanager",        "ace/keyboard/hash_handler", "ace/virtual_renderer",
    "ace/editor",             "ace/multi_select",          "ace/split",
    "ace/keyboard/vim"

], function(require, exports, module) {
"use strict";

    // Init ace
    require("ace/lib/fixoldbrowsers");
    require("ace/config").init();

    var dom         = require("ace/lib/dom");
    var net         = require("ace/lib/net");
    var lang        = require("ace/lib/lang");
    var useragent   = require("ace/lib/useragent");
    var event       = require("ace/lib/event");
    var theme       = require("ace/theme/monokai");
    var EditSession = require("ace/edit_session").EditSession;
    var UndoManager = require("ace/undomanager").UndoManager;
    var HashHandler = require("ace/keyboard/hash_handler").HashHandler;
    var Renderer    = require("ace/virtual_renderer").VirtualRenderer;
    var Editor      = require("ace/editor").Editor;
    var MultiSelect = require("ace/multi_select").MultiSelect;

    exports.init = function($, main) {
        // Create Editor
        var container  = document.getElementById("editor-container");
        var editor     = new Editor(new Renderer(container, theme));
        main.ace       = exports;
        exports.editor = editor;

        var session = new EditSession("");
        var mode = main.settings.is_ruby ? "ruby" : "posxml";

        session.setUndoManager(new UndoManager());
        session.modeName = mode;
        session.setMode("ace/mode/"+mode);
        session.setUseSoftTabs(true);
        session.setTabSize(2);
        editor.setFontSize("13px");
        editor.setSession(session);

        // // Add multiple cursor support to editor
        // // Removed because the remote cursors sync of activities
        // // currently doesn't support multiple cursors per user.  //
        // require("ace/multi_select").MultiSelect(editor);

        // Goes to the last saved position when the
        // doc is fully loaded and focuses the document
        var repeatEvery   = 300; // ms
        var chances       = 10;   // chances * repeatEvery
        var linesInterval = setInterval(function() {
            if (editor.session.getLength() === 1 && chances) {
                chances--;
                return;
            }
            main.settings.base_height = main.$.cursor.height();
            main.settings.base_width  = main.$.cursor[0].style.width.replace("px","")*1;
            var cursor = main.utils.store.get("cursor") || { row : 0, col : 0 };
            editor.navigateTo(cursor.row, cursor.col);
            editor.scrollToLine(cursor.row, true, false); // to row, put in center, don't animate
            editor.focus();
            main.status.ready = true;
            clearInterval(linesInterval);
        }, repeatEvery);

        // Save the last time the user scrolled,
        // used to send the current position to the server
        // in a way new cursors can be added.
        session.addEventListener("changeScrollTop", function() {
            main.status.lastScrolled = new Date();
        });

        // On editor focus, change the editor and terminal flags.
        editor.onFocus(function(){
            main.status.terminal_is_focused = false;
            main.status.editor_is_focused   = true;
        });

        // CTRL-b to browser's pick
        // This doesn't seem to have effects on windows or linux,
        // but mac ace commands are different.
        // So mac needs this.
        // Considerations: This shows an uncaught type error, but works.
        editor.commands.addCommands([{
            name: "donotgobackwithctrlb",
            bindKey: {
                win: "Ctrl-b",
                mac: "Ctrl-b"
            }
        }]);

        // CTRL-l to browser's pick
        // Considerations: This shows an uncaught type error, but works.
        editor.commands.addCommands([{
            name: "donotwanttogotoline",
            bindKey: {
                win: "Ctrl-l",
                mac: "Ctrl-l"
            }
        }]);

        // CTRL-m to open or close the terminal
        editor.commands.addCommands([{
            name: "toggleterminal",
            bindKey: {
                win: "Ctrl-m",
                mac: "Ctrl-m"
            },
            exec: function() {
                if (main.status.terminal_is_open) {
                    main.$.hide_output.click();
                    editor.focus();
                } else {
                    main.$.show_output.click();
                    editor.blur();
                    main.terminal.focus();
                }
            }
        }]);

        // CTRL-h to fold the current fold
        editor.commands.addCommands([{
            name: "foldcurrent",
            bindKey: {
                win: "Ctrl-h",
                mac: "Ctrl-h"
            },
            exec: function() {
                var cursor  = editor.selection.getCursor();
                var widgets = editor.session.foldWidgets;
                var i = cursor.row;
                var start, fold;
                while(widgets[i] === "") { i--; }
                start = i;
                if (main.utils.store.get("FOLDS"+i)) {
                    editor.session.unfold(i);
                    // To keep the content of the fold in screen
                    // editor.scrollToLine(cursor.row, false, false);
                    main.utils.store.del("FOLDS"+i);
                    return;
                }
                fold = editor.session.getFoldWidgetRange(start);
                if (fold) {
                    // From ace/lib/ace/edit_session/folding.js:633
                    editor.session.addFold("...", fold);
                }
                main.utils.store.set("FOLDS"+i, true);
            }
        }]);

        // CTRL-j to fold and unfold everything
        editor.commands.addCommands([{
            name: "foldall",
            bindKey: {
                win: "Ctrl-j",
                mac: "Ctrl-j"
            },
            exec: function(editor) {
                var name = "FOLDS.all";
                if (main.utils.store.get(name)) {
                    editor.session.unfold();
                    main.utils.store.del(name);
                } else {
                    editor.session.foldAll();
                    main.utils.store.set(name, true);
                }
            }
        }]);

        return exports;
    };

});
