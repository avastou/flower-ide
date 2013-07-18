// vim: noai:ts=4:sw=4

module.exports = function(server, options) {
    var controllers = require("./controllers")(server, options);

    server.use(controllers.log);
    server.post("/activity", controllers.activity);
    server.get("/compile", controllers.compile);
    server.get("/:docname", controllers.edit);
    server.use("/", controllers.root);
    server.use(controllers.notFound);
};
