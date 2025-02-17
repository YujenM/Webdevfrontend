import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notecontext from '../context/notes/Notecontext';
import './index.css';

function Home() {
  const navigate = useNavigate();
  const { getallinventory, getInventory, updateProduct, deleteProduct } = useContext(Notecontext);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      navigate('/userlogin');
    } else {
      getallinventory();
    }
  }, [navigate, getallinventory]);

  const [editItem, setEditItem] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [salesData, setSalesData] = useState([]);

  const handleEdit = (item) => {
    setEditItem({ ...item });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    getallinventory();
  };

  const handleSave = async () => {
    if (!editItem) return;

    await updateProduct(editItem.product_id, editItem.product_name, editItem.product_price, editItem.product_quantity);
    setEditItem(null);
    getallinventory();
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await fetch(`http://127.0.0.1:8000/api/sales/user/${userId}`);
        const result = await response.json();
        if (response.ok) {
          setSalesData(result);
        } else {
          console.error('Failed to fetch sales data');
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };
    fetchSalesData();
  }, []);

  return (
    <div className={`p-4 min-h-screen transition-all duration-500 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-black'}`}>
      <div className={`shadow-lg rounded-lg p-4 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h1 className="text-2xl font-bold text-center mb-6">Inventory Management</h1>

        <button onClick={toggleTheme} className="mb-4 py-2 px-4 rounded-lg font-bold w-full sm:w-auto bg-gray-700 text-white">
          Toggle {isDarkTheme ? 'Light' : 'Dark'} Theme
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`shadow-lg rounded-lg p-4 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
            <h1 className="text-xl font-bold text-center mb-4">Inventory</h1>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border text-black dark:text-white">
                <thead>
                  <tr className={isDarkTheme ? 'text-white' : 'text-black'}>
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
                      <tr key={item.product_id} className={isDarkTheme ? 'text-white' : 'text-black'}>
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

          <div className={`shadow-lg rounded-lg p-4 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
            <h1 className="text-xl font-bold text-center mb-4">Sales</h1>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border text-black dark:text-white">
                <thead>
                  <tr className={isDarkTheme ? 'text-white' : 'text-black'}>
                    <th className="border p-2">Sales ID</th>
                    <th className="border p-2">Product Name</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit Cost</th>
                    <th className="border p-2">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.length > 0 ? (
                    salesData.map((sale) => (
                      <tr key={sale.sales_id} className={isDarkTheme ? 'text-white' : 'text-black'}>
                        <td className="border p-2">{sale.sales_id}</td>
                        <td className="border p-2">{sale.product.product_name}</td>
                        <td className="border p-2">{sale.quantity}</td>
                        <td className="border p-2">${sale.unit_cost}</td>
                        <td className="border p-2">${sale.total_amount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-4">No Sales Data Available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {editItem && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg text-black">
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

export default Home;
