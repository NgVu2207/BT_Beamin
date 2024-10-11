"use client";
import HeaderNav from "@/components/headerNav";
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  getProductPagination,
  getProducts,
  getProductType,
  Product,
  ProductType,
  TodayFood,
} from "../apis/fetchApi";

interface PaginatedProducts {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
}

export default function Home() {
  const [todayFood, setTodayFood] = useState<TodayFood>({
    title: "Hôm Nay ăn gì",
    items: [],
  });

  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchPaginatedProducts = async () => {
      try {
        const data = await getProductPagination(currentPage, 8);
        console.log("Paginated Products:", data);
        setPaginatedProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch paginated products:", error);
      }
    };

    fetchPaginatedProducts();
  }, [currentPage]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProducts();
        setTodayFood({ title: "Hôm Nay ăn gì", items: data });
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchProductType = async () => {
      if (selectedCategoryId !== null) {
        try {
          const data = await getProductType(selectedCategoryId);
          console.log("product type data", data);
          setProductTypes(data);
        } catch (error) {
          console.error("Failed to fetch product types:", error);
        }
      }
    };

    fetchProductType();
  }, [selectedCategoryId]);

  const items = [
    {
      name: "Gà Rán",
      imageSrc: "/images/Ga.png",
      description: "Thức ăn nhanh",
      categoryId: 2,
    },
    {
      name: "Burger",
      imageSrc: "/images/burger.jpg",
      description: "Thức ăn nhanh",
      categoryId: 3,
    },
    {
      name: "Bún",
      imageSrc: "/images/noddle.png",
      description: "Thức ăn nhanh",
      categoryId: 4,
    },
    {
      name: "Mì",
      imageSrc: "/images/noddle.png",
      description: "Thức ăn nhanh",
      categoryId: 5,
    },
    {
      name: "Cơm",
      imageSrc: "/images/noddle.png",
      description: "Thức ăn nhanh",
      categoryId: 1,
    },
  ];

  const banneritems = [
    {
      id: "1",
      name: "anh 1",
      url: "/images/map1.png",
    },
    {
      id: "2",
      name: "anh 2",
      url: "/images/map2.png",
    },
    {
      id: "3",
      name: "anh 32",
      url: "/images/map3.png",
    },
    {
      id: "3",
      name: "anh 32",
      url: "/images/map4.png",
    },
  ];

  const handleMenuClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 pt-3 pl-8 pr-8  z-40">
          <div className="flex flex-col fixed  bg-white w-64 rounded-2xl  pl-3 pt-2  pb-5 gap-3  ">
            <span>Thực đơn </span>
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100"
                onClick={() => handleMenuClick(item.categoryId)}
              >
                <div className="flex flex-row items-center gap-1">
                  <Image
                    src={item.imageSrc}
                    width={30}
                    height={30}
                    alt={item.description}
                  />
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-9 w-full  pt-3 pr-8 gap-3 flex flex-col">
          <ScrollBar items={banneritems}></ScrollBar>
          <ScrollFood items={todayFood}></ScrollFood>

          {/* danh sách theo loại */}
          <div className="grid grid-cols-4 gap-4 pt-4">
            {productTypes.map((product) => (
              <div
                key={product.product_id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <Image
                  src={product.attributes.image}
                  width={100}
                  height={100}
                  alt={product.product_name}
                  className="object-cover w-full h-32 mb-2 rounded-lg"
                />
                <h3 className="text-lg font-semibold">
                  {product.product_name}
                </h3>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}

          {/* Hiển thị sản phẩm */}
          <h1 className="text-center ">Sản phẩm theo pagination</h1>
          <div className="grid grid-cols-4 gap-4 pt-4">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <div
                  key={product.product_id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <Image
                    src={`/${product.attributes[0].image}`} // Dữ liệu ảnh từ `attributes`
                    width={100}
                    height={100}
                    alt={product.product_name}
                    className="object-cover w-full h-32 mb-2 rounded-lg"
                  />
                  <h3 className="text-lg font-semibold">
                    {product.product_name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <p className="text-sm text-gray-500">
                    Price: {product.attributes[0].price} VNĐ
                  </p>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Previous
            </button>
            <span className="mx-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
