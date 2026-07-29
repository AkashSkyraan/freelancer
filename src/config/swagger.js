import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./src/docs/openapi.bundle.yaml");

export default (app) => {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};
