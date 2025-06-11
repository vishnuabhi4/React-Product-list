import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import FilterControls from '../components/FilterControls';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Get unique categories
  const categories = [...new Set(products.map(product => product.category))];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply sorting
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating-high':
            return b.rating - a.rating;
          case 'rating-low':
            return a.rating - b.rating;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (product) => {
    console.log(`Added to cart: ${product.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <ShoppingCart className="text-blue-600" size={24} />
              <h1 className="text-xl font-bold text-gray-900">Product Store</h1>
            </div>
            <div className="text-sm text-gray-600">
              {filteredAndSortedProducts.length} products found
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Amazing Products
          </h2>
          <p className="text-gray-600">
            Find the perfect items for your needs with our advanced search and filtering options.
          </p>
        </div>

        {/* Filter Controls */}
        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
        />

        {/* Product Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <p className="text-xl text-gray-600">No products found</p>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductListing;