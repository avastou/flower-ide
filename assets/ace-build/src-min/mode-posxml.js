define("ace/mode/posxml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/posxml_highlight_rules","ace/mode/behaviour/posxml","ace/mode/folding/posxml"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("../tokenizer").Tokenizer,o=e("./posxml_highlight_rules").PosXmlHighlightRules,u=e("./behaviour/posxml").PosXmlBehaviour,a=e("./folding/posxml").FoldMode,f=function(){var e=new o;this.$tokenizer=new s(e.getRules()),this.$keywordList=e.$keywordList,this.keywordsWrappers=e.keywordsWrappers,this.$behaviour=new u,this.foldingRules=new a};r.inherits(f,i),function(){this.getNextLineIndent=function(e,t,n){return this.$getIndent(t)}}.call(f.prototype),t.Mode=f}),define("ace/mode/posxml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/xml_util","ace/mode/text_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),i=e("./xml_util"),s=e("./text_highlight_rules").TextHighlightRules,o=function(){function a(e){if(e.attributes===null)return u;if(typeof e.attributes=="string")return e.attributes;var t=u;for(var n in e.attributes)t+=s,t+=n+'="'+e.attributes[n]+'"';return e.attributes=t,e.attributes}function f(e){var i=a(this);return e+i+n+e.replace(t,t+r)+n}function l(e){var t=a(this);return e+t+s+r+n}function c(e){var t=a(this);return e+t+n}var e="display|cleandisplay|if|function|inputinteger|inputoption|inputmoney|inputformat|print|printbig|paperfeed|inputfloat|preconnect|shutdownmodem|getcardvariable|waitkey|wait|callfunction|integervariable|stringvariable|substring|stringtoint|inttostring|string.getvaluebykey|menu|menuwithheader|readfile|editfile|integeroperator|adjustdatetime|getdatetime|checkpaperout|mathematicaloperation|joinstring|deletefile|printbarcode|waitkeytimeout|execute|while|break|openserialport|readserialport|writeserialport|closeserialport|string.length|exit|downloadfile|readfilebyindex|displaybitmap|printbitmap|readkey|unzipfile|else|integerconvert|iso8583.initfieldtable|iso8583.initmessage|iso8583.analyzemessage|iso8583.endmessage|iso8583.putfield|iso8583.getfield|string.charat|string.trim|string.find|string.replace|string.substring|string.elements|string.insertat|string.replaceat|string.elementat|string.removeat|network.send|network.receive|system.restart|filesystem.filesize|filesystem.space|filesystem.listfiles|convert.toint|predial|network.checkgprssignal|system.checkbattery|network.ping|system.beep|system.readcard|system.inputtransaction|network.hostdisconnect|iso8583.transactmessage|smartcard.insertedcard|smartcard.startreader|smartcard.transmitAPDU|smartcard.closereader|string.tohex|string.fromhex|crypto.encryptdecrypt|crypto.lrc|crypto.xor|crypto.crc|system.info|system.gettouchscreen|pinpad.open|pinpad.display|pinpad.getkey|pinpad.getpindukpt|pinpad.loadipek|pinpad.close|emv.open|emv.close|emv.settimeout|emv.loadtables|emv.cleanstructures|emv.adddata|emv.getinfo|emv.inittransaction|emv.processtransaction|emv.finishtransaction|emv.removecard|parseticket|file.open|file.close|file.read|file.write|input.getvalue|string.pad|time.calculate|",t="<",n=">",r="/",s=" ",o="\n",u="";this.keywordsWrappers={"<display":{attributes:{line:"0",column:"0",message:u},wrapper:l},"<cleandisplay":{attributes:null,wrapper:l},"<if":{attributes:{variable:"$()",operator:u,value:u},wrapper:f},"<function":{attributes:{name:u},wrapper:f},"<inputinteger":{attributes:{variable:"$()",line:"0",column:"0",message:u,minimum:"0",maximum:"50"},wrapper:l},"<inputoption":{attributes:{variable:"$()",line:"0",column:"0",message:u,minimum:"0",maximum:"50"},wrapper:l},"<inputmoney":{attributes:{variable:"$()",line:"0",column:"0",message:u},wrapper:l},"<inputformat":{attributes:{variable:"$()",line:"0",column:"0",message:u,format:u},wrapper:l},"<print":{attributes:{message:u},wrapper:l},"<printbig":{attributes:{message:u},wrapper:l},"<paperfeed":{attributes:null,wrapper:l},"<inputfloat":{attributes:{variable:"$()",line:"0",column:"0",message:u},wrapper:l},"<preconnect":{attributes:{variablestatus:"$()"},wrapper:l},"<shutdownmodem":{attributes:null,wrapper:l},"<getcardvariable":{attributes:{firstmessage:u,minimum:"0",maximum:"50",secondmessage:u,variable:"$()"},wrapper:l},"<waitkey":{attributes:null,wrapper:l},"<wait":{attributes:{miliseconds:"2000"},wrapper:l},"<callfunction":{attributes:{name:u},wrapper:l},"<integervariable":{attributes:{value:u,variable:u},wrapper:l},"<stringvariable":{attributes:{value:u,variable:u},wrapper:l},"<substring":{attributes:{character:u,index:"0",variablesource:"$()",variabledestination:"$()",variablereturn:"$()"},wrapper:l},"<stringtoint":{attributes:{variablestring:"$()",variableinteger:"$()"},wrapper:l},"<inttostring":{attributes:{variableinteger:"$()",variablestring:"$()"},wrapper:l},"<string.getvaluebykey":{attributes:{key:u,string:"''",variablereturn:"$()"},wrapper:l},"<menu":{attributes:{variable:"$()",options:"OPTION 1\\OPTION 2\\OPTION 3"},wrapper:l},"<menuwithheader":{attributes:{header:u,options:"OPTION 1\\OPTION 2\\OPTION 3",timeoutheader:"1",timeout:"30",variablereturn:"$()"},wrapper:l},"<readfile":{attributes:{filename:u,key:u,variabledestination:"$()"},wrapper:l},"<editfile":{attributes:{filename:u,key:u,value:u},wrapper:l},"<integeroperator":{attributes:{operator:"++",variablesource:"$()"},wrapper:l},"<adjustdatetime":{attributes:{datetime:u},wrapper:l},"<getdatetime":{attributes:{format:u,variabledestination:"$()"},wrapper:l},"<checkpaperout":{attributes:{variablereturn:"$()"},wrapper:l},"<mathematicaloperation":{attributes:{variabledestination:"$()",operator:"+",firstvalue:"$()",secondvalue:"$()"},wrapper:l},"<joinstring":{attributes:{firstvalue:"$()",secondvalue:"$()",variabledestination:"$()"},wrapper:l},"<deletefile":{attributes:{filename:u},wrapper:l},"<printbarcode":{attributes:{number:u,horizontal:u},wrapper:l},"<waitkeytimeout":{attributes:{seconds:u},wrapper:l},"<execute":{attributes:{filename:u},wrapper:l},"<while":{attributes:{variable:"$()",operator:u,value:u},wrapper:l},"<break":{attributes:null,wrapper:l},"<openserialport":{attributes:{port:u,rate:u,configuration:u,variablereturn:"$()"},wrapper:l},"<readserialport":{attributes:{bytes:"8",timeout:"10000",variablebuffer:"$()",variablehandle:"$()",variablereturn:"$()"},wrapper:l},"<writeserialport":{attributes:{buffer:"$()",variablehandle:"$()"},wrapper:l},"<closeserialport":{attributes:{variablehandle:"$()"},wrapper:l},"<string.length":{attributes:{value:u,variablereturn:"$()"},wrapper:l},"<exit":{attributes:null,wrapper:l},"<downloadfile":{attributes:{filename:u,remotepath:u,variablereturn:"$()"},wrapper:l},"<readfilebyindex":{attributes:{filename:u,remotepath:u,variablereturn:"$()"},wrapper:l},"<displaybitmap":{attributes:{filename:u,variablereturn:"$()"},wrapper:l},"<printbitmap":{attributes:{filename:u,variablereturn:"$()"},wrapper:l},"<readkey":{attributes:{miliseconds:"2000",variablereturn:"$()"},wrapper:l},"<unzipfile":{attributes:{filename:u,variablereturn:"$()"},wrapper:l},"<else":{attributes:null,wrapper:l},"<integerconvert":{attributes:{number:u,base:u,sizereturn:u,variablereturn:"$()"},wrapper:l},"<iso8583.initfieldtable":{attributes:{filename:u,variablereturn:"$()"},wrapper:l},"<iso8583.initmessage":{attributes:{format:u,id:u,variablemessage:u,variablereturn:"$()"},wrapper:l},"<iso8583.analyzemessage":{attributes:{format:u,size:u,variablemessage:u,variableid:u,variablereturn:"$()"},wrapper:l},"<iso8583.endmessage":{attributes:{variablesize:u,variablereturn:"$()"},wrapper:l},"<iso8583.putfield":{attributes:{fieldnumber:u,type:u,value:u,variablereturn:"$()"},wrapper:l},"<iso8583.getfield":{attributes:{fieldnumber:u,type:u,variablevalue:u,variablereturn:"$()"},wrapper:l},"<string.charat":{attributes:{string:u,character_index:u,variablereturn:"$()"},wrapper:l},"<string.trim":{attributes:{string:u,variablereturn:"$()"},wrapper:l},"<string.find":{attributes:{string:u,substring:u,start:u,variablereturn:"$()"},wrapper:l},"<string.replace":{attributes:{original_string:u,old_substring:u,new_substring:u,variablereturn:"$()"},wrapper:l},"<string.substring":{attributes:{string:u,start:u,length:u,variablereturn:"$()"},wrapper:l},"<string.elements":{attributes:{string:u,delimiter:u,variablereturn:"$()"},wrapper:l},"<string.insertat":{attributes:{string:u,string_to_be_inserted:u,element_index:u,delimiter:u,variablereturn:"$()"},wrapper:l},"<string.replaceat":{attributes:{string:u,new_element:u,element_index:u,delimiter:u,variablereturn:"$()"},wrapper:l},"<string.elementat":{attributes:{string:u,element_index:u,delimiter:u,variablereturn:"$()"},wrapper:l},"<string.removeat":{attributes:{string:u,element_index:u,delimiter:u,variablereturn:"$()"},wrapper:l},"<network.send":{attributes:{buffer:"$()",size:u,variablereturn:"$()"},wrapper:l},"<network.receive":{attributes:{variablebuffer:"$()",maxsize:u,variablereceivedbytes:u,variablereturn:"$()"},wrapper:l},"<system.restart":{attributes:null,wrapper:l},"<filesystem.filesize":{attributes:{filename:u,variablereturn:"$()"},wrapper:l},"<filesystem.space":{attributes:{dir:u,type:u,variablereturn:"$()"},wrapper:l},"<filesystem.listfiles":{attributes:{dir:u,listfilename:u,variablereturn:"$()"},wrapper:l},"<convert.toint":{attributes:{base:u,number:u,variablereturn:"$()"},wrapper:l},"<predial":{attributes:{option:u,variablestatus:"$()"},wrapper:l},"<network.checkgprssignal":{attributes:{variablestatus:"$()"},wrapper:l},"<system.checkbattery":{attributes:{variablestatus:"$()"},wrapper:l},"<network.ping":{attributes:{host:u,variablereturn:"$()"},wrapper:l},"<system.beep":{attributes:null,wrapper:l},"<system.readcard":{attributes:{cardvariable:"$()",keyvariable:"$()",timeout:"30",variablereturn:"$()"},wrapper:l},"<system.inputtransaction":{attributes:{cardvariable:"$()",keyvariable:"$()",timeout:"30",variablereturn:"$()",keyboard:u,inputtype:u},wrapper:l},"<network.hostdisconnect":{attributes:null,wrapper:l},"<iso8583.transactmessage":{attributes:{channel:u,header:u,trailler:u,isomsg:u,variableresponse:u,variablereturn:"$()"},wrapper:l},"<smartcard.insertedcard":{attributes:{slot:u,variablereturn:"$()"},wrapper:l},"<smartcard.startreader":{attributes:{slot:u,variablereturn:"$()"},wrapper:l},"<smartcard.transmitAPDU":{attributes:{slot:u,header:u,LC:u,datafield:u,LE:u,variabledatafieldresponse:u,variableSW:u,variablereturn:"$()"},wrapper:l},"<smartcard.closereader":{attributes:{slot:u,variablereturn:"$()"},wrapper:l},"<string.tohex":{attributes:{string:u,variablereturn:"$()"},wrapper:l},"<string.fromhex":{attributes:{string:u,variablereturn:"$()"},wrapper:l},"<crypto.encryptdecrypt":{attributes:{message:u,key:u,cryptotype:u,type:u,variablereturn:"$()"},wrapper:l},"<crypto.lrc":{attributes:{buffer:"$()",size:u,variablereturn:"$()"},wrapper:l},"<crypto.xor":{attributes:{buffer1:u,buffer2:u,size:u,variablereturn:"$()"},wrapper:l},"<crypto.crc":{attributes:{buffer:"$()",size:u,crctype:u,variablereturn:"$()"},wrapper:l},"<system.info":{attributes:{type:u,variablereturn:"$()"},wrapper:l},"<system.gettouchscreen":{attributes:{axisx:u,axisy:u,variablereturn:"$()"},wrapper:l},"<pinpad.open":{attributes:{type:u,variableserialnumber:u,variablereturn:"$()"},wrapper:l},"<pinpad.display":{attributes:{message:u},wrapper:l},"<pinpad.getkey":{attributes:{message:u,timeout:"30",variablereturn:"$()"},wrapper:l},"<pinpad.getpindukpt":{attributes:{message:u,type:u,pan:u,maxlen:u,variablereturnpin:u,variablereturnksn:u,variablereturn:"$()"},wrapper:l},"<pinpad.loadipek":{attributes:{ipek:u,ksn:u,type:u,variablereturn:"$()"},wrapper:l},"<pinpad.close":{attributes:{message:u},wrapper:l},"<emv.open":{attributes:{variablereturn:"$()",mkslot:u,pinpadtype:u,pinpadwk:u,showamount:u},wrapper:l},"<emv.close":{attributes:{variablereturn:"0"},wrapper:l},"<emv.settimeout":{attributes:{seconds:u,variablereturn:"$()"},wrapper:l},"<emv.loadtables":{attributes:{acquirer:u,variablereturn:"$()"},wrapper:l},"<emv.cleanstructures":{attributes:null,wrapper:l},"<emv.adddata":{attributes:{type:u,parameter:u,value:u,variablereturn:"$()"},wrapper:l},"<emv.getinfo":{attributes:{type:u,parameter:u,value:u},wrapper:l},"<emv.inittransaction":{attributes:{variablereturn:"$()"},wrapper:l},"<emv.processtransaction":{attributes:{variablereturn:"$()",ctls:u},wrapper:l},"<emv.finishtransaction":{attributes:{variablereturn:"$()"},wrapper:l},"<emv.removecard":{attributes:{variablereturn:"$()"},wrapper:l},"<parseticket":{attributes:{productmenu:u,ticket:u,message:u,literal:u,variablereturn:"$()"},wrapper:l},"<file.open":{attributes:{mode:u,filename:u,variablehandle:"$()"},wrapper:l},"<file.close":{attributes:{handle:u},wrapper:l},"<file.read":{attributes:{handle:u,size:u,variablebuffer:"$()",variablereturn:"$()"},wrapper:l},"<file.write":{attributes:{handle:u,size:u,buffer:"$()"},wrapper:l},"<input.getvalue":{attributes:{linecaption:u,columncaption:u,caption:u,lineinput:u,columninput:u,minimum:"0",maximum:"50",allowsempty:u,variablereturn:"$()"},wrapper:l},"<string.pad":{attributes:{origin:u,character:u,align:u,length:u,destination:u},wrapper:l},"<time.calculate":{attributes:{operation:u,type:u,date:u,greaterdate:u,value:u,variablereturn:"$()"},wrapper:l}};var h=this.$keywords=this.createKeywordMapper({keyword:e},"identifier");this.$rules={start:[{token:"text",regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:"xml-pe",regex:"<\\?.*?\\?>"},{token:h,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"comment",regex:"<\\!--",next:"comment"},{token:"xml-pe",regex:"<\\!.*?>"},{token:"meta.tag",regex:"<\\/?",next:"tag"},{token:"text",regex:"\\s+"},{token:"constant.character.entity",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}],cdata:[{token:"text",regex:"\\]\\]>",next:"start"},{token:"text",regex:"\\s+"},{token:"text",regex:"(?:[^\\]]|\\](?!\\]>))+"}],comment:[{token:"comment",regex:".*?-->",next:"start"},{token:"comment",regex:".+"}]},i.tag(this.$rules,"tag","start")};r.inherits(o,s),t.PosXmlHighlightRules=o}),define("ace/mode/xml_util",["require","exports","module"],function(e,t,n){function r(e){return[{token:"string",regex:'"',next:e+"_qqstring"},{token:"string",regex:"'",next:e+"_qstring"}]}function i(e,t){return[{token:"string",regex:e,next:t},{token:"constant.language.escape",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"},{defaultToken:"string"}]}t.tag=function(e,t,n,s){e[t]=[{token:"text",regex:"\\s+"},{token:s?function(e){return s[e]?"meta.tag.tag-name."+s[e]:"meta.tag.tag-name"}:"meta.tag.tag-name",regex:"[-_a-zA-Z0-9:]+",next:t+"_embed_attribute_list"},{token:"empty",regex:"",next:t+"_embed_attribute_list"}],e[t+"_qstring"]=i("'",t+"_embed_attribute_list"),e[t+"_qqstring"]=i('"',t+"_embed_attribute_list"),e[t+"_embed_attribute_list"]=[{token:"meta.tag.r",regex:"/?>",next:n},{token:"keyword.operator",regex:"="},{token:"entity.other.attribute-name",regex:"[-_a-zA-Z0-9:]+"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"text",regex:"\\s+"}].concat(r(t))}}),define("ace/mode/behaviour/posxml",["require","exports","module","ace/lib/oop","ace/mode/behaviour/xml","ace/mode/behaviour/cstyle","ace/token_iterator"],function(e,t,n){function u(e,t){var n=!0,r=e.type.split("."),i=t.split(".");return i.forEach(function(e){if(r.indexOf(e)==-1)return n=!1,!1}),n}var r=e("../../lib/oop"),i=e("../behaviour/xml").XmlBehaviour,s=e("./cstyle").CstyleBehaviour,o=e("../../token_iterator").TokenIterator,a=function(){this.inherit(i);var e=this,t="<";this.add("autoclosing","insertion",function(n,r,i,s,a){if(this.keywordsWrappers&&this.keywordsWrappers[t+a])return e.getBehaviours().wrapCompletion.insertion.apply(this,[n,r,i,s,t+a]);if(a==">"){var f=i.getCursorPosition(),l=new o(s,f.row,f.column),c=l.getCurrentToken(),h=!1,p=c?c.value:"";if(!c||!u(c,"meta.tag")&&(!u(c,"text")||!c.value.match("/"))){do c=l.stepBackward(),p=c.value+p,p=c?c.value+p:p;while(c&&(u(c,"string")||u(c,"keyword.operator")||u(c,"entity.attribute-name")||u(c,"text")))}else h=!0;if(!c||!u(c,"meta.tag-name")||l.stepBackward().value.match("/"))return;var d=c.value;return h&&(d=d.substring(0,f.column-c.start)),p="<"+p,this.keywordsWrappers&&this.keywordsWrappers[p]?e.getBehaviours().wrapCompletion.insertion.apply(this,[n,r,i,s,p]):{text:"></"+d+">",selection:[1,1]}}})};r.inherits(a,i),t.PosXmlBehaviour=a}),define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle","ace/token_iterator"],function(e,t,n){function u(e,t){var n=!0,r=e.type.split("."),i=t.split(".");return i.forEach(function(e){if(r.indexOf(e)==-1)return n=!1,!1}),n}var r=e("../../lib/oop"),i=e("../behaviour").Behaviour,s=e("./cstyle").CstyleBehaviour,o=e("../../token_iterator").TokenIterator,a=function(){this.inherit(s,["string_dquotes"]);var e=this;this.add("autoclosing","insertion",function(t,n,r,i,s){if(s==">"){var a=r.getCursorPosition(),f=new o(i,a.row,a.column),l=f.getCurrentToken(),c=!1,h=l.value;if(!l||!u(l,"meta.tag")&&(!u(l,"text")||!l.value.match("/"))){do l=f.stepBackward(),h=l.value+h;while(l&&(u(l,"string")||u(l,"keyword.operator")||u(l,"entity.attribute-name")||u(l,"text")))}else c=!0;if(!l||!u(l,"meta.tag-name")||f.stepBackward().value.match("/"))return;var p=l.value;return c&&(p=p.substring(0,a.column-l.start)),h="<"+h,this.keywordsWrappers&&this.keywordsWrappers[h]?e.getBehaviours().wrapCompletion.insertion.apply(this,[t,n,r,i,h]):{text:"></"+p+">",selection:[1,1]}}}),this.add("autoindent","insertion",function(e,t,n,r,i){if(i=="\n"){var s=n.getCursorPosition(),o=r.doc.getLine(s.row),u=o.substring(s.column,s.column+2);if(u=="</"){var a=this.$getIndent(r.doc.getLine(s.row))+r.getTabString(),f=this.$getIndent(r.doc.getLine(s.row));return{text:"\n"+a+"\n"+f,selection:[1,a.length,1,a.length]}}}}),this.add("wrapCompletion","insertion",function(e,t,n,r,i){if(!this.keywordsWrappers)return;var s=this.keywordsWrappers[i];if(!s)return;i=s.wrapper(i);var o=i.indexOf(">")+1,u=n.getCursorPosition();u.column-=this.$getIndent.length-1;var a=r.getLine(u.row),f=" ";while(!!~i.indexOf(a[u.column-1])){if(a[u.column-1]===f&&a[u.column-2]===f)break;n.selection.selectLeft();if(a[u.column-1]==="<")break;u.column--}var l=n.getSelectionRange();return l&&l.start.column!==l.end.column&&(l.end.column-=1,r.remove(l)),{text:i,selection:[o,o]}})};r.inherits(a,i),t.XmlBehaviour=a}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t,n){var r=e("../../lib/oop"),i=e("../behaviour").Behaviour,s=e("../../token_iterator").TokenIterator,o=e("../../lib/lang"),u=["text","paren.rparen","punctuation.operator"],a=["text","paren.rparen","punctuation.operator","comment"],f=0,l=-1,c="",h=0,p=-1,d="",v="",m=function(){m.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new s(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",u)){var i=new s(t,n.row,n.column+1);if(!this.$matchTokenType(i.getCurrentToken()||"text",u))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",a)},m.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},m.recordAutoInsert=function(e,t,n){var r=e.getCursorPosition(),i=t.doc.getLine(r.row);this.isAutoInsertedClosing(r,i,c[0])||(f=0),l=r.row,c=n+i.substr(r.column),f++},m.recordMaybeInsert=function(e,t,n){var r=e.getCursorPosition(),i=t.doc.getLine(r.row);this.isMaybeInsertedClosing(r,i)||(h=0),p=r.row,d=i.substr(0,r.column)+n,v=i.substr(r.column),h++},m.isAutoInsertedClosing=function(e,t,n){return f>0&&e.row===l&&n===c[0]&&t.substr(e.column)===c},m.isMaybeInsertedClosing=function(e,t){return h>0&&e.row===p&&t.substr(e.column)===v&&t.substr(0,e.column)==d},m.popAutoInsertedClosing=function(){c=c.substr(1),f--},m.clearMaybeInsertedClosing=function(){h=0,p=-1},this.add("braces","insertion",function(e,t,n,r,i){var s=n.getCursorPosition(),u=r.doc.getLine(s.row);if(i=="{"){var a=n.getSelectionRange(),f=r.doc.getTextRange(a);if(f!==""&&f!=="{"&&n.getWrapBehavioursEnabled())return{text:"{"+f+"}",selection:!1};if(m.isSaneInsertion(n,r))return/[\]\}\)]/.test(u[s.column])?(m.recordAutoInsert(n,r,"}"),{text:"{}",selection:[1,1]}):(m.recordMaybeInsert(n,r,"{"),{text:"{",selection:[1,1]})}else if(i=="}"){var l=u.substring(s.column,s.column+1);if(l=="}"){var c=r.$findOpeningBracket("}",{column:s.column+1,row:s.row});if(c!==null&&m.isAutoInsertedClosing(s,u,i))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else if(i=="\n"||i=="\r\n"){var p="";m.isMaybeInsertedClosing(s,u)&&(p=o.stringRepeat("}",h),m.clearMaybeInsertedClosing());var l=u.substring(s.column,s.column+1);if(l=="}"||p!==""){var d=r.findMatchingBracket({row:s.row,column:s.column},"}");if(!d)return null;var v=this.getNextLineIndent(e,u.substring(0,s.column),r.getTabString()),g=this.$getIndent(u);return{text:"\n"+v+"\n"+g+p,selection:[1,v.length,1,v.length]}}}}),this.add("braces","deletion",function(e,t,n,r,i){var s=r.doc.getTextRange(i);if(!i.isMultiLine()&&s=="{"){var o=r.doc.getLine(i.start.row),u=o.substring(i.end.column,i.end.column+1);if(u=="}")return i.end.column++,i;h--}}),this.add("parens","insertion",function(e,t,n,r,i){if(i=="("){var s=n.getSelectionRange(),o=r.doc.getTextRange(s);if(o!==""&&n.getWrapBehavioursEnabled())return{text:"("+o+")",selection:!1};if(m.isSaneInsertion(n,r))return m.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(i==")"){var u=n.getCursorPosition(),a=r.doc.getLine(u.row),f=a.substring(u.column,u.column+1);if(f==")"){var l=r.$findOpeningBracket(")",{column:u.column+1,row:u.row});if(l!==null&&m.isAutoInsertedClosing(u,a,i))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,i){var s=r.doc.getTextRange(i);if(!i.isMultiLine()&&s=="("){var o=r.doc.getLine(i.start.row),u=o.substring(i.start.column+1,i.start.column+2);if(u==")")return i.end.column++,i}}),this.add("brackets","insertion",function(e,t,n,r,i){if(i=="["){var s=n.getSelectionRange(),o=r.doc.getTextRange(s);if(o!==""&&n.getWrapBehavioursEnabled())return{text:"["+o+"]",selection:!1};if(m.isSaneInsertion(n,r))return m.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if(i=="]"){var u=n.getCursorPosition(),a=r.doc.getLine(u.row),f=a.substring(u.column,u.column+1);if(f=="]"){var l=r.$findOpeningBracket("]",{column:u.column+1,row:u.row});if(l!==null&&m.isAutoInsertedClosing(u,a,i))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,i){var s=r.doc.getTextRange(i);if(!i.isMultiLine()&&s=="["){var o=r.doc.getLine(i.start.row),u=o.substring(i.start.column+1,i.start.column+2);if(u=="]")return i.end.column++,i}}),this.add("string_dquotes","insertion",function(e,t,n,r,i){if(i=='"'||i=="'"){var s=i,o=n.getSelectionRange(),u=r.doc.getTextRange(o);if(u!==""&&u!=="'"&&u!='"'&&n.getWrapBehavioursEnabled())return{text:s+u+s,selection:!1};var a=n.getCursorPosition(),f=r.doc.getLine(a.row),l=f.substring(a.column-1,a.column);if(l=="\\")return null;var c=r.getTokens(o.start.row),h=0,p,d=-1;for(var v=0;v<c.length;v++){p=c[v],p.type=="string"?d=-1:d<0&&(d=p.value.indexOf(s));if(p.value.length+h>o.start.column)break;h+=c[v].value.length}if(!p||d<0&&p.type!=="comment"&&(p.type!=="string"||o.start.column!==p.value.length+h-1&&p.value.lastIndexOf(s)===p.value.length-1)){if(!m.isSaneInsertion(n,r))return;return{text:s+s,selection:[1,1]}}if(p&&p.type==="string"){var g=f.substring(a.column,a.column+1);if(g==s)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,i){var s=r.doc.getTextRange(i);if(!i.isMultiLine()&&(s=='"'||s=="'")){var o=r.doc.getLine(i.start.row),u=o.substring(i.start.column+1,i.start.column+2);if(u==s)return i.end.column++,i}})};r.inherits(m,i),t.CstyleBehaviour=m}),define("ace/mode/folding/posxml",["require","exports","module","ace/lib/oop","ace/mode/folding/mixed","ace/mode/folding/xml","ace/mode/folding/cstyle"],function(e,t,n){var r=e("../../lib/oop"),i=e("./mixed").FoldMode,s=e("./xml").FoldMode,o=e("./cstyle").FoldMode,u=t.FoldMode=function(){i.call(this,new s({display:1,cleandisplay:1,inputinteger:1,inputoption:1,inputmoney:1,inputformat:1,print:1,printbig:1,paperfeed:1,inputfloat:1,preconnect:1,shutdownmodem:1,getcardvariable:1,waitkey:1,wait:1,callfunction:1,integervariable:1,stringvariable:1,substring:1,stringtoint:1,inttostring:1,"string.getvaluebykey":1,menu:1,menuwithheader:1,readfile:1,editfile:1,integeroperator:1,adjustdatetime:1,getdatetime:1,checkpaperout:1,mathematicaloperation:1,joinstring:1,deletefile:1,printbarcode:1,waitkeytimeout:1,execute:1,"while":1,"break":1,openserialport:1,readserialport:1,writeserialport:1,closeserialport:1,"string.length":1,exit:1,downloadfile:1,readfilebyindex:1,displaybitmap:1,printbitmap:1,readkey:1,unzipfile:1,"else":1,integerconvert:1,"iso8583.initfieldtable":1,"iso8583.initmessage":1,"iso8583.analyzemessage":1,"iso8583.endmessage":1,"iso8583.putfield":1,"iso8583.getfield":1,"string.charat":1,"string.trim":1,"string.find":1,"string.replace":1,"string.substring":1,"string.elements":1,"string.insertat":1,"string.replaceat":1,"string.elementat":1,"string.removeat":1,"network.send":1,"network.receive":1,"system.restart":1,"filesystem.filesize":1,"filesystem.space":1,"filesystem.listfiles":1,"convert.toint":1,predial:1,"network.checkgprssignal":1,"system.checkbattery":1,"network.ping":1,"system.beep":1,"system.readcard":1,"network.hostdisconnect":1,"iso8583.transactmessage":1,"smartcard.insertedcard":1,"smartcard.startreader":1,"smartcard.transmitAPDU":1,"smartcard.closereader":1,"string.tohex":1,"string.fromhex":1,"crypto.encryptdecrypt":1,"crypto.lrc":1,"crypto.xor":1,"crypto.crc":1,"system.info":1,"system.gettouchscreen":1,"pinpad.open":1,"pinpad.display":1,"pinpad.getkey":1,"pinpad.getpindukpt":1,"pinpad.loadipek":1,"pinpad.close":1,"emv.open":1,"emv.settimeout":1,"emv.loadtables":1,"emv.cleanstructures":1,"emv.adddata":1,"emv.getinfo":1,"emv.inittransaction":1,"emv.processtransaction":1,"emv.finishtransaction":1,"emv.removecard":1,parseticket:1,"file.open":1,"file.close":1,"file.read":1,"file.write":1,"input.getvalue":1,"string.pad":1,"time.calculate":1}))};r.inherits(u,i)}),define("ace/mode/folding/mixed",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"],function(e,t,n){var r=e("../../lib/oop"),i=e("./fold_mode").FoldMode,s=t.FoldMode=function(e,t){this.defaultMode=e,this.subModes=t};r.inherits(s,i),function(){this.$getMode=function(e){for(var t in this.subModes)if(e.indexOf(t)===0)return this.subModes[t];return null},this.$tryMode=function(e,t,n,r){var i=this.$getMode(e);return i?i.getFoldWidget(t,n,r):""},this.getFoldWidget=function(e,t,n){return this.$tryMode(e.getState(n-1),e,t,n)||this.$tryMode(e.getState(n),e,t,n)||this.defaultMode.getFoldWidget(e,t,n)},this.getFoldWidgetRange=function(e,t,n){var r=this.$getMode(e.getState(n-1));if(!r||!r.getFoldWidget(e,t,n))r=this.$getMode(e.getState(n));if(!r||!r.getFoldWidget(e,t,n))r=this.defaultMode;return r.getFoldWidgetRange(e,t,n)}}.call(s.prototype)}),define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/range","ace/mode/folding/fold_mode","ace/token_iterator"],function(e,t,n){var r=e("../../lib/oop"),i=e("../../lib/lang"),s=e("../../range").Range,o=e("./fold_mode").FoldMode,u=e("../../token_iterator").TokenIterator,a=t.FoldMode=function(e){o.call(this),this.voidElements=e||{}};r.inherits(a,o),function(){this.getFoldWidget=function(e,t,n){var r=this._getFirstTagInLine(e,n);return r.closing?t=="markbeginend"?"end":"":!r.tagName||this.voidElements[r.tagName.toLowerCase()]?"":r.selfClosing?"":r.value.indexOf("/"+r.tagName)!==-1?"":"start"},this._getFirstTagInLine=function(e,t){var n=e.getTokens(t),r="";for(var s=0;s<n.length;s++){var o=n[s];o.type.indexOf("meta.tag")===0?r+=o.value:r+=i.stringRepeat(" ",o.value.length)}return this._parseTag(r)},this.tagRe=/^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/,this._parseTag=function(e){var t=this.tagRe.exec(e),n=this.tagRe.lastIndex||0;return this.tagRe.lastIndex=0,{value:e,match:t?t[2]:"",closing:t?!!t[3]:!1,selfClosing:t?!!t[5]||t[2]=="/>":!1,tagName:t?t[4]:"",column:t[1]?n+t[1].length:n}},this._readTagForward=function(e){var t=e.getCurrentToken();if(!t)return null;var n="",r;do if(t.type.indexOf("meta.tag")===0){if(!r)var r={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()};n+=t.value;if(n.indexOf(">")!==-1){var i=this._parseTag(n);return i.start=r,i.end={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()+t.value.length},e.stepForward(),i}}while(t=e.stepForward());return null},this._readTagBackward=function(e){var t=e.getCurrentToken();if(!t)return null;var n="",r;do if(t.type.indexOf("meta.tag")===0){r||(r={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()+t.value.length}),n=t.value+n;if(n.indexOf("<")!==-1){var i=this._parseTag(n);return i.end=r,i.start={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()},e.stepBackward(),i}}while(t=e.stepBackward());return null},this._pop=function(e,t){while(e.length){var n=e[e.length-1];if(!t||n.tagName==t.tagName)return e.pop();if(this.voidElements[t.tagName])return;if(this.voidElements[n.tagName]){e.pop();continue}return null}},this.getFoldWidgetRange=function(e,t,n){var r=this._getFirstTagInLine(e,n);if(!r.match)return null;var i=r.closing||r.selfClosing,o=[],a;if(!i){var f=new u(e,n,r.column),l={row:n,column:r.column+r.tagName.length+2};while(a=this._readTagForward(f)){if(a.selfClosing){if(!o.length)return a.start.column+=a.tagName.length+2,a.end.column-=2,s.fromPoints(a.start,a.end);continue}if(a.closing){this._pop(o,a);if(o.length==0)return s.fromPoints(l,a.start)}else o.push(a)}}else{var f=new u(e,n,r.column+r.match.length),c={row:n,column:r.column};while(a=this._readTagBackward(f)){if(a.selfClosing){if(!o.length)return a.start.column+=a.tagName.length+2,a.end.column-=2,s.fromPoints(a.start,a.end);continue}if(!a.closing){this._pop(o,a);if(o.length==0)return a.start.column+=a.tagName.length+2,s.fromPoints(a.start,c)}else o.push(a)}}}}.call(a.prototype)}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){var r=e("../../lib/oop"),i=e("../../range").Range,s=e("./fold_mode").FoldMode,o=t.FoldMode=function(){};r.inherits(o,s),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(e,t,n){var r=e.getLine(n),i=r.match(this.foldingStartMarker);if(i){var s=i.index;return i[1]?this.openingBracketBlock(e,i[1],n,s):e.getCommentFoldRange(n,s+i[0].length,1)}if(t!=="markbeginend")return;var i=r.match(this.foldingStopMarker);if(i){var s=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],n,s):e.getCommentFoldRange(n,s,-1)}}}.call(o.prototype)})