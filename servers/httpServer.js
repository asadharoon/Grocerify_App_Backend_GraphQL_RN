const app = require("express")();
const http = require("http");
const bodyParser = require("body-parser");
const { graphqlUploadExpress } = require("graphql-upload");
app.use(bodyParser.json({ limit: "70mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "70mb" }));
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 5 }));
const httpServer = http.createServer(app);
httpServer.listen(8000, () => {
  console.log("server is listening on ", 8000);
});
module.exports = { app: app, http: http };
