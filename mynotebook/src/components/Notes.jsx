import React, { useState } from "react";

function Inventory() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Laptop", quantity: 5, price: 1000 },
    { id: 2, name: "Phone", quantity: 10, price: 500 },
  ]);

  const [sales, setSales] = useState([
    { id: 1, salesName: "Laptop", salesQuantity: 2, unitCost: 1000 },
    { id: 2, salesName: "Phone", salesQuantity: 3, unitCost: 500 },
  ]);

  const [editItem, setEditItem] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleSave = () => {
    setInventory(
      inventory.map((item) => (item.id === editItem.id ? editItem : item))
    );
    setEditItem(null);
  };

  const handleDelete = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div
      className={`p-4 min-h-screen transition-all duration-500 ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
      }`}
    >
      <div className={`shadow-lg rounded-lg p-4 ${isDarkTheme ? "bg-gray-800" : "bg-white"}`}>
        <h1 className={`text-2xl font-bold text-center mb-6 ${isDarkTheme ? "text-white" : "bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"}`}>
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

        <div className="grid grid-cols-2 gap-4">
          <div className={`shadow-lg rounded-lg p-4 ${isDarkTheme ? "bg-gray-800" : "bg-white"}`}>
            <h1 className="text-xl font-bold text-center mb-4">Inventory</h1>
            <table className="mt-4 border-collapse border w-full">
              <thead>
                <tr>
                  <th className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>ID</th>
                  <th className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>Name</th>
                  <th className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>Quantity</th>
                  <th className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>Price</th>
                  <th className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id}>
                    <td className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>{item.id}</td>
                    <td className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>{item.name}</td>
                    <td className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>{item.quantity}</td>
                    <td className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>{item.price}</td>
                    <td className={`border p-2`}>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`shadow-lg rounded-lg p-4 ${isDarkTheme ? "bg-gray-800" : "bg-white"}`}>
            <h1 className="text-xl font-bold text-center mb-4">Sales</h1>
            <table className="mt-4 border-collapse border w-full">
              <thead>
                <tr>
                  <th className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>ID</th>
                  <th className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>Sales Name</th>
                  <th className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>Sales Quantity</th>
                  <th className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>Unit Cost</th>
                  <th className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id}>
                    <td className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>{sale.id}</td>
                    <td className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>{sale.salesName}</td>
                    <td className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>{sale.salesQuantity}</td>
                    <td className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>{sale.unitCost}</td>
                    <td className={`border p-2 ${isDarkTheme ? "text-white" : "text-black"}`}>
                      {sale.salesQuantity * sale.unitCost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {editItem && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-lg font-bold mb-2">Edit Item</h2>
              <input
                type="text"
                value={editItem.name}
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                className="border p-2 w-full mb-2"
              />
              <input
                type="number"
                value={editItem.quantity}
                onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
                className="border p-2 w-full mb-2"
              />
              <input
                type="number"
                value={editItem.price}
                onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                className="border p-2 w-full mb-2"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditItem(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inventory;