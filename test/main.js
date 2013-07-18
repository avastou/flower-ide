// vim: noai:ts=4:sw=4

var should  = require("should");
var request = require("request");
var app     = require("../");

describe("the app", function(){
    it("should get the full doc when anyone tries to get a new document", function(done){
        request("http://localhost:"+app.port+"/testdoc", function(error, res){
            res.statusCode.should.equal(200);
            done();
        });
    });
});
