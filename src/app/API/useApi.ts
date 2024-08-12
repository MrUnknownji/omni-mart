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
