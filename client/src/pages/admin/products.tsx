
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { productCategories, type InsertProduct } from "@shared/schema";

export default function AdminProducts() {
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState<"furniture" | "electronics">("furniture");
  const { data: products, refetch } = useQuery({ queryKey: ['/api/products'] });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const product: InsertProduct = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      category,
      subcategory: formData.get('subcategory') as string,
      imageUrl: formData.get('imageUrl') as string,
      mrp: Number(formData.get('mrp')),
      discount: Number(formData.get('discount')),
      finalPrice: Number(formData.get('finalPrice')),
    };

    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      setShowForm(false);
      refetch();
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Button onClick={() => setShowForm(true)}>Add Product</Button>
      </div>
      
      {showForm && (
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <Input name="name" placeholder="Product Name" required />
                <Textarea name="description" placeholder="Description" required />
                <Select value={category} onValueChange={(v: "furniture" | "electronics") => setCategory(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                  </SelectContent>
                </Select>
                <Select name="subcategory">
                  <SelectTrigger>
                    <SelectValue placeholder="Subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategories[category].map(sub => (
                      <SelectItem key={sub} value={sub}>
                        {sub.charAt(0).toUpperCase() + sub.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input name="imageUrl" placeholder="Image URL" required />
                <Input name="mrp" type="number" placeholder="MRP" required />
                <Input name="discount" type="number" placeholder="Discount %" required />
                <Input name="finalPrice" type="number" placeholder="Final Price" required />
                <div className="flex gap-2">
                  <Button type="submit">Create Product</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {products?.map((product) => (
          <Card key={product.id}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
