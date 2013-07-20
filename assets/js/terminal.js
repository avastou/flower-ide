// vim: noai:ts=4:sw=4

// "js/terminal"
// It creates the jQuery terminal and operates according to our settings.
// In the terminal there are two commands created:
// -   compile: Excecutes the compilation.
// -   clear:   Clears the output.

define("js/terminal", function(require, exports, module) {
"use strict";

    var main;

    function enable(e) {
        main.terminal.enable();
    }

    function openTerminal(e) {
        e.preventDefault();
        if (main.status.terminal_is_created) {
            if (!main.status.terminal_is_open) {
                // Open
                main.status.terminal_is_open = true;
                if (!main.status.wait) {
                    main.ace.editor.blur();
                    main.terminal.focus();
                }
                main.$.show_output.toggle(function(){
                    main.$.terminal_container.animate({height:main.settings.terminal_height}, 500, function(){
                        main.$.editor_container.css("bottom", main.settings.terminal_height);
                        main.$.hide_output.show();
                        main.$.window.resize();
                    });
                });
            }
            return;
        }
        main.status.terminal_is_created = true;
        main.terminal = main.$.terminal_element.terminal("/json", {
            greetings : main.settings.terminal_greetings,
            name      : main.settings.terminal_name,
            height    : main.settings.terminal_height,
            prompt    : main.settings.terminal_prompt,
            onInit    : function(term) {
                // Handling custom keydown events
                var keydown = this.keydown;
                this.keydown = function(e, term) {
                    return main.utils.catchCtrls(e, term) && keydown(e, term);
                };
                var onFocus = this.onFocus;
                this.onFocus = function(term) {
                    main.status.terminal_is_focused = true;
                    main.status.editor_is_focused = false;
                    return onFocus(term);
                };
                main.status.terminal_is_open = true;
                if (!main.status.wait) {
                    term.focus();
                }
                main.$.show_output.toggle(function(){
                    main.$.terminal_container.animate({height:main.settings.terminal_height}, 500, function(){
                        main.$.terminal_element.css("height", main.settings.terminal_height - 20);
                        main.$.editor_container.css("bottom", main.settings.terminal_height);
                        main.$.hide_output.show();
                        main.$.window.resize();
                    });
                });
            }
        });
    }

    function closeTerminal(e) {
        e.preventDefault();
        if (!main.status.terminal_is_created) return;
        if (!main.status.terminal_is_open) return;
        main.status.terminal_is_open = false;
        main.$.editor_container.css("bottom", 0);
        main.$.window.resize();
        main.$.terminal_container.animate({height:0}, 500, function(){
            main.$.show_output.toggle();
            main.$.hide_output.hide();
        });
    }

    exports.init = function($, _main) {
        main     = _main;

        main.$.terminal_container = $("#terminal-container");
        main.$.terminal_element   = main.$.terminal_container.find(".terminal-element");

        main.$.terminal_element.click(enable);
        main.$.show_output.click(openTerminal);
        main.$.hide_output.click(closeTerminal);
    };

});
