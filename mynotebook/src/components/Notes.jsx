import React, { useState, useEffect, useContext } from "react";
import noteContext from '../context/notes/Notecontext.js';

function Inventory() {
  const { getallinventory, getInventory } = useContext(noteContext);

  useEffect(() => {
    getallinventory(); // Fetch inventory when component mounts
  }, []);

  const [editItem, setEditItem] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleDelete = (id) => {
    console.log("Delete item ID:", id);
  };

  const handleSave = () => {
    setEditItem(null);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={`p-4 min-h-screen transition-all duration-500 ${isDarkTheme ? "bg-gray-900 text-white" : "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"}`}>
      <div className={`shadow-lg rounded-lg p-4 ${isDarkTheme ? "bg-gray-800" : "bg-white"}`}>
        <h1 className="text-2xl font-bold text-center mb-6">Inventory Management</h1>

        <button onClick={toggleTheme} className="mb-4 py-2 px-4 rounded-lg font-bold w-full sm:w-auto">
          Toggle {isDarkTheme ? "Light" : "Dark"} Theme
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="shadow-lg rounded-lg p-4">
            <h1 className="text-xl font-bold text-center mb-4">Inventory</h1>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border">
                <thead>
                  <tr>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getInventory.length > 0 ? (
                    getInventory.map((item) => (
                      <tr key={item.product_id}>
                        <td className="border p-2">{item.product_id}</td>
                        <td className="border p-2">{item.product_name}</td>
                        <td className="border p-2">{item.product_quantity}</td>
                        <td className="border p-2">${item.product_price}</td>
                        <td className="border p-2">
                          <button className="bg-blue-500 text-white px-2 py-1 mr-2 rounded" onClick={() => handleEdit(item)}>Edit</button>
                          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(item.product_id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-4">No Inventory Data Available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="shadow-lg rounded-lg p-4">
            <h1 className="text-xl font-bold text-center mb-4">Sales</h1>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border">
                <thead>
                  <tr>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Sales Name</th>
                    <th className="border p-2">Sales Quantity</th>
                    <th className="border p-2">Unit Cost</th>
                    <th className="border p-2">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Replace with actual sales data */}
                  <tr>
                    <td className="border p-2">1</td>
                    <td className="border p-2">Laptop</td>
                    <td className="border p-2">2</td>
                    <td className="border p-2">$1000</td>
                    <td className="border p-2">$2000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {editItem && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-lg font-bold mb-2">Edit Item</h2>
              <input type="text" value={editItem.product_name} onChange={(e) => setEditItem({ ...editItem, product_name: e.target.value })} className="border p-2 w-full mb-2" />
              <input type="number" value={editItem.product_quantity} onChange={(e) => setEditItem({ ...editItem, product_quantity: e.target.value })} className="border p-2 w-full mb-2" />
              <input type="number" value={editItem.product_price} onChange={(e) => setEditItem({ ...editItem, product_price: e.target.value })} className="border p-2 w-full mb-2" />
              <div className="flex justify-end space-x-2">
                <button onClick={() => setEditItem(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inventory;
