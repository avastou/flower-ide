// vim: noai:ts=4:sw=4

var request = require("request");
var path    = require("path");

var controllers = {};
var server;
var options;

module.exports = function(_server, _options){
    server = _server;
    options = _options;
    return controllers;
};

// Log everything but activity calls (as they are too many)
controllers.log = function(req, res, next){
    if (!~req.url.indexOf("activity")) {
        var date = new Date().toISOString();
        console.log("%s FROM: %s %s %s", date, req.ip,  req.method, req.url);
    }
    next();
};

// In case the user access to the root, let's welcome him...
controllers.root = function(req, res, next){
    if (req.url !== "/") {
        return next();
    }
    //res.redirect(301, "https://docs.cloudwalk.io/pt-BR/walk-compiler/web");
};

// { ":docname" : {
//         "0" : {
//             date   : "date",           // Last active date
//             cursor : { left:0, top:0 } // User cursor position
//         },
//         next : 1
//     }
// }
var activity = {};
function getActivity(docname, req, res, callback) {
    if (!activity[docname]) {
        activity[docname] = { next : 0 };
    }
    var index = activity[docname].next;
    var user = req.body.user;
    if (user) {
        if (user.index === undefined) {
            user = { index : index };
            activity[docname].next++;
        }
        if (!activity[docname][user.index]) {
            activity[docname][user.index] = {
                date   : new Date(),
                cursor : { left:0, top:0 }
            };
        }
    }
    callback(activity, user);
}

// This is the controller for the main url, which is the one
// that will answer with the editable document.
controllers.edit  = function(req, res){
    var docname   = req.params.docname;
    getActivity(docname, req, res, function(activity, user) {
        res.sendfile(path.normalize(__dirname + options.ide_html_path));
    });
};

// This controller allows users to check other users in the document.
controllers.activity = function(req, res){
    var docname = req.body.docname;
    getActivity(docname, req, res, function(activity, user) {
        if (!user) {
            errorLog("Could't build the requesting user in controllers.activity", user);
            res.send(500);
            return;
        }
        var current_date = new Date();
        activity[docname][user.index].date = current_date;
        activity[docname][user.index].cursor = user.cursor;
        var users_in_doc = activity[docname];
        var next = "next";
        var data = {
            users   : {},
            active  : 0,
            total   : 0,
            current : user
        };
        for (var k in users_in_doc) {
            if (k === next) {
                continue;
            }
            data.users[k] = users_in_doc[k];
            if ((current_date - new Date(users_in_doc[k].date)) < 2000) {
                data.users[k].active = true;
                data.active++;
            } else {
                data.users[k].active = false;
            }
            data.total++;
        }
        res.send(data);
    });
};


// This function emits the document's code to the omg-compiler
controllers.compile = function(req, res){
    server.model.getSnapshot(req.query.docname, function(error, state){
        if (error) {
            errorLog("ERROR while getting the snapshot for", req.query.docname, error);
        }
        if (!state || !state.snapshot) {
            res.send({ message : "Something went wrong!" });
            return;
        }
        var data = {};
        data.doc = JSON.stringify({
            Type: "posxml",
            Code: state.snapshot
        });
        console.log("request to:");
        console.log(options.remotes.compiler);
        console.log("data:", data);
        request.post(options.remotes.compiler, {form: data}, function(error, _res, body){
            if (error) {
                errorLog("request to the compiler failed!", error);
                return;
            }
            var json = parseJSON(body);
            console.log("result body:", body);
            if (json.posxml && json.posxml.base64 && req.query.app_id && req.query.access_token) {
                // We have app_id and access_token, so lets put it to the manager
                var data = {};
                var posxml = json.posxml;
                data.posxml = posxml.base64;
                console.log("request to:");
                console.log(options.remotes.manager + req.query.app_id + ".json?access_token=" + req.query.access_token);
                console.log("data:", data);
                request.put(
                options.remotes.manager + req.query.app_id + ".json?access_token=" + req.query.access_token,
                { form: data },
                function(error, _res, body){
                    if (error) {
                        errorLog(req, "request to the manager failed!", error);
                        res.send({ message : "Something went wrong after compiling!" });
                        return;
                    }
                    console.log("result body:", body);
                    // The compilation succeeded, let's send back this message
                    // and the posxml from the compiler.
                    if (_res.statusCode < 400) {
                        res.send({
                            message : "Compilation Succeeded!",
                            posxml  : posxml
                        });
                    } else
                    if (_res.statusCode > 400) {
                        res.send(body);
                    }
                });
            } else {
                errorLog(req, "Couldn't send the data to the Manager, details:" , { json: json, query: req.query });
                json.message = "You're not authorized to do that.";
                res.send(JSON.stringify(json));
            }
        });
    });
};

function parseJSON(data) {
    try {
        return JSON.parse(data);
    } catch(e) {
        console.log("JSON.parse body failed!", e);
        return {};
    }
}

// Not found
controllers.notFound = function(req, res){
    res.send(404);
};

function errorLog(req, message, data) {
    var strdata = "";
    var date = new Date().toISOString();
    for (var k in data) {
        strdata += k + ": " + JSON.stringify(data[k]) + "\n  ";
    }
    console.log("%s FROM: %s %s\n" + message + "\n ", date, req.ip, req.headers["user-agent"], strdata.substr(0, strdata.length - 3));
}
