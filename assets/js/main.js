// vim: noai:ts=4:sw=4

// "js/main"
// Is the main javascript of the Flower IDE project,
// it defines the core variables and orchest the initial sequence of
// imports.

define("js/main", [

    // }v}:'<,'>s/ *,/,/g
    // :Tab / \(["']\).\{-}\\\@<!\1,\{0,1}/l0

    "require",  "exports",     "module",
    "js/ace",   "js/activity", "js/compiler",
    "js/modal", "js/terminal", "js/utils"

], function(require, exports, module) {
"use strict";

    // Main object
    // This is where all the shared variables from all the submodules will
    // be stored.
    // There are two default variables instanced here:
    // -   main.settings:
    //     Stores all the settings, some of them are defined down this
    //     code.
    // -   main.status:
    //     Holds all the status variables used by submodules.
    var main      = {};
    main.settings = {};
    main.status   = {};

    // global variables
    // referenced from the window object, to avoid them to be replaced by
    // third party scripts
    var sharejs  = window.sharejs;
    var $        = window.jQuery;
    var pathname = window.location.pathname || "";

    // URL Variables for the IDE
    // stored in the settings.
    // access_token and app_id are parsed from the query string
    // below.
    main.settings.docname      = pathname.substr(1);
    main.settings.access_token = undefined;
    main.settings.app_id       = undefined;

    var HTTP_QUERY = window.location.href.split("?")[1];
    if (HTTP_QUERY) {
        HTTP_QUERY                 = HTTP_QUERY.split("&");
        main.settings.access_token = HTTP_QUERY[0].split("=")[1];
        main.settings.app_id       = HTTP_QUERY[1].split("=")[1];
    }

    // The is_ruby setting is used to check if the docname ends in `.rb`
    // If so, it will later change the doc language to ruby.
    //main.settings.is_ruby = main.settings.docname.substr(main.settings.docname.length - 3, 3) === ".rb";
	main.settings.is_ruby = true;

    // General Settings
    // -   terminal_height:    The height of the terminal panel once it is opened.
    // -   terminal_greetings: The greetings that appear first in the terminal.
    // -   terminal_name:      The name of the terminal (used in case we have many).
    // -   terminal_prompt:    The unix-like prompt of the terminal.
    // -   base_height:        Used in the activity, is the base height of lines, for the cursor.
    // -   base_width:         Used in the activity, is the base height of lines, for the cursor.
    // -   base_left:          Used in the activity, is the base height of lines, for the cursor.
    main.settings.terminal_height    = 150;
    main.settings.terminal_greetings = "Welcome to Flower IDE!\n";
    main.settings.terminal_name      = "omg";
    main.settings.terminal_prompt    = "[[b;#0AF;]flower]$ ";
    main.settings.base_height        = 0;
    main.settings.base_width         = 8;
    main.settings.base_left          = 4;

    // Status variables:
    // Flags to check if the system is in a given status
    main.status.editor_is_focused   = false;
    main.status.connected           = false;
    main.status.pinging             = false;
    main.status.ready               = false;
    main.status.terminal_is_command = false;
    main.status.terminal_is_created = false;
    main.status.terminal_is_focused = false;
    main.status.terminal_is_open    = false;
    main.status.wait                = false;
    main.status.lastScrolled        = new Date();

    // jQuery Elements
    main.$                  = {};
    main.$.window           = $(window);
    main.$.show_output      = $("#show-output");
    main.$.hide_output      = $("#hide-output");
    main.$.editor_container = $("#editor-container");
    main.$.show_output      = $("#show-output");
    main.$.hide_output      = $("#hide-output");

    // Loading submodules
    require("js/utils").setTo(main);
    require("js/modal").init($, main);
    require("js/terminal").init($, main);
    require("js/compiler").init($, main);
    require("js/ace").init($, main);
    require("js/activity").init($, main);

    // Initializing ShareJS
    if (!(main.settings.docname && sharejs)) return;
    sharejs.open(main.settings.docname, "text", "http://" + window.location.host + "/channel", function(error, doc) {
        doc.attach_ace(main.ace.editor);
    });

    // --- DEVELOPMENT ---
    // This lines will be deleted in the minified version.
    window.main = main;
    // Test here, maybe? Or require("js/tests")?
    // --- DEVELOPMENT ---
    // --- PRODUCTION ---
    // window.main = main;
    // --- PRODUCTION ---
});
