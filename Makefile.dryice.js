#!/usr/bin/env node
// vim: noai:ts=4:sw=4

var fs   = require("fs");
var path = require("path");
var copy = require("dryice").copy;
var uglifycss = require("uglifycss");
var uglifyjs  = require("uglify-js");

if (!fs.existsSync)
    fs.existsSync = path.existsSync;
else
    path.existsSync = fs.existsSync;

function changeHTMLComments(data) {
    return (data
        .replace(/<!\-\-DEVELOPMENT[\d\D]*?DEVELOPMENT\-\->/g, "")
        .replace(/PRODUCTION\-\->|<!\-\-PRODUCTION/g, "")
    );
}

function htmlCompressor(data) {
    return (data
        .replace(/[\n\t]/g, " ")
        .replace(/ +/g, " ")
    );
}

function changeJSComments(data) {
    return (data
        .replace(/\/\/ --- DEVELOPMENT ---(\n.*)*DEVELOPMENT ---/, "")
        .replace(/\/\/ --- PRODUCTION ---/, "")
    );
}

console.log("Drying statics/ide.html into statics/ide.min.html");
copy({
    source : "statics/ide.html",
    dest   : "statics/ide.min.html",
    filter : [changeHTMLComments, htmlCompressor]
});

console.log("Drying flower-ide styles");
copy({
    source : {
        root    : "assets/css",
        include : /.*\.css$/
    },
    dest   : "assets/css-min/styles.css",
    filter : function(data) {
      return uglifycss.processString(data, { uglyComments : true });
    }
});

console.log("Drying flower-ide core into assets/js-min/ide.js");
copy({
    source : {
        root    : "assets/js",
        include : /.*\.js$/,
        exclude : /test/
    },
    dest   : "assets/js-min/ide.js",
    filter : [
        changeJSComments,
        function(data) {
            return uglifyjs.minify(data, { fromString : true }).code +
                   "require('js/main');"; // Init main.js
        }
    ]
});
