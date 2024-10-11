"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; 
import { searchProduct, Product } from "../apis/fetchApi";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams? searchParams.get("query"):null;
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        try {
          const data = await searchProduct(query);
          setResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Search Results</h1>
      <div className="grid grid-cols-4 gap-8">
        {results.map((product) => (
          <div key={product.product_id} className="border p-4 rounded-lg">
            <img
              src={product.attributes[0].image}
              alt={product.product_name}
              className="w-full h-64 object-cover"
            />
            <h2 className="text-xl font-bold mt-4">{product.product_name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-lg font-semibold mt-4">
              {product.attributes[0].price} VNĐ
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
