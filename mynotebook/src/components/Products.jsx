import React, { useState } from "react";

function Products() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Laptop", quantity: 5 },
    { id: 2, name: "Phone", quantity: 10 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", quantity: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  // Generate next available ID
  const getNextId = () => (inventory.length > 0 ? inventory[inventory.length - 1].id + 1 : 1);

  // Add Product
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.quantity) return;
    setInventory([
      ...inventory,
      { id: getNextId(), name: newProduct.name, quantity: Number(newProduct.quantity) },
    ]);
    setNewProduct({ name: "", quantity: "" });
  };

  // Edit Product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  // Update Product
  const handleUpdateProduct = () => {
    setInventory(
      inventory.map((item) =>
        item.id === editingProduct.id ? { ...item, name: newProduct.name, quantity: Number(newProduct.quantity) } : item
      )
    );
    setEditingProduct(null);
    setNewProduct({ name: "", quantity: "" });
  };

  // Delete Product
  const handleDeleteProduct = (id) => {
    const updatedInventory = inventory.filter((item) => item.id !== id);
    // Reset IDs in sequence
    setInventory(updatedInventory.map((item, index) => ({ ...item, id: index + 1 })));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Inventory Management</h1>

      {/* Input Fields for Adding/Editing */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
          className="border p-2 mr-2"
        />
        {editingProduct ? (
          <button onClick={handleUpdateProduct} className="bg-green-500 text-white px-4 py-2">
            Update
          </button>
        ) : (
          <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2">
            Add Product
          </button>
        )}
      </div>

      {/* Inventory Table */}
      <table className="mt-4 border-collapse border w-full">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">
                <button onClick={() => handleEditProduct(item)} className="bg-yellow-500 text-white px-2 py-1 mr-2">
                  Edit
                </button>
                <button onClick={() => handleDeleteProduct(item.id)} className="bg-red-500 text-white px-2 py-1">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
