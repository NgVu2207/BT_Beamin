'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Pagination } from 'antd';
import { Product, searchProduct } from '../app/apis/fetchApi'; 
import Link from 'next/link';

export default function SearchPage() {
  const [lstProduct, setLstProduct] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0); 
  const searchParams = useSearchParams();
  const nameProduct = searchParams?.get("nameProduct") || '';  

  
  useEffect(() => {
    if (nameProduct) {
      searchProduct(nameProduct, "1").then(result => {
        setLstProduct(result.items);  
        setTotalItems(result.totalItems);  
      }).catch(error => {
        console.error("Error fetching products:", error);
      });
    }
  }, [nameProduct]);

  return (
    <div className="container mx-auto p-4">
      

      {/* Hiển thị sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lstProduct.length > 0 ? (
          lstProduct.map((product) => (
            <div key={product.product_id} className="border p-4 rounded-lg shadow-md">
              <Link href={`/product/${product.product_id}`}>
                <img
                  src={product.attributes[0]?.image}
                  alt={product.product_name}
                  className="w-full h-40 object-cover mb-4"
                />
                <h3 className="text-lg font-semibold">{product.product_name}</h3>
                <p className="text-sm text-gray-500">Price: {product.attributes[0]?.price} VNĐ</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào tìm thấy.</p>
        )}
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="mt-4">
          <Pagination
            current={1}  
            total={totalItems}
            pageSize={10}  
            onChange={(pageNumber) => {
              
              searchProduct(nameProduct, pageNumber.toString()).then(result => {
                setLstProduct(result.items);
                setTotalItems(result.totalItems);
              });
            }}
          />
        </div>
      )}
    </div>
  );
}
