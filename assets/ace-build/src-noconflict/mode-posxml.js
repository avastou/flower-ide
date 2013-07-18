/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, PlanoBe.com.br
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of PlanoBe.com.br nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL PLANOBE.COM.BR BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

ace.define('ace/mode/posxml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/tokenizer', 'ace/mode/posxml_highlight_rules', 'ace/mode/behaviour/posxml', 'ace/mode/folding/posxml'], function(require, exports, module) {


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var PosXmlHighlightRules = require("./posxml_highlight_rules").PosXmlHighlightRules;
var PosXmlBehaviour = require("./behaviour/posxml").PosXmlBehaviour;
var PosXmlFoldMode = require("./folding/posxml").FoldMode;

var Mode = function() {
    var highlighter = new PosXmlHighlightRules();
    this.$tokenizer = new Tokenizer(highlighter.getRules());
    this.$keywordList = highlighter.$keywordList;
    this.keywordsWrappers = highlighter.keywordsWrappers;
    this.$behaviour = new PosXmlBehaviour();
    this.foldingRules = new PosXmlFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {

    this.getNextLineIndent = function(state, line, tab) {
        return this.$getIndent(line);
    };

}).call(Mode.prototype);

exports.Mode = Mode;
});

ace.define('ace/mode/posxml_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/xml_util', 'ace/mode/text_highlight_rules'], function(require, exports, module) {


    var oop = require("../lib/oop");
    var xmlUtil = require("./xml_util");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var PosXmlHighlightRules = function() {
        var keywords = (
            "display|"+
            "cleandisplay|"+
            "if|"+
            "function|"+
            "inputinteger|"+
            "inputoption|"+
            "inputmoney|"+
            "inputformat|"+
            "print|"+
            "printbig|"+
            "paperfeed|"+
            "inputfloat|"+
            "preconnect|"+
            "shutdownmodem|"+
            "getcardvariable|"+
            "waitkey|"+
            "wait|"+
            "callfunction|"+
            "integervariable|"+
            "stringvariable|"+
            "substring|"+
            "stringtoint|"+
            "inttostring|"+
            "string.getvaluebykey|"+
            "menu|"+
            "menuwithheader|"+
            "readfile|"+
            "editfile|"+
            "integeroperator|"+
            "adjustdatetime|"+
            "getdatetime|"+
            "checkpaperout|"+
            "mathematicaloperation|"+
            "joinstring|"+
            "deletefile|"+
            "printbarcode|"+
            "waitkeytimeout|"+
            "execute|"+
            "while|"+
            "break|"+
            "openserialport|"+
            "readserialport|"+
            "writeserialport|"+
            "closeserialport|"+
            "string.length|"+
            "exit|"+
            "downloadfile|"+
            "readfilebyindex|"+
            "displaybitmap|"+
            "printbitmap|"+
            "readkey|"+
            "unzipfile|"+
            "else|"+
            "integerconvert|"+
            "iso8583.initfieldtable|"+
            "iso8583.initmessage|"+
            "iso8583.analyzemessage|"+
            "iso8583.endmessage|"+
            "iso8583.putfield|"+
            "iso8583.getfield|"+
            "string.charat|"+
            "string.trim|"+
            "string.find|"+
            "string.replace|"+
            "string.substring|"+
            "string.elements|"+
            "string.insertat|"+
            "string.replaceat|"+
            "string.elementat|"+
            "string.removeat|"+
            "network.send|"+
            "network.receive|"+
            "system.restart|"+
            "filesystem.filesize|"+
            "filesystem.space|"+
            "filesystem.listfiles|"+
            "convert.toint|"+
            "predial|"+
            "network.checkgprssignal|"+
            "system.checkbattery|"+
            "network.ping|"+
            "system.beep|"+
            "system.readcard|"+
            "system.inputtransaction|"+
            "network.hostdisconnect|"+
            "iso8583.transactmessage|"+
            "smartcard.insertedcard|"+
            "smartcard.startreader|"+
            "smartcard.transmitAPDU|"+
            "smartcard.closereader|"+
            "string.tohex|"+
            "string.fromhex|"+
            "crypto.encryptdecrypt|"+
            "crypto.lrc|"+
            "crypto.xor|"+
            "crypto.crc|"+
            "system.info|"+
            "system.gettouchscreen|"+
            "pinpad.open|"+
            "pinpad.display|"+
            "pinpad.getkey|"+
            "pinpad.getpindukpt|"+
            "pinpad.loadipek|"+
            "pinpad.close|"+
            "emv.open|"+
            "emv.close|"+
            "emv.settimeout|"+
            "emv.loadtables|"+
            "emv.cleanstructures|"+
            "emv.adddata|"+
            "emv.getinfo|"+
            "emv.inittransaction|"+
            "emv.processtransaction|"+
            "emv.finishtransaction|"+
            "emv.removecard|"+
            "parseticket|"+
            "file.open|"+
            "file.close|"+
            "file.read|"+
            "file.write|"+
            "input.getvalue|"+
            "string.pad|"+
            "time.calculate|"+
            ""
        );
        var lt = "<";
        var gt = ">";
        var bs = "/";
        var sp = " ";
        var nl = "\n";
        var empty = "";
        function completeAttributes(that) {
            if (that.attributes === null)
                return empty;
            if (typeof that.attributes === "string")
                return that.attributes;
            var attributes = empty;
            for (var k in that.attributes) {
                attributes += sp;
                attributes += k + "=\"" + that.attributes[k] + "\"";
            }
            that.attributes = attributes;
            return that.attributes;
        }
        function tagClose(tag) {
            var attributes = completeAttributes(this);
            return tag + attributes + gt +
                   tag.replace(lt, lt + bs) + gt;
        }
        function selfClose(tag) {
            var attributes = completeAttributes(this);
            return tag + attributes + sp + bs + gt;
        }
        function noEndClose(tag) {
            var attributes = completeAttributes(this);
            return tag + attributes + gt;
        }
        this.keywordsWrappers = {
            "<display" : {
                attributes : { line : "0", column : "0", message : empty },
                wrapper : selfClose
            },
            "<cleandisplay" : {
                attributes : null,
                wrapper : selfClose
            },
            "<if" : {
                attributes : { variable : "$()", operator : empty, value : empty },
                wrapper : tagClose
            },
            "<function" : {
                attributes : { name : empty },
                wrapper : tagClose
            },
            "<inputinteger" : {
                attributes : { variable : "$()", line : "0", column : "0", message : empty, minimum : "0", maximum : "50" },
                wrapper : selfClose
            },
            "<inputoption" : {
                attributes : { variable : "$()", line : "0", column : "0", message : empty, minimum : "0", maximum : "50" },
                wrapper : selfClose
            },
            "<inputmoney" : {
                attributes : { variable : "$()", line : "0", column : "0", message : empty },
                wrapper : selfClose
            },
            "<inputformat" : {
                attributes : { variable : "$()", line : "0", column : "0", message : empty, format : empty },
                wrapper : selfClose
            },
            "<print" : {
                attributes : { message : empty },
                wrapper : selfClose
            },
            "<printbig" : {
                attributes : { message : empty },
                wrapper : selfClose
            },
            "<paperfeed" : {
                attributes : null,
                wrapper : selfClose
            },
            "<inputfloat" : {
                attributes : { variable : "$()", line : "0", column : "0", message : empty },
                wrapper : selfClose
            },
            "<preconnect" : {
                attributes : { variablestatus : "$()" },
                wrapper : selfClose
            },
            "<shutdownmodem" : {
                attributes : null,
                wrapper : selfClose
            },
            "<getcardvariable" : {
                attributes : { firstmessage : empty, minimum : "0", maximum : "50", secondmessage : empty, variable : "$()" },
                wrapper : selfClose
            },
            "<waitkey" : {
                attributes : null,
                wrapper : selfClose
            },
            "<wait" : {
                attributes : { miliseconds : "2000" },
                wrapper : selfClose
            },
            "<callfunction" : {
                attributes : { name : empty },
                wrapper : selfClose
            },
            "<integervariable" : {
                attributes : { value : empty, variable : empty },
                wrapper : selfClose
            },
            "<stringvariable" : {
                attributes : { value : empty, variable : empty },
                wrapper : selfClose
            },
            "<substring" : {
                attributes : { character : empty, index : "0", variablesource : "$()", variabledestination : "$()", variablereturn : "$()" },
                wrapper : selfClose
            },
            "<stringtoint" : {
                attributes : { variablestring : "$()", variableinteger : "$()" },
                wrapper : selfClose
            },
            "<inttostring" : {
                attributes : { variableinteger : "$()", variablestring : "$()" },
                wrapper : selfClose
            },
            "<string.getvaluebykey" : {
                attributes : { key : empty, string : "''", variablereturn : "$()" },
                wrapper : selfClose
            },
            "<menu" : {
                attributes : { variable : "$()", options : "OPTION 1\\OPTION 2\\OPTION 3" },
                wrapper : selfClose
            },
            "<menuwithheader" : {
                attributes : { header : empty, options : "OPTION 1\\OPTION 2\\OPTION 3" , timeoutheader : "1", timeout : "30", variablereturn : "$()" },
                wrapper : selfClose
            },
            "<readfile" : {
                attributes : { filename : empty, key : empty, variabledestination : "$()" },
                wrapper : selfClose
            },
            "<editfile" : {
                attributes : { filename : empty, key : empty, value : empty },
                wrapper : selfClose
            },
            "<integeroperator" : {
                attributes : { operator : "++", variablesource : "$()" },
                wrapper : selfClose
            },
            "<adjustdatetime" : {
                attributes : { datetime : empty },
                wrapper : selfClose
            },
            "<getdatetime" : {
                attributes : { format : empty, variabledestination : "$()" },
                wrapper : selfClose
            },
            "<checkpaperout" : {
                attributes : { variablereturn : "$()" },
                wrapper : selfClose
            },
            "<mathematicaloperation" : {
                attributes : { variabledestination : "$()", operator : "+", firstvalue : "$()", secondvalue : "$()" },
                wrapper : selfClose
            },
            "<joinstring" : {
                attributes : { firstvalue : "$()", secondvalue : "$()", variabledestination : "$()" },
                wrapper : selfClose
            },
            "<deletefile" : {
                attributes : { filename : empty },
                wrapper : selfClose
            },
            "<printbarcode" : {
                attributes : { number : empty, horizontal : empty },
                wrapper : selfClose
            },
            "<waitkeytimeout" : {
                attributes : { seconds : empty },
                wrapper : selfClose
            },
            "<execute" : {
                attributes : { filename : empty },
                wrapper : selfClose
            },
            "<while" : {
                attributes : { variable : "$()", operator : empty, value : empty },
                wrapper : selfClose
            },
            "<break" : {
                attributes : null,
                wrapper : selfClose
            },
            "<openserialport" : {
                attributes : { port : empty, rate : empty, configuration : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<readserialport" : {
                attributes : { bytes : "8", timeout : "10000", variablebuffer : "$()", variablehandle : "$()", variablereturn : "$()" },
                wrapper : selfClose
            },
            "<writeserialport" : {
                attributes : { buffer : "$()", variablehandle : "$()" },
                wrapper : selfClose
            },
            "<closeserialport" : {
                attributes : { variablehandle : "$()" },
                wrapper : selfClose
            },
            "<string.length" : {
                attributes : { value : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<exit" : {
                attributes : null,
                wrapper : selfClose
            },
            "<downloadfile" : {
                attributes : { filename : empty, remotepath : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<readfilebyindex" : {
                attributes : { filename : empty, remotepath : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<displaybitmap" : {
                attributes : { filename : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<printbitmap" : {
                attributes : { filename : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<readkey" : {
                attributes : { miliseconds : "2000", variablereturn : "$()" },
                wrapper : selfClose
            },
            "<unzipfile" : {
                attributes : { filename : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<else" : {
                attributes : null,
                wrapper : selfClose
            },
            "<integerconvert" : {
                attributes : { number : empty, base : empty, sizereturn : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<iso8583.initfieldtable" : {
                attributes : { filename : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<iso8583.initmessage" : {
                attributes : { format : empty, id : empty, variablemessage : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<iso8583.analyzemessage" : {
                attributes : { format : empty, size : empty, variablemessage : empty, variableid : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<iso8583.endmessage" : {
                attributes : { variablesize : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<iso8583.putfield" : {
                attributes : { fieldnumber : empty, type : empty, value : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<iso8583.getfield" : {
                attributes : { fieldnumber : empty, type : empty, variablevalue : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.charat" : {
                attributes : { string : empty, character_index : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.trim" : {
                attributes : { string : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.find" : {
                attributes : { string : empty, substring : empty, start : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.replace" : {
                attributes : { original_string : empty, old_substring : empty, new_substring : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.substring" : {
                attributes : { string : empty, start : empty, length : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.elements" : {
                attributes : { string : empty, delimiter : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.insertat" : {
                attributes : { string : empty, string_to_be_inserted : empty, element_index : empty, delimiter : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.replaceat" : {
                attributes : { string : empty, new_element : empty, element_index : empty, delimiter : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.elementat" : {
                attributes : { string : empty, element_index : empty, delimiter : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.removeat" : {
                attributes : { string : empty, element_index : empty, delimiter : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<network.send" : {
                attributes : { buffer : "$()", size : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<network.receive" : {
                attributes : { variablebuffer : "$()", maxsize : empty, variablereceivedbytes : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<system.restart" : {
                attributes : null,
                wrapper : selfClose
            },
            "<filesystem.filesize" : {
                attributes : { filename : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<filesystem.space" : {
                attributes : { dir : empty, type : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<filesystem.listfiles" : {
                attributes : { dir : empty, listfilename : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<convert.toint" : {
                attributes : { base : empty, number : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<predial" : {
                attributes : { option : empty, variablestatus : "$()" },
                wrapper : selfClose
            },
            "<network.checkgprssignal" : {
                attributes : { variablestatus : "$()" },
                wrapper : selfClose
            },
            "<system.checkbattery" : {
                attributes : { variablestatus : "$()" },
                wrapper : selfClose
            },
            "<network.ping" : {
                attributes : { host : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<system.beep" : {
                attributes : null,
                wrapper : selfClose
            },
            "<system.readcard" : {
                attributes : { cardvariable : "$()", keyvariable : "$()", timeout : "30", variablereturn : "$()" },
                wrapper : selfClose
            },
            "<system.inputtransaction" : {
                attributes : { cardvariable : "$()", keyvariable : "$()", timeout : "30", variablereturn : "$()", keyboard : empty, inputtype : empty },
                wrapper : selfClose
            },
            "<network.hostdisconnect" : {
                attributes : null,
                wrapper : selfClose
            },
            "<iso8583.transactmessage" : {
                attributes : { channel : empty, header : empty, trailler : empty, isomsg : empty, variableresponse : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<smartcard.insertedcard" : {
                attributes : { slot : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<smartcard.startreader" : {
                attributes : { slot : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<smartcard.transmitAPDU" : {
                attributes : { slot : empty, header : empty, LC : empty, datafield : empty, LE : empty, variabledatafieldresponse : empty, variableSW : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<smartcard.closereader" : {
                attributes : { slot : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.tohex" : {
                attributes : { string : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.fromhex" : {
                attributes : { string : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<crypto.encryptdecrypt" : {
                attributes : { message : empty, key : empty, cryptotype : empty, type : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<crypto.lrc" : {
                attributes : { buffer : "$()", size : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<crypto.xor" : {
                attributes : { buffer1 : empty, buffer2 : empty, size : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<crypto.crc" : {
                attributes : { buffer : "$()", size : empty, crctype : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<system.info" : {
                attributes : { type : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<system.gettouchscreen" : {
                attributes : { axisx : empty, axisy : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<pinpad.open" : {
                attributes : { type : empty, variableserialnumber : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<pinpad.display" : {
                attributes : { message : empty },
                wrapper : selfClose
            },
            "<pinpad.getkey" : {
                attributes : { message : empty, timeout : "30", variablereturn : "$()" },
                wrapper : selfClose
            },
            "<pinpad.getpindukpt" : {
                attributes : { message : empty, type : empty, pan : empty, maxlen : empty, variablereturnpin : empty, variablereturnksn : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<pinpad.loadipek" : {
                attributes : { ipek : empty, ksn : empty, type : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<pinpad.close" : {
                attributes : { message : empty },
                wrapper : selfClose
            },
            "<emv.open" : {
                attributes : { variablereturn : "$()", mkslot : empty, pinpadtype : empty, pinpadwk : empty, showamount : empty },
                wrapper : selfClose
            },
            "<emv.close" : {
                attributes : { variablereturn : "0" },
                wrapper : selfClose
            },
            "<emv.settimeout" : {
                attributes : { seconds : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<emv.loadtables" : {
                attributes : { acquirer : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<emv.cleanstructures" : {
                attributes : null,
                wrapper : selfClose
            },
            "<emv.adddata" : {
                attributes : { type : empty, parameter : empty, value : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<emv.getinfo" : {
                attributes : { type : empty, parameter : empty, value : empty },
                wrapper : selfClose
            },
            "<emv.inittransaction" : {
                attributes : { variablereturn : "$()" },
                wrapper : selfClose
            },
            "<emv.processtransaction" : {
                attributes : { variablereturn : "$()", ctls : empty },
                wrapper : selfClose
            },
            "<emv.finishtransaction" : {
                attributes : { variablereturn : "$()" },
                wrapper : selfClose
            },
            "<emv.removecard" : {
                attributes : { variablereturn : "$()" },
                wrapper : selfClose
            },
            "<parseticket" : {
                attributes : { productmenu : empty, ticket : empty, message : empty, literal : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<file.open" : {
                attributes : { mode : empty, filename : empty, variablehandle : "$()" },
                wrapper : selfClose
            },
            "<file.close" : {
                attributes : { handle : empty },
                wrapper : selfClose
            },
            "<file.read" : {
                attributes : { handle : empty, size : empty, variablebuffer : "$()", variablereturn : "$()" },
                wrapper : selfClose
            },
            "<file.write" : {
                attributes : { handle : empty, size : empty, buffer : "$()" },
                wrapper : selfClose
            },
            "<input.getvalue" : {
                attributes : { linecaption : empty, columncaption : empty, caption : empty, lineinput : empty, columninput : empty, minimum : "0", maximum : "50", allowsempty : empty, variablereturn : "$()" },
                wrapper : selfClose
            },
            "<string.pad" : {
                attributes : { origin : empty, character : empty, align : empty, length : empty, destination : empty },
                wrapper : selfClose
            },
            "<time.calculate" : {
                attributes : { operation : empty, type : empty, date : empty, greaterdate : empty, value : empty, variablereturn : "$()" },
                wrapper : selfClose
            }
        };

        var keywordMapper = this.$keywords = this.createKeywordMapper({
            "keyword": keywords,
        }, "identifier");

        this.$rules = {
            start : [

                {token : "text"        , regex : "<\\!\\[CDATA\\["             , next : "cdata"   } ,
                {token : "xml-pe"      , regex : "<\\?.*?\\?>"                                    } ,
                {token : keywordMapper , regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"                    } ,
                {token : "comment"     , regex : "<\\!--"                      , next : "comment" } ,
                {token : "xml-pe"      , regex : "<\\!.*?>"                                       } ,
                {token : "meta.tag"    , regex : "<\\/?"                       , next : "tag"     } ,
                {token : "text"        , regex : "\\s+"                                           } ,
                {
                    token : "constant.character.entity", 
                    regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)" 
                }
            ],

            cdata : [
                {token : "text", regex : "\\]\\]>", next : "start"},
                {token : "text", regex : "\\s+"},
                {token : "text", regex : "(?:[^\\]]|\\](?!\\]>))+"}
            ],

            comment : [
                {token : "comment", regex : ".*?-->", next : "start"},
                {token : "comment", regex : ".+"}
            ]
        };

        xmlUtil.tag(this.$rules, "tag", "start");
    };

    oop.inherits(PosXmlHighlightRules, TextHighlightRules);

    exports.PosXmlHighlightRules = PosXmlHighlightRules;
});

ace.define('ace/mode/xml_util', ['require', 'exports', 'module' ], function(require, exports, module) {


function string(state) {
    return [{
        token : "string",
        regex : '"',
        next : state + "_qqstring"
    }, {
        token : "string",
        regex : "'",
        next : state + "_qstring"
    }];
}

function multiLineString(quote, state) {
    return [
        {token : "string", regex : quote, next : state},
        {
            token : "constant.language.escape",
            regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)" 
        },
        {defaultToken : "string"}
    ];
}

exports.tag = function(states, name, nextState, tagMap) {
    states[name] = [{
        token : "text",
        regex : "\\s+"
    }, {
        
    token : !tagMap ? "meta.tag.tag-name" : function(value) {
            if (tagMap[value])
                return "meta.tag.tag-name." + tagMap[value];
            else
                return "meta.tag.tag-name";
        },
        regex : "[-_a-zA-Z0-9:]+",
        next : name + "_embed_attribute_list" 
    }, {
        token: "empty",
        regex: "",
        next : name + "_embed_attribute_list"
    }];

    states[name + "_qstring"] = multiLineString("'", name + "_embed_attribute_list");
    states[name + "_qqstring"] = multiLineString("\"", name + "_embed_attribute_list");
    
    states[name + "_embed_attribute_list"] = [{
        token : "meta.tag.r",
        regex : "/?>",
        next : nextState
    }, {
        token : "keyword.operator",
        regex : "="
    }, {
        token : "entity.other.attribute-name",
        regex : "[-_a-zA-Z0-9:]+"
    }, {
        token : "constant.numeric", // float
        regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
    }, {
        token : "text",
        regex : "\\s+"
    }].concat(string(name));
};

});

ace.define('ace/mode/behaviour/posxml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/behaviour/xml', 'ace/mode/behaviour/cstyle', 'ace/token_iterator'], function(require, exports, module) {


var oop = require("../../lib/oop");
var XmlBehaviour = require("../behaviour/xml").XmlBehaviour;
var CstyleBehaviour = require("./cstyle").CstyleBehaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;

function hasType(token, type) {
    var doHasType = true;
    var typeList = token.type.split('.');
    var needleList = type.split('.');
    needleList.forEach(function(needle){
        if (typeList.indexOf(needle) == -1) {
            doHasType = false;
            return false;
        }
    });
    return doHasType;
}

var PosXmlBehaviour = function () {

    this.inherit(XmlBehaviour); // Get xml behaviour

    var _PosXmlBehaviour = this;
    var lt = '<';

    this.add("autoclosing", "insertion", function (state, action, editor, session, text) {
        if (this.keywordsWrappers && this.keywordsWrappers[lt+text]) {
            return _PosXmlBehaviour.getBehaviours().wrapCompletion.insertion.apply(this, [state, action, editor, session, lt+text]);
        }
        if (text == '>') {
            var position = editor.getCursorPosition();
            var iterator = new TokenIterator(session, position.row, position.column);
            var token = iterator.getCurrentToken();
            var atCursor = false;
            var tagname = token ? token.value : '';
            if (!token || !hasType(token, 'meta.tag') && !(hasType(token, 'text') && token.value.match('/'))){
                do {
                    token = iterator.stepBackward();
                    tagname = token.value + tagname;
                    tagname = token ? token.value + tagname : tagname;
                } while (token && (hasType(token, 'string') || hasType(token, 'keyword.operator') || hasType(token, 'entity.attribute-name') || hasType(token, 'text')));
            } else {
                atCursor = true;
            }
            if (!token || !hasType(token, 'meta.tag-name') || iterator.stepBackward().value.match('/')) {
                return;
            }
            var tag = token.value;
            if (atCursor){
                tag = tag.substring(0, position.column - token.start);
            }

            tagname = '<' + tagname;
            if (this.keywordsWrappers && this.keywordsWrappers[tagname]) {
                return _PosXmlBehaviour.getBehaviours().wrapCompletion.insertion.apply(this, [state, action, editor, session, tagname]);
            }

            return {
               text: '>' + '</' + tag + '>',
               selection: [1, 1]
            };
        }
    });

};
oop.inherits(PosXmlBehaviour, XmlBehaviour);

exports.PosXmlBehaviour = PosXmlBehaviour;
});

ace.define('ace/mode/behaviour/xml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/behaviour', 'ace/mode/behaviour/cstyle', 'ace/token_iterator'], function(require, exports, module) {


var oop = require("../../lib/oop");
var Behaviour = require("../behaviour").Behaviour;
var CstyleBehaviour = require("./cstyle").CstyleBehaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;

function hasType(token, type) {
    var doHasType = true;
    var typeList = token.type.split('.');
    var needleList = type.split('.');
    needleList.forEach(function(needle){
        if (typeList.indexOf(needle) == -1) {
            doHasType = false;
            return false;
        }
    });
    return doHasType;
}

var XmlBehaviour = function () {

    this.inherit(CstyleBehaviour, ["string_dquotes"]); // Get string behaviour

    var _XmlBehaviour = this;

    this.add("autoclosing", "insertion", function (state, action, editor, session, text) {
        if (text == '>') {
            var position = editor.getCursorPosition();
            var iterator = new TokenIterator(session, position.row, position.column);
            var token = iterator.getCurrentToken();
            var atCursor = false;
            var tagname = token.value;
            if (!token || !hasType(token, 'meta.tag') && !(hasType(token, 'text') && token.value.match('/'))){
                do {
                    token = iterator.stepBackward();
                    tagname = token.value + tagname;
                } while (token && (hasType(token, 'string') || hasType(token, 'keyword.operator') || hasType(token, 'entity.attribute-name') || hasType(token, 'text')));
            } else {
                atCursor = true;
            }
            if (!token || !hasType(token, 'meta.tag-name') || iterator.stepBackward().value.match('/')) {
                return;
            }
            var tag = token.value;
            if (atCursor){
                tag = tag.substring(0, position.column - token.start);
            }

            tagname = '<' + tagname;
            if (this.keywordsWrappers && this.keywordsWrappers[tagname]) {
                return _XmlBehaviour.getBehaviours().wrapCompletion.insertion.apply(this, [state, action, editor, session, tagname]);
            }

            return {
               text: '>' + '</' + tag + '>',
               selection: [1, 1]
            };
        }
    });

    this.add('autoindent', 'insertion', function (state, action, editor, session, text) {
        if (text == "\n") {
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChars = line.substring(cursor.column, cursor.column + 2);
            if (rightChars == '</') {
                var indent = this.$getIndent(session.doc.getLine(cursor.row)) + session.getTabString();
                var next_indent = this.$getIndent(session.doc.getLine(cursor.row));

                return {
                    text: '\n' + indent + '\n' + next_indent,
                    selection: [1, indent.length, 1, indent.length]
                };
            }
        }
    });

    this.add('wrapCompletion', 'insertion', function(state, action, editor, session, text) {
        if (!this.keywordsWrappers) {
            return;
        }
        var wrapper = this.keywordsWrappers[text];
        if (!wrapper) {
            return;
        }
        text = wrapper.wrapper(text);
        var moveTo = text.indexOf('>') + 1;
        var position = editor.getCursorPosition();
        position.column -= this.$getIndent.length - 1;
        var line = session.getLine(position.row);
        var space = " ";
        while (!!~text.indexOf(line[position.column - 1])) {
            if (line[position.column - 1] === space && line[position.column - 2] === space) {
                break;
            }
            editor.selection.selectLeft();
            if (line[position.column - 1] === "<") {
              break;
            }
            position.column--;
        }
        var range = editor.getSelectionRange();
        if (range && range.start.column !== range.end.column) {
            range.end.column -= 1;
            session.remove(range);
        }
        return {
            text : text,
            selection: [moveTo, moveTo]
        };
    });
};
oop.inherits(XmlBehaviour, Behaviour);

exports.XmlBehaviour = XmlBehaviour;
});

ace.define('ace/mode/behaviour/cstyle', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/behaviour', 'ace/token_iterator', 'ace/lib/lang'], function(require, exports, module) {


var oop = require("../../lib/oop");
var Behaviour = require("../behaviour").Behaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;
var lang = require("../../lib/lang");

var SAFE_INSERT_IN_TOKENS =
    ["text", "paren.rparen", "punctuation.operator"];
var SAFE_INSERT_BEFORE_TOKENS =
    ["text", "paren.rparen", "punctuation.operator", "comment"];


var autoInsertedBrackets = 0;
var autoInsertedRow = -1;
var autoInsertedLineEnd = "";
var maybeInsertedBrackets = 0;
var maybeInsertedRow = -1;
var maybeInsertedLineStart = "";
var maybeInsertedLineEnd = "";

var CstyleBehaviour = function () {
    
    CstyleBehaviour.isSaneInsertion = function(editor, session) {
        var cursor = editor.getCursorPosition();
        var iterator = new TokenIterator(session, cursor.row, cursor.column);
        if (!this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS)) {
            var iterator2 = new TokenIterator(session, cursor.row, cursor.column + 1);
            if (!this.$matchTokenType(iterator2.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS))
                return false;
        }
        iterator.stepForward();
        return iterator.getCurrentTokenRow() !== cursor.row ||
            this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_BEFORE_TOKENS);
    };
    
    CstyleBehaviour.$matchTokenType = function(token, types) {
        return types.indexOf(token.type || token) > -1;
    };
    
    CstyleBehaviour.recordAutoInsert = function(editor, session, bracket) {
        var cursor = editor.getCursorPosition();
        var line = session.doc.getLine(cursor.row);
        if (!this.isAutoInsertedClosing(cursor, line, autoInsertedLineEnd[0]))
            autoInsertedBrackets = 0;
        autoInsertedRow = cursor.row;
        autoInsertedLineEnd = bracket + line.substr(cursor.column);
        autoInsertedBrackets++;
    };
    
    CstyleBehaviour.recordMaybeInsert = function(editor, session, bracket) {
        var cursor = editor.getCursorPosition();
        var line = session.doc.getLine(cursor.row);
        if (!this.isMaybeInsertedClosing(cursor, line))
            maybeInsertedBrackets = 0;
        maybeInsertedRow = cursor.row;
        maybeInsertedLineStart = line.substr(0, cursor.column) + bracket;
        maybeInsertedLineEnd = line.substr(cursor.column);
        maybeInsertedBrackets++;
    };
    
    CstyleBehaviour.isAutoInsertedClosing = function(cursor, line, bracket) {
        return autoInsertedBrackets > 0 &&
            cursor.row === autoInsertedRow &&
            bracket === autoInsertedLineEnd[0] &&
            line.substr(cursor.column) === autoInsertedLineEnd;
    };
    
    CstyleBehaviour.isMaybeInsertedClosing = function(cursor, line) {
        return maybeInsertedBrackets > 0 &&
            cursor.row === maybeInsertedRow &&
            line.substr(cursor.column) === maybeInsertedLineEnd &&
            line.substr(0, cursor.column) == maybeInsertedLineStart;
    };
    
    CstyleBehaviour.popAutoInsertedClosing = function() {
        autoInsertedLineEnd = autoInsertedLineEnd.substr(1);
        autoInsertedBrackets--;
    };
    
    CstyleBehaviour.clearMaybeInsertedClosing = function() {
        maybeInsertedBrackets = 0;
        maybeInsertedRow = -1;
    };

    this.add("braces", "insertion", function (state, action, editor, session, text) {
        var cursor = editor.getCursorPosition();
        var line = session.doc.getLine(cursor.row);
        if (text == '{') {
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "{" && editor.getWrapBehavioursEnabled()) {
                return {
                    text: '{' + selected + '}',
                    selection: false
                };
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
                if (/[\]\}\)]/.test(line[cursor.column])) {
                    CstyleBehaviour.recordAutoInsert(editor, session, "}");
                    return {
                        text: '{}',
                        selection: [1, 1]
                    };
                } else {
                    CstyleBehaviour.recordMaybeInsert(editor, session, "{");
                    return {
                        text: '{',
                        selection: [1, 1]
                    };
                }
            }
        } else if (text == '}') {
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == '}') {
                var matching = session.$findOpeningBracket('}', {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
                    CstyleBehaviour.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        } else if (text == "\n" || text == "\r\n") {
            var closing = "";
            if (CstyleBehaviour.isMaybeInsertedClosing(cursor, line)) {
                closing = lang.stringRepeat("}", maybeInsertedBrackets);
                CstyleBehaviour.clearMaybeInsertedClosing();
            }
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == '}' || closing !== "") {
                var openBracePos = session.findMatchingBracket({row: cursor.row, column: cursor.column}, '}');
                if (!openBracePos)
                     return null;

                var indent = this.getNextLineIndent(state, line.substring(0, cursor.column), session.getTabString());
                var next_indent = this.$getIndent(line);

                return {
                    text: '\n' + indent + '\n' + next_indent + closing,
                    selection: [1, indent.length, 1, indent.length]
                };
            }
        }
    });

    this.add("braces", "deletion", function (state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '{') {
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.end.column, range.end.column + 1);
            if (rightChar == '}') {
                range.end.column++;
                return range;
            } else {
                maybeInsertedBrackets--;
            }
        }
    });

    this.add("parens", "insertion", function (state, action, editor, session, text) {
        if (text == '(') {
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) {
                return {
                    text: '(' + selected + ')',
                    selection: false
                };
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
                CstyleBehaviour.recordAutoInsert(editor, session, ")");
                return {
                    text: '()',
                    selection: [1, 1]
                };
            }
        } else if (text == ')') {
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ')') {
                var matching = session.$findOpeningBracket(')', {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
                    CstyleBehaviour.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        }
    });

    this.add("parens", "deletion", function (state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '(') {
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ')') {
                range.end.column++;
                return range;
            }
        }
    });

    this.add("brackets", "insertion", function (state, action, editor, session, text) {
        if (text == '[') {
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) {
                return {
                    text: '[' + selected + ']',
                    selection: false
                };
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
                CstyleBehaviour.recordAutoInsert(editor, session, "]");
                return {
                    text: '[]',
                    selection: [1, 1]
                };
            }
        } else if (text == ']') {
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ']') {
                var matching = session.$findOpeningBracket(']', {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
                    CstyleBehaviour.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        }
    });

    this.add("brackets", "deletion", function (state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '[') {
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ']') {
                range.end.column++;
                return range;
            }
        }
    });

    this.add("string_dquotes", "insertion", function (state, action, editor, session, text) {
        if (text == '"' || text == "'") {
            var quote = text;
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "'" && selected != '"' && editor.getWrapBehavioursEnabled()) {
                return {
                    text: quote + selected + quote,
                    selection: false
                };
            } else {
                var cursor = editor.getCursorPosition();
                var line = session.doc.getLine(cursor.row);
                var leftChar = line.substring(cursor.column-1, cursor.column);
                if (leftChar == '\\') {
                    return null;
                }
                var tokens = session.getTokens(selection.start.row);
                var col = 0, token;
                var quotepos = -1; // Track whether we're inside an open quote.

                for (var x = 0; x < tokens.length; x++) {
                    token = tokens[x];
                    if (token.type == "string") {
                      quotepos = -1;
                    } else if (quotepos < 0) {
                      quotepos = token.value.indexOf(quote);
                    }
                    if ((token.value.length + col) > selection.start.column) {
                        break;
                    }
                    col += tokens[x].value.length;
                }
                if (!token || (quotepos < 0 && token.type !== "comment" && (token.type !== "string" || ((selection.start.column !== token.value.length+col-1) && token.value.lastIndexOf(quote) === token.value.length-1)))) {
                    if (!CstyleBehaviour.isSaneInsertion(editor, session))
                        return;
                    return {
                        text: quote + quote,
                        selection: [1,1]
                    };
                } else if (token && token.type === "string") {
                    var rightChar = line.substring(cursor.column, cursor.column + 1);
                    if (rightChar == quote) {
                        return {
                            text: '',
                            selection: [1, 1]
                        };
                    }
                }
            }
        }
    });

    this.add("string_dquotes", "deletion", function (state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && (selected == '"' || selected == "'")) {
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == selected) {
                range.end.column++;
                return range;
            }
        }
    });

};

oop.inherits(CstyleBehaviour, Behaviour);

exports.CstyleBehaviour = CstyleBehaviour;
});

ace.define('ace/mode/folding/posxml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/folding/mixed', 'ace/mode/folding/xml', 'ace/mode/folding/cstyle'], function(require, exports, module) {


var oop = require("../../lib/oop");
var MixedFoldMode = require("./mixed").FoldMode;
var XmlFoldMode = require("./xml").FoldMode;
var CStyleFoldMode = require("./cstyle").FoldMode;

var FoldMode = exports.FoldMode = function() {
    MixedFoldMode.call(this, new XmlFoldMode({
        "display": 1,
        "cleandisplay": 1,
        "inputinteger": 1,
        "inputoption": 1,
        "inputmoney": 1,
        "inputformat": 1,
        "print": 1,
        "printbig": 1,
        "paperfeed": 1,
        "inputfloat": 1,
        "preconnect": 1,
        "shutdownmodem": 1,
        "getcardvariable": 1,
        "waitkey": 1,
        "wait": 1,
        "callfunction": 1,
        "integervariable": 1,
        "stringvariable": 1,
        "substring": 1,
        "stringtoint": 1,
        "inttostring": 1,
        "string.getvaluebykey": 1,
        "menu": 1,
        "menuwithheader": 1,
        "readfile": 1,
        "editfile": 1,
        "integeroperator": 1,
        "adjustdatetime": 1,
        "getdatetime": 1,
        "checkpaperout": 1,
        "mathematicaloperation": 1,
        "joinstring": 1,
        "deletefile": 1,
        "printbarcode": 1,
        "waitkeytimeout": 1,
        "execute": 1,
        "while": 1,
        "break": 1,
        "openserialport": 1,
        "readserialport": 1,
        "writeserialport": 1,
        "closeserialport": 1,
        "string.length": 1,
        "exit": 1,
        "downloadfile": 1,
        "readfilebyindex": 1,
        "displaybitmap": 1,
        "printbitmap": 1,
        "readkey": 1,
        "unzipfile": 1,
        "else": 1,
        "integerconvert": 1,
        "iso8583.initfieldtable": 1,
        "iso8583.initmessage": 1,
        "iso8583.analyzemessage": 1,
        "iso8583.endmessage": 1,
        "iso8583.putfield": 1,
        "iso8583.getfield": 1,
        "string.charat": 1,
        "string.trim": 1,
        "string.find": 1,
        "string.replace": 1,
        "string.substring": 1,
        "string.elements": 1,
        "string.insertat": 1,
        "string.replaceat": 1,
        "string.elementat": 1,
        "string.removeat": 1,
        "network.send": 1,
        "network.receive": 1,
        "system.restart": 1,
        "filesystem.filesize": 1,
        "filesystem.space": 1,
        "filesystem.listfiles": 1,
        "convert.toint": 1,
        "predial": 1,
        "network.checkgprssignal": 1,
        "system.checkbattery": 1,
        "network.ping": 1,
        "system.beep": 1,
        "system.readcard": 1,
        "network.hostdisconnect": 1,
        "iso8583.transactmessage": 1,
        "smartcard.insertedcard": 1,
        "smartcard.startreader": 1,
        "smartcard.transmitAPDU": 1,
        "smartcard.closereader": 1,
        "string.tohex": 1,
        "string.fromhex": 1,
        "crypto.encryptdecrypt": 1,
        "crypto.lrc": 1,
        "crypto.xor": 1,
        "crypto.crc": 1,
        "system.info": 1,
        "system.gettouchscreen": 1,
        "pinpad.open": 1,
        "pinpad.display": 1,
        "pinpad.getkey": 1,
        "pinpad.getpindukpt": 1,
        "pinpad.loadipek": 1,
        "pinpad.close": 1,
        "emv.open": 1,
        "emv.settimeout": 1,
        "emv.loadtables": 1,
        "emv.cleanstructures": 1,
        "emv.adddata": 1,
        "emv.getinfo": 1,
        "emv.inittransaction": 1,
        "emv.processtransaction": 1,
        "emv.finishtransaction": 1,
        "emv.removecard": 1,
        "parseticket": 1,
        "file.open": 1,
        "file.close": 1,
        "file.read": 1,
        "file.write": 1,
        "input.getvalue": 1,
        "string.pad": 1,
        "time.calculate": 1,
    }));
};

oop.inherits(FoldMode, MixedFoldMode);

});

ace.define('ace/mode/folding/mixed', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/folding/fold_mode'], function(require, exports, module) {


var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(defaultMode, subModes) {
    this.defaultMode = defaultMode;
    this.subModes = subModes;
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {


    this.$getMode = function(state) {
        for (var key in this.subModes) {
            if (state.indexOf(key) === 0)
                return this.subModes[key];
        }
        return null;
    };
    
    this.$tryMode = function(state, session, foldStyle, row) {
        var mode = this.$getMode(state);
        return (mode ? mode.getFoldWidget(session, foldStyle, row) : "");
    };

    this.getFoldWidget = function(session, foldStyle, row) {
        return (
            this.$tryMode(session.getState(row-1), session, foldStyle, row) ||
            this.$tryMode(session.getState(row), session, foldStyle, row) ||
            this.defaultMode.getFoldWidget(session, foldStyle, row)
        );
    };

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var mode = this.$getMode(session.getState(row-1));
        
        if (!mode || !mode.getFoldWidget(session, foldStyle, row))
            mode = this.$getMode(session.getState(row));
        
        if (!mode || !mode.getFoldWidget(session, foldStyle, row))
            mode = this.defaultMode;
        
        return mode.getFoldWidgetRange(session, foldStyle, row);
    };

}).call(FoldMode.prototype);

});

ace.define('ace/mode/folding/xml', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/lib/lang', 'ace/range', 'ace/mode/folding/fold_mode', 'ace/token_iterator'], function(require, exports, module) {


var oop = require("../../lib/oop");
var lang = require("../../lib/lang");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;
var TokenIterator = require("../../token_iterator").TokenIterator;

var FoldMode = exports.FoldMode = function(voidElements) {
    BaseFoldMode.call(this);
    this.voidElements = voidElements || {};
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.getFoldWidget = function(session, foldStyle, row) {
        var tag = this._getFirstTagInLine(session, row);

        if (tag.closing)
            return foldStyle == "markbeginend" ? "end" : "";

        if (!tag.tagName || this.voidElements[tag.tagName.toLowerCase()])
            return "";

        if (tag.selfClosing)
            return "";

        if (tag.value.indexOf("/" + tag.tagName) !== -1)
            return "";

        return "start";
    };
    
    this._getFirstTagInLine = function(session, row) {
        var tokens = session.getTokens(row);
        var value = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (token.type.indexOf("meta.tag") === 0)
                value += token.value;
            else
                value += lang.stringRepeat(" ", token.value.length);
        }
        
        return this._parseTag(value);
    };

    this.tagRe = /^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/;
    this._parseTag = function(tag) {
        
        var match = this.tagRe.exec(tag);
        var column = this.tagRe.lastIndex || 0;
        this.tagRe.lastIndex = 0;

        return {
            value: tag,
            match: match ? match[2] : "",
            closing: match ? !!match[3] : false,
            selfClosing: match ? !!match[5] || match[2] == "/>" : false,
            tagName: match ? match[4] : "",
            column: match[1] ? column + match[1].length : column
        };
    };
    this._readTagForward = function(iterator) {
        var token = iterator.getCurrentToken();
        if (!token)
            return null;
            
        var value = "";
        var start;
        
        do {
            if (token.type.indexOf("meta.tag") === 0) {
                if (!start) {
                    var start = {
                        row: iterator.getCurrentTokenRow(),
                        column: iterator.getCurrentTokenColumn()
                    };
                }
                value += token.value;
                if (value.indexOf(">") !== -1) {
                    var tag = this._parseTag(value);
                    tag.start = start;
                    tag.end = {
                        row: iterator.getCurrentTokenRow(),
                        column: iterator.getCurrentTokenColumn() + token.value.length
                    };
                    iterator.stepForward();
                    return tag;
                }
            }
        } while(token = iterator.stepForward());
        
        return null;
    };
    
    this._readTagBackward = function(iterator) {
        var token = iterator.getCurrentToken();
        if (!token)
            return null;
            
        var value = "";
        var end;

        do {
            if (token.type.indexOf("meta.tag") === 0) {
                if (!end) {
                    end = {
                        row: iterator.getCurrentTokenRow(),
                        column: iterator.getCurrentTokenColumn() + token.value.length
                    };
                }
                value = token.value + value;
                if (value.indexOf("<") !== -1) {
                    var tag = this._parseTag(value);
                    tag.end = end;
                    tag.start = {
                        row: iterator.getCurrentTokenRow(),
                        column: iterator.getCurrentTokenColumn()
                    };
                    iterator.stepBackward();
                    return tag;
                }
            }
        } while(token = iterator.stepBackward());
        
        return null;
    };
    
    this._pop = function(stack, tag) {
        while (stack.length) {
            
            var top = stack[stack.length-1];
            if (!tag || top.tagName == tag.tagName) {
                return stack.pop();
            }
            else if (this.voidElements[tag.tagName]) {
                return;
            }
            else if (this.voidElements[top.tagName]) {
                stack.pop();
                continue;
            } else {
                return null;
            }
        }
    };
    
    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var firstTag = this._getFirstTagInLine(session, row);
        
        if (!firstTag.match)
            return null;
        
        var isBackward = firstTag.closing || firstTag.selfClosing;
        var stack = [];
        var tag;
        
        if (!isBackward) {
            var iterator = new TokenIterator(session, row, firstTag.column);
            var start = {
                row: row,
                column: firstTag.column + firstTag.tagName.length + 2
            };
            while (tag = this._readTagForward(iterator)) {
                if (tag.selfClosing) {
                    if (!stack.length) {
                        tag.start.column += tag.tagName.length + 2;
                        tag.end.column -= 2;
                        return Range.fromPoints(tag.start, tag.end);
                    } else
                        continue;
                }
                
                if (tag.closing) {
                    this._pop(stack, tag);
                    if (stack.length == 0)
                        return Range.fromPoints(start, tag.start);
                }
                else {
                    stack.push(tag)
                }
            }
        }
        else {
            var iterator = new TokenIterator(session, row, firstTag.column + firstTag.match.length);
            var end = {
                row: row,
                column: firstTag.column
            };
            
            while (tag = this._readTagBackward(iterator)) {
                if (tag.selfClosing) {
                    if (!stack.length) {
                        tag.start.column += tag.tagName.length + 2;
                        tag.end.column -= 2;
                        return Range.fromPoints(tag.start, tag.end);
                    } else
                        continue;
                }
                
                if (!tag.closing) {
                    this._pop(stack, tag);
                    if (stack.length == 0) {
                        tag.start.column += tag.tagName.length + 2;
                        return Range.fromPoints(tag.start, end);
                    }
                }
                else {
                    stack.push(tag)
                }
            }
        }
        
    };

}).call(FoldMode.prototype);

});

ace.define('ace/mode/folding/cstyle', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/range', 'ace/mode/folding/fold_mode'], function(require, exports, module) {


var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i + match[0].length, 1);
        }

        if (foldStyle !== "markbeginend")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };

}).call(FoldMode.prototype);

});
