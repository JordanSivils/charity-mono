import "./register-all.js"
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "../utils/registry.js";

export const generateOpenApiDocument = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Charity Query",
      version: "1.0.0",
      description: "Developer API for querying IRS nonprofit data.",
    },
    servers: [
      {
        url: "https://api.charityquery.com",
      },
    ],
  });
};