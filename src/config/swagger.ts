import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product Inventory API",
      version: "1.0.0",
      description: "API documentation for Product Inventory Backend",
    },
    servers: [
      {
        url: "http://localhost:5001/api/v1",
      },
    ], 
  },
  apis: ["src/**/*.module.ts"],

};

export const swaggerSpec = swaggerJsdoc(options);