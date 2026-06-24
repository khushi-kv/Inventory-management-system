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
        url:
          process.env.NODE_ENV === "production"
            ? "https://inventory-management-system-dhhj.onrender.com/api/v1"
            : "http://localhost:5001/api/v1",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    //  (recommended for protected APIs)
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["src/**/*.module.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
