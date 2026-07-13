import { Router } from "express";
import { generateOpenApiDocument } from "../../openapi/document.js";

const router = Router();

router.get("/openapi.json", (_req, res) => {
  const doc = generateOpenApiDocument();
  res.json(doc);
});

export default router;