import React, { useContext} from "react";
import { FilterContext } from "../Provider/FilterProvider";
import { ThemeContext } from "../App"; // Ensure you have ThemeContext set up in a ThemeProvider

function Sidebar() {
  const { setfilterType, setSearch } = useContext(FilterContext);
  const { theme } = useContext(ThemeContext);

  const handlePriceChange = (e) => {
    setfilterType("price");
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setfilterType("category");
    setSearch(e.target.value);
  };

  const handleRatingChange = (e) => {
    setfilterType("rating");
    setSearch(e.target.value);
  };

  // Conditional classes based on theme
  const containerClass =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const labelClass = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const inputClass = theme === "dark" ? "text-blue-300" : "text-blue-600";

  return (
    <div
      className={`w-full sm:w-[40%] md:w-[30%] lg:w-[20%] h-screen shadow-lg p-4 sm:p-6 overflow-y-auto ${containerClass}`}
    >
      <div className="mb-8">
        <label className={`block text-lg font-semibold mb-4 ${labelClass}`}>
          Sort by Price
        </label>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="price-50-100"
              name="price"
              value={50}
              onChange={handlePriceChange}
              className={`w-4 h-4 ${inputClass}`}
            />
            <label htmlFor="price-50-100" className={`ml-2 ${labelClass}`}>
              Less Than 50
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="price-100-200"
              name="price"
              value={100}
              onChange={handlePriceChange}
              className={`w-4 h-4 ${inputClass}`}
            />
            <label htmlFor="price-100-200" className={`ml-2 ${labelClass}`}>
              Less Than 100
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="price-200-plus"
              name="price"
              value={200}
              onChange={handlePriceChange}
              className={`w-4 h-4 ${inputClass}`}
            />
            <label htmlFor="price-200-plus" className={`ml-2 ${labelClass}`}>
              Less Than 200
            </label>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <label className={`block text-lg font-semibold mb-4 ${labelClass}`}>
          Sort by Category
        </label>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="category-mens"
              name="category"
              value="men's clothing"
              onChange={handleCategoryChange}
              className={`w-4 h-4 ${inputClass}`}
            />
            <label htmlFor="category-mens" className={`ml-2 ${labelClass}`}>
              men's clothing
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="category-jewelery"
              name="category"
              value="jewelery"
              onChange={handleCategoryChange}
              className={`w-4 h-4 ${inputClass}`}
            />
            <label htmlFor="category-jewelery" className={`ml-2 ${labelClass}`}>
              jewelery
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="category-electronics"
              name="category"
              value="electronics"
              onChange={handleCategoryChange}
              className={`w-4 h-4 ${inputClass}`}
            />
            <label
              htmlFor="category-electronics"
              className={`ml-2 ${labelClass}`}
            >
              electronics
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="category-womens"
              name="category"
              value="women's clothing"
              onChange={handleCategoryChange}
              className={`w-4 h-4 ${inputClass}`}
            />
            <label htmlFor="category-womens" className={`ml-2 ${labelClass}`}>
              women's clothing
            </label>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <label className={`block text-lg font-semibold mb-4 ${labelClass}`}>
          Sort by Ratings
        </label>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="More Than 4"
              name="rating"
              value={4}
              onChange={handleRatingChange}
              className={`w-4 h-4 ${inputClass}`}
            />
            <label htmlFor="More Than 4" className={`ml-2 ${labelClass}`}>
              4 and More
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="More Than 3"
              name="rating"
              value={3}
              onChange={handleRatingChange}
              className={`w-4 h-4 ${inputClass}`}
            />
            <label htmlFor="More Than 3" className={`ml-2 ${labelClass}`}>
              3 and More
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="More Than 4"
              name="rating"
              value={2}
              onChange={handleRatingChange}
              className={`w-4 h-4 ${inputClass}`}
            />
            <label htmlFor="More Than 4" className={`ml-2 ${labelClass}`}>
              2 and More
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="Five Star"
              name="rating"
              value={1}
              onChange={handleRatingChange}
              className={`w-4 h-4 ${inputClass}`}
            />
            <label htmlFor="Five Star" className={`ml-2 ${labelClass}`}>
              1 And More
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
