// vim: noai:ts=4:sw=4

// "js/modal"
// It wraps the functionality of the keybindings modal.

define("js/modal", function(require, exports, module) {
"use strict";

    var main;

    function showModal(e) {
        e.preventDefault();
        main.$.helpKeysModal.removeClass("hide");
        setTimeout(function(){
            main.$.helpKeysModal.addClass("in");
        }, 100);
    }

    function hideModal(e) {
        e.preventDefault();
        main.$.helpKeysModal.attr("class", "modal fade");
        setTimeout(function(){
            main.$.helpKeysModal.addClass("hide");
        }, 1000);
    }

    exports.init = function($, _main) {
        main     = _main;

        main.$.helpKeysClick = $("#help-keys-click");
        main.$.helpKeysModal = $("#help-keys-modal");
        main.$.helpKeysClose = main.$.helpKeysModal.find(".close");

        main.$.helpKeysClick.click(showModal);
        main.$.helpKeysClose.click(hideModal);
    };

});
