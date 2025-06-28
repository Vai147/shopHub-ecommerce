import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';
import { 
  FunnelIcon, 
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'name',
    sortOrder: searchParams.get('sortOrder') || 'asc'
  });

  // Sample products for testing
  const sampleProducts: Product[] = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      description: "Latest iPhone with A17 Pro chip, 48MP camera, and titanium design",
      price: 1199.99,
      stockQuantity: 15,
      category: "Electronics",
      brand: "Apple",
      imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      createdAt: "2024-01-01",
      updatedAt: null,
      active: true
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      description: "Premium Android smartphone with S Pen and advanced AI features",
      price: 1299.99,
      stockQuantity: 12,
      category: "Electronics",
      brand: "Samsung",
      imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      createdAt: "2024-01-01",
      updatedAt: null,
      active: true
    },
    {
      id: 3,
      name: "Nike Air Max 270",
      description: "Comfortable running shoes with Air Max technology",
      price: 149.99,
      stockQuantity: 25,
      category: "Footwear",
      brand: "Nike",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      createdAt: "2024-01-01",
      updatedAt: null,
      active: true
    },
    {
      id: 4,
      name: "Adidas Ultraboost 22",
      description: "Premium running shoes with responsive cushioning",
      price: 189.99,
      stockQuantity: 18,
      category: "Footwear",
      brand: "Adidas",
      imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      createdAt: "2024-01-01",
      updatedAt: null,
      active: true
    },
    {
      id: 5,
      name: "MacBook Pro 16-inch",
      description: "Powerful laptop with M3 Pro chip for professionals",
      price: 2499.99,
      stockQuantity: 8,
      category: "Electronics",
      brand: "Apple",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
      createdAt: "2024-01-01",
      updatedAt: null,
      active: true
    },
    {
      id: 6,
      name: "Sony WH-1000XM5",
      description: "Premium noise-canceling wireless headphones",
      price: 399.99,
      stockQuantity: 20,
      category: "Electronics",
      brand: "Sony",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      createdAt: "2024-01-01",
      updatedAt: null,
      active: true
    },
    {
      id: 7,
      name: "Levi's 501 Original Jeans",
      description: "Classic straight-fit jeans in authentic denim",
      price: 89.99,
      stockQuantity: 30,
      category: "Fashion",
      brand: "Levi's",
      imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
      createdAt: "2024-01-01",
      updatedAt: null,
      active: true
    },
    {
      id: 8,
      name: "Casio G-Shock Watch",
      description: "Durable digital watch with shock resistance",
      price: 129.99,
      stockQuantity: 22,
      category: "Electronics",
      brand: "Casio",
      imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      createdAt: "2024-01-01",
      updatedAt: null,
      active: true
    },
    {
      id: 9,
      name: "Converse Chuck Taylor All Star",
      description: "Classic canvas sneakers for everyday wear",
      price: 69.99,
      stockQuantity: 35,
      category: "Footwear",
      brand: "Converse",
      imageUrl: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80",
      createdAt: "2024-01-01",
      updatedAt: null,
      active: true
    },
    {
      id: 10,
      name: "Nike Air Jordan 1",
      description: "Iconic basketball shoes with premium leather",
      price: 179.99,
      stockQuantity: 10,
      category: "Footwear",
      brand: "Nike",
      imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      createdAt: "2024-01-01",
      updatedAt: null,
      active: true
    },
    {
      id: 11,
      name: "Zara Oversized Blazer",
      description: "Trendy oversized blazer for a modern look",
      price: 129.99,
      stockQuantity: 15,
      category: "Fashion",
      brand: "Zara",
      imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      createdAt: "2024-01-01",
      updatedAt: null,
      active: true
    },
    {
      id: 12,
      name: "H&M Cotton T-Shirt",
      description: "Comfortable cotton t-shirt in various colors",
      price: 24.99,
      stockQuantity: 50,
      category: "Fashion",
      brand: "H&M",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      createdAt: "2024-01-01",
      updatedAt: null,
      active: true
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let response;
      if (filters.category) {
        response = await productAPI.getByCategory(filters.category);
      } else if (filters.brand) {
        response = await productAPI.getByBrand(filters.brand);
      } else {
        response = await productAPI.getAll();
      }
      
      let filteredProducts = response.data;

      // Apply price filters
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(filters.maxPrice));
      }

      // Apply sorting
      filteredProducts.sort((a, b) => {
        let aValue, bValue;
        switch (filters.sortBy) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          default:
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
        }

        if (filters.sortOrder === 'desc') {
          return aValue > bValue ? -1 : 1;
        }
        return aValue < bValue ? -1 : 1;
      });

      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to sample data if API is not available
      let filteredProducts = sampleProducts;

      // Apply category filter
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => 
          p.category.toLowerCase() === filters.category.toLowerCase()
        );
      }

      // Apply brand filter
      if (filters.brand) {
        filteredProducts = filteredProducts.filter(p => 
          p.brand.toLowerCase() === filters.brand.toLowerCase()
        );
      }

      // Apply price filters
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(filters.maxPrice));
      }

      // Apply sorting
      filteredProducts.sort((a, b) => {
        let aValue, bValue;
        switch (filters.sortBy) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          default:
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
        }

        if (filters.sortOrder === 'desc') {
          return aValue > bValue ? -1 : 1;
        }
        return aValue < bValue ? -1 : 1;
      });

      setProducts(filteredProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) newSearchParams.set(k, v);
    });
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
      sortOrder: 'asc'
    });
    setSearchParams({});
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  // Get unique categories and brands from sample products
  const categories = Array.from(new Set(sampleProducts.map(p => p.category)));
  const brands = Array.from(new Set(sampleProducts.map(p => p.brand)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">Browse our collection of amazing products</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filters
              </h2>
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-500"
              >
                Clear all
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input-field"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="input-field"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="input-field"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="input-field"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort Order
              </label>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="input-field"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                {loading ? 'Loading...' : `${products.length} products found`}
              </span>
            </div>
          </div>

          {/* Products */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products; 