import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useDebounce } from "@/hooks/use-debounce";
import { type Product } from "@shared/schema";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { data: results = [] } = useQuery<Product[]>({
    queryKey: ['/api/products/search', { q: debouncedQuery }],
    enabled: debouncedQuery.length > 2
  });

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-white/10 border-transparent focus:border-[#FBBF24]"
      />

      {results && results.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 max-h-[400px] overflow-auto">
          <div className="p-2">
            {results.map((product) => (
              <a
                key={product.id}
                href={`/product/${product.id}`}
                className="block p-2 hover:bg-gray-100 rounded"
              >
                {product.name}
              </a>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}