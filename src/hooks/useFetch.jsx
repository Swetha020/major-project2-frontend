import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  const refetch = () => setReload((prev) => prev + 1);

  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));

  }, [url, reload]); 

  return { data, loading, error, refetch }; 
}