import React, { useEffect, useState } from "react";
import { getProductType } from "../app/apis/fetchApi";

const ProductTypeList = ({ categoryId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductType = async () => {
      if (categoryId !== null && categoryId !== undefined) {
        try {
          const data = await getProductType(categoryId); 
          console.log(data); 
          setProducts(data); 
        } catch (error) {
          console.log("Error fetching product types:", error);
        }
      }
    };

    fetchProductType();
  }, [categoryId]);

  if (categoryId === null) {
    return <div>Select a category to view products.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {products.length === 0 ? (
          <div>No products found.</div>
        ) : (
          products.map((product) => (
            <div key={product.product_id} className="border p-4">
              <img
                src={product.attributes[0].image}
                alt={product.product_name}
                className="w-full h-40 object-cover"
              />
              <div className="font-bold mt-2">{product.product_name}</div>
              <div className="text-gray-500">
                Price: {product.attributes[0].price} VND
              </div>
              <div className="text-yellow-500">
                Rating: {product.rate} ({product.star} votes)
              </div>
              <p className="mt-2">{product.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductTypeList;
