// vim: noai:ts=4:sw=4

// "js/compiler"
// Binds the buttons that compile the code and creates the funtions to
// send the code and receive the information in the terminal output.

define("js/compiler", function(require, exports, module) {
"use strict";

    var main;

    // When the compile button is clicked, this function is executed.
    // It prepares the request to the /compile URI and sends the response
    // to the terminal, according to the IDE statuses.
    function compile(e){
        e.preventDefault();
        if (main.status.wait) {
            return;
        }
        var disabled = "disabled";
        main.$.compile.addClass(disabled);
        main.status.wait = true;
        if (!main.status.terminal_is_open) {
            main.$.show_output.click();
        }
        if (main.status.terminal_is_created) {
            main.terminal.echo("Please Wait...");
            main.terminal.disable();
        }
        main.ace.editor.getSession().clearAnnotations();
        $.get("/compile", {
            docname      : main.settings.docname,
            access_token : main.settings.access_token,
            app_id       : main.settings.app_id
        }, function(data){
            // console.log(data);
            if (typeof data === "string") {
                try {
                    data = JSON.parse(data);
                } catch(e) {
                    main.terminal.error(""+e);
                }
            }
            if (typeof data === "object") {
                // Let's display first the result
                if (data.posxml) {
                    for (var k in data.posxml) {
                        main.terminal.echo("[[;#6F6;]"+k+":] "+data.posxml[k]);
                    }
                }
                if (data.err) {
                    if (data.err.line) {
                        main.ace.editor.getSession().setAnnotations([{
                            row    : data.err.line - 1,
                            column : data.err.position - 1,
                            text   : data.err.message,
                            type   : "error" // also warning and information
                        }]);
                    }
                    main.terminal.error(data.err.message);
                } else
                if (data.message) {
                    main.terminal.echo(data.message);
                } else {
                    main.terminal.error("Something went wrong!");
                }
            } else {
                main.terminal.error("Something went wrong!");
            }
            main.$.compile.removeClass(disabled);
            main.status.wait = false;
            if (main.status.terminal_is_command) {
                main.status.terminal_is_command = false;
                main.ace.editor.blur();
                main.terminal.focus();
            } else {
                main.ace.editor.focus();
            }
        }).error(function() {
            main.terminal.error("Something went wrong!");
            main.$.compile.removeClass(disabled);
            main.status.wait = false;
            if (main.status.terminal_is_command) {
                main.status.terminal_is_command = false;
                main.ace.editor.blur();
                main.terminal.focus();
            } else {
                main.ace.editor.focus();
            }
        });
    }

    exports.init = function($, _main) {
        main     = _main;

        // Compile button
        main.$.compile = $(".walkcompiler-compile .btn");
        main.$.compile.click(compile);
    };

});
