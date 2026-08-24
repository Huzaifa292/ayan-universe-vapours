"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, Sparkles } from "lucide-react";
import { ProductCard, Product } from "./ProductCard";

interface ShopViewProps {
  products: Product[];
  activeCategory: "all" | "juice" | "pod" | "device" | "coil" | "accessory";
  onCategoryChange: (category: "all" | "juice" | "pod" | "device" | "coil" | "accessory") => void;
  onProductClick: (product: Product) => void;
  onHoverColor: (color: string) => void;
  onCheckout?: (product: Product) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  activeCategory,
  onCategoryChange,
  onProductClick,
  onHoverColor,
  onCheckout,
  searchQuery,
  onSearchQueryChange,
}) => {
  const [sortBy, setSortBy] = useState<"default" | "name-asc" | "name-desc" | "nicotine">("default");

  // Filter and sort products
  const processedProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    if (activeCategory !== "all") {
      result = result.filter((prod) => {
        const cat = prod.id.startsWith("device-") 
          ? "device" 
          : prod.id.startsWith("pod-") 
          ? "pod" 
          : prod.id.startsWith("coil-")
          ? "coil"
          : prod.id.startsWith("accessory-")
          ? "accessory"
          : "juice";
        return cat === activeCategory;
      });
    }

    // 2. Search Query Filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (prod) =>
          prod.name.toLowerCase().includes(query) ||
          prod.flavor.toLowerCase().includes(query) ||
          prod.puffs.toLowerCase().includes(query)
      );
    }

    // 3. Sorting
    if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "nicotine") {
      // Sort juices by nicotine level (35mg first, then 50mg)
      result.sort((a, b) => {
        const aNic = a.battery.includes("50mg") ? 50 : 35;
        const bNic = b.battery.includes("50mg") ? 50 : 35;
        return bNic - aNic;
      });
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div className="shop-view-page reveal-on-scroll in-view">
      <div className="shop-header-banner">
        <span className="section-subtitle">Catalog Directory</span>
        <h1 className="section-title">Ayan Universe Marketplace</h1>
        <p className="shop-banner-desc">
          Browse through Pakistan's premier collections of premium pods, mods, and Tokyo E-Juices. 
          Use search filters to instantly find your favorite flavor profiles.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="shop-filters-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search flavor, device name, puffs..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="search-field"
          />
        </div>

        <div className="filter-controls-group">
          <div className="sort-select-wrapper">
            <ArrowUpDown size={14} className="sort-icon" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="sort-dropdown"
            >
              <option value="default">Default Sorting</option>
              <option value="name-asc">Name (A - Z)</option>
              <option value="name-desc">Name (Z - A)</option>
              <option value="nicotine">Nicotine strength (High - Low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs inside page */}
      <div className="category-filters">
        <button
          className={`filter-tab ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => onCategoryChange("all")}
        >
          All Items
        </button>
        <button
          className={`filter-tab ${activeCategory === "juice" ? "active" : ""}`}
          onClick={() => onCategoryChange("juice")}
        >
          E-Juices
        </button>
        <button
          className={`filter-tab ${activeCategory === "pod" ? "active" : ""}`}
          onClick={() => onCategoryChange("pod")}
        >
          Pods
        </button>
        <button
          className={`filter-tab ${activeCategory === "device" ? "active" : ""}`}
          onClick={() => onCategoryChange("device")}
        >
          Vape Devices
        </button>
        <button
          className={`filter-tab ${activeCategory === "coil" ? "active" : ""}`}
          onClick={() => onCategoryChange("coil")}
        >
          Coils
        </button>
      </div>

      {/* Results grid */}
      {processedProducts.length > 0 ? (
        <div className="products-grid">
          {processedProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onHover={onHoverColor}
              onClick={onProductClick}
              onCheckout={onCheckout}
            />
          ))}
        </div>
      ) : (
        <div className="empty-shop-state">
          <Sparkles size={48} className="empty-state-icon" />
          <h3>No Flavors Found</h3>
          <p>We couldn't find any products matching your search query. Try typing another keyword!</p>
          <button onClick={() => { onSearchQueryChange(""); onCategoryChange("all"); }} className="btn btn-secondary">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
