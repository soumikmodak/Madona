import { type Product, type InsertProduct } from "@shared/schema";

export interface IStorage {
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
}

export class MemStorage implements IStorage {
  private products: Product[];

  constructor() {
    // Initialize with mock data using stock photos
    this.products = [
      {
        id: 1,
        name: "Modern Sofa",
        description: "Elegant and comfortable modern sofa",
        category: "furniture",
        subcategory: "sofas",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
        mrp: 999,
        discount: 10,
        finalPrice: 899
      },
      {
        id: 2,
        name: "Premium Bed",
        description: "Luxurious king-size bed",
        category: "furniture",
        subcategory: "beds",
        imageUrl: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd",
        mrp: 1499,
        discount: 15,
        finalPrice: 1274
      },
      {
        id: 3,
        name: "Minimalist Chair",
        description: "Stylish dining chair",
        category: "furniture",
        subcategory: "chairs",
        imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
        mrp: 199,
        discount: 5,
        finalPrice: 189
      },
      {
        id: 4,
        name: "Premium Laptop",
        description: "High-performance laptop",
        category: "electronics",
        subcategory: "laptops",
        imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        mrp: 1999,
        discount: 20,
        finalPrice: 1599
      },
      {
        id: 5,
        name: "Smartphone",
        description: "Latest smartphone model",
        category: "electronics",
        subcategory: "smartphones",
        imageUrl: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923",
        mrp: 999,
        discount: 10,
        finalPrice: 899
      }
    ];
  }

  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.products.filter(p => p.category === category);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase().trim();
    return this.products.filter(p => 
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.category.toLowerCase().includes(lowercaseQuery) ||
      p.subcategory.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const storage = new MemStorage();