import { useState, useEffect } from "react";

function useSearch(products, filter) {
  const [filtered, setFiltered] = useState(products); // Initialize with products

  useEffect(() => {
    // If no filter is provided, reset to the full product list
    console.log("from use Search");
    console.log(filtered);
    console.log(filter);
    const { filtertype, value } = filter;

    let filteredProducts = [...products]; // Copy products to avoid direct mutation

    switch (filtertype) {
      case "title":
        filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(value.toLowerCase())
        );
        break;
      case "price":
        filteredProducts = products.filter((product) => product.price < value);
        break;
      case "category":
        filteredProducts = products.filter(
          (product) => product.category === value
        );
        break;
      case "rating":
        filteredProducts = products.filter(
          (product) => product.rating.rate >= value
        );
        break;
      default:
        filteredProducts = products; // Default case: no filtering
        break;
    }

    // Only update the state if the filtered results are different from the current state
    if (JSON.stringify(filteredProducts) !== JSON.stringify(filtered)) {
      setFiltered(filteredProducts);
    }
  }, [products, filter ,filtered]); // Re-run only if products or filter change

  return { filteredData: filtered };
}

export default useSearch;
