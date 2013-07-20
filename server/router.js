// vim: noai:ts=4:sw=4

module.exports = function(server, options) {
    var controllers = require("./controllers")(server, options);

    server.use(controllers.log);
    server.post("/ide/activity", controllers.activity);
    server.get("/ide/compile", controllers.compile);
    server.get("/ide/:docname", controllers.edit);
    server.use("/ide", controllers.root);
    server.use(controllers.notFound);
};
