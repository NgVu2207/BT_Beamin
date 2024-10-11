import axios, { AxiosResponse } from "axios";

const DOMAIN_BE = "http://localhost:8080";

export interface Attribute {
  image: string;
  price: number;
}

export interface Product {
  product_id: number;
  product_name: string;
  attributes: Attribute[];
  user_id: number;
  rate: number | null;
  star: number;
  description: string | null;
  category_id: number;
  create_at: string;
  is_remove: boolean;
}

export interface TodayFood {
  title: string;
  items: Product[];
}

export interface ProductType {
  product_id: number;
  attributes: {
    image: string;
  };
  product_name: string;
  description: string;
}

export interface Category {
  category_id: number;
  category_name: string;
  create_at: string;
  is_remove: boolean;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await axios.get(
      `${DOMAIN_BE}/product/get-all`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductType = async (
  categoryId: number
): Promise<ProductType[]> => {
  const { data } = await axios.get(
    `${DOMAIN_BE}/product/get-product-type/${categoryId}`
  );
  return data;
};

export const getProductPagination = async (page: number, pageSize: number) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${DOMAIN_BE}/product/pagination`,
      {
        params: {
          page: page,
          pageSize: pageSize,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    throw error;
  }
};

export const searchProduct = async (query: string): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await axios.get(
      `${DOMAIN_BE}/product/search`,
      {
        params: { query },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching for products:", error);
    throw error;
  }
};

export const login = async (model: any) => {
  const { data } = await axios.post(`${DOMAIN_BE}/auth/login`, model);
  return data;
};

export const signUp = async (model: any) => {
  const { data } = await axios.post(`${DOMAIN_BE}/auth/sign-up`, model);
  return data;
};

export const createOrder = async (orderData: any, token: string) => {
  try {
    const response = await axios.post(
      `${DOMAIN_BE}/orders`,
      orderData,
      {
        headers: {
          token: token, 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
