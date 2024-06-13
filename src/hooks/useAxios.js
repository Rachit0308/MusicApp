import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const axiosInstance = axios.create({
    baseURL: "http://164.52.197.9:3008",
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  let controller = new AbortController();

  useEffect(() => {
    return () => controller?.abort();
  }, []);

  const fetchData = async ({ url, method, data = {}, params = {} }) => {
    setLoading(true);

    controller.abort();
    controller = new AbortController();

    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        signal: controller.signal,
      });
      setResponse(result?.data);
      return result?.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request Cancelled", error.message);
      } else {
        setError(error?.response ? error?.response?.data : error?.message);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, fetchData };
};

export default useAxios;
