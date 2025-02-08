import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  app.get("/api/products", async (req, res) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });

  app.get("/api/products/category/:category", async (req, res) => {
    const products = await storage.getProductsByCategory(req.params.category);
    res.json(products);
  });

  app.get("/api/products/search", async (req, res) => {
    const query = req.query.q?.toString() || '';
    if (!query.trim()) {
      return res.status(400).json({ message: "Search query required" });
    }
    const products = await storage.searchProducts(query);
    res.json(products);
  });

  const httpServer = createServer(app);
  return httpServer;
}