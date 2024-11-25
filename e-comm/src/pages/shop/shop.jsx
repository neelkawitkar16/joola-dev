import React, { useState } from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";

export const Shop = () => {
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: Infinity });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handlePriceFilter = (e) => {
    const { name, value } = e.target;
    setSelectedPriceRange((prevRange) => ({
      ...prevRange,
      [name]: value ? parseFloat(value) : Infinity,
    }));
  };

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm);
    const matchesPrice =
      product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>JOOLA Shop</h1>
      </div>

      {/* Filter Section */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          onChange={handleSearchChange}
          className="filterInput"
        />
        <label>
          Min Price:
          <input
            type="number"
            name="min"
            onChange={handlePriceFilter}
            placeholder="0"
            className="filterInput"
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            name="max"
            onChange={handlePriceFilter}
            placeholder="No Limit"
            className="filterInput"
          />
        </label>
      </div>

      <div className="products">
        {/* Render filtered products */}
        {filteredProducts.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
