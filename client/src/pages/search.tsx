import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ProductGrid } from "@/components/product/product-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { searchProducts } from "@/lib/products";

export default function SearchResults() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const query = searchParams.get('q') || '';

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products/search', query],
    queryFn: () => searchProducts(query),
    enabled: !!query
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
      <h1 className="text-4xl font-bold text-[#1F2937]">
        Search Results for "{query}"
      </h1>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found matching your search.</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
