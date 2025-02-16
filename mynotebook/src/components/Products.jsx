import React, { useState } from "react";

function Products() {
  const [newProduct, setNewProduct] = useState({ name: "", quantity: "", price: "" });
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Add Product
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.quantity || !newProduct.price) return;
    setNewProduct({ name: "", quantity: "", price: "" });
    alert("Product added successfully!");
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    
    <div
      className={`flex justify-center items-center min-h-screen transition-all duration-500 ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
      }`}
    >
      <div className={`shadow-lg rounded-lg p-8 w-full max-w-sm ${isDarkTheme ? "bg-gray-800" : "bg-white"}`}>
        <h1
          className={`text-2xl font-bold text-center mb-6 ${
            isDarkTheme
              ? "text-white"
              : "bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
          }`}
        >
           
          Inventory Management
        </h1>

      
        
 {/* Theme Toggle Button */}
 <button
          onClick={toggleTheme}
          className={`mb-4 py-2 px-4 rounded-lg font-bold ${
            isDarkTheme
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:from-pink-500 hover:to-purple-400"
          }`}
        >
          Toggle {isDarkTheme ? "Light" : "Dark"} Theme
        </button>
        {/* Form for Adding */}

        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                isDarkTheme
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-gray-500"
                  : "focus:ring-purple-500"
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                isDarkTheme
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-gray-500"
                  : "focus:ring-purple-500"
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                isDarkTheme
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-gray-500"
                  : "focus:ring-purple-500"
              }`}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 text-white font-bold rounded-lg ${
              isDarkTheme
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400"
            }`}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Products;
