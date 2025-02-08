import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useDebounce } from "@/hooks/use-debounce";
import { searchProducts } from "@/lib/products";
import { type Product } from "@shared/schema";
import { Search, Loader2 } from "lucide-react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { data: results = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/search', debouncedQuery],
    queryFn: () => searchProducts(debouncedQuery),
    enabled: debouncedQuery.length > 2
  });

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white/10 border-transparent focus:border-[#FBBF24] pl-10"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          ) : (
            <Search className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>

      {debouncedQuery.length > 2 && results.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 max-h-[400px] overflow-auto">
          <div className="p-2">
            {results.map((product) => (
              <a
                key={product.id}
                href={`/product/${product.id}`}
                className="block p-2 hover:bg-gray-100 rounded"
              >
                <div className="flex items-center gap-2">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-8 h-8 object-cover rounded"
                  />
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">${product.finalPrice}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}