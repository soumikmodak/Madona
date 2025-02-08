import { useQuery } from "@tanstack/react-query";
import { ProductGrid } from "@/components/product/product-grid";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products']
  });

  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="h-[300px]" />
      ))}
    </div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-[#1F2937]">Featured Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
