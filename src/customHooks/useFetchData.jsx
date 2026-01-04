import { useState, useEffect, useMemo } from "react";
import httpService from "../apiServices/httpService";

const useFetchData = (
  url,
  method = "GET",
  headers = {}
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const memoizedHeaders = useMemo(() => headers, [headers]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let response = await httpService[method.toLowerCase()](url, {
          headers: memoizedHeaders,
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method]);

  return { data, loading, error };
};

export default useFetchData;
