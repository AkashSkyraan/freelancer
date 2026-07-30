import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Freelancer API",
      version: "1.0.0",
      description: "Backend API Documentation",
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
    ],
  },

  apis: ["./src/swagger/*.js"],
};

export default function setupSwagger(app) {
  const swaggerSpec = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
