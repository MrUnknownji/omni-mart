import { useState, useCallback } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions extends Omit<AxiosRequestConfig, "url" | "method"> {
  method?: HttpMethod;
  body?: any;
}

interface ApiHook {
  request: <T = any>(url: string, options?: RequestOptions) => Promise<T>;
  loading: boolean;
  error: string | null;
}

const useApi = (): ApiHook => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async <T = any>(
      url: string,
      { method = "GET", body, ...options }: RequestOptions = {}
    ): Promise<T> => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios<T>({
          url,
          method,
          data: body,
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
        });

        setLoading(false);
        return response.data;
      } catch (e) {
        let errorMessage: string;

        if (axios.isAxiosError(e)) {
          const axiosError = e as AxiosError<{ message: string }>;
          
          // Resilient Fallback: If backend is not configured (503) or offline
          if (axiosError.response?.status === 503 || axiosError.code === "ERR_NETWORK" || axiosError.response?.status === 404) {
            console.warn(`Backend unavailable for ${url}. Using local fallback data.`);
            
            // Dynamic import or require to avoid circular dependencies if needed
            // For now, simple fallback based on URL
            if (url.includes("products")) return require("../Context/Data").dummyProducts as unknown as T;
            if (url.includes("user")) return require("../Context/Data").dummyUser as unknown as T;
            if (url.includes("cart")) return require("../Context/Data").dummyCartItems as unknown as T;
            if (url.includes("categories")) return require("../Context/Data").dummyCategories as unknown as T;
            if (url.includes("brands")) return require("../Context/Data").dummyBrands as unknown as T;
            if (url.includes("orders")) return require("../Context/Data").dummyOrders as unknown as T;
            if (url.includes("reviews")) return require("../Context/Data").dummyReviews as unknown as T;
            if (url.includes("wishlist")) return require("../Context/Data").dummyWishlist as unknown as T;
            
            // Default empty array or object for unknown routes
            return [] as unknown as T;
          }

          errorMessage =
            axiosError.response?.data?.message || axiosError.message;
        } else if (e instanceof Error) {
          errorMessage = e.message;
        } else {
          errorMessage = String(e);
        }

        console.error("API request error:", errorMessage);
        setError(errorMessage);
        setLoading(false);
        throw new Error(errorMessage);
      }
    },
    []
  );

  return { request, loading, error };
};

export default useApi;
