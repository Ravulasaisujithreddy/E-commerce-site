import  { useState, useEffect, useMemo } from "react";
import axios from "axios";
function UseFetch(url, arr = []) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log("Fetching the data for the first Time");
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [...arr]);
  const values = useMemo(
    () => ({
      data: data,
      isLoading: isLoading,
    }),
    [data]
  );
  return values;
}

export default UseFetch;
