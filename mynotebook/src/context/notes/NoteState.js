import Notecontext from './Notecontext';
import { useState } from 'react'; 

const Notestate = (props) => {
    const host = "http://127.0.0.1:8000";
    
    const [getInventory, setGetInventory] = useState([]);


    const getallinventory = async () => {
        try {
            const userId = localStorage.getItem("user_id");
            if (!userId) {
                console.error("User ID not found in localStorage");
                return;
            }
    
            const response = await fetch(`${host}/api/getproducts/${userId}`);
            const result = await response.json();
    
            if (result.success) {
                setGetInventory(result.data);
            } else {
                console.error("Failed to fetch inventory:", result.message);
            }
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    };
    const additems = async (product_name, product_price, product_quantity) => {
        try {
            const userId = localStorage.getItem("user_id");
            if (!userId) {
                console.error("User ID not found in localStorage");
                return;
            }
    
            const response = await fetch(`${host}/api/createproduct/${userId}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    product_name,
                    product_price,
                    product_quantity
                })
            });
    
            const result = await response.json();
            if (response.ok) {
                console.log("Product added successfully:", result);
            } else {
                console.error("Failed to add product:", result.message);
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }
    const updateProduct = async (productId, product_name, product_price, product_quantity) => {
        try {
            const userId = localStorage.getItem("user_id");
            if (!userId) {
                console.error("User ID not found in localStorage");
                return;
            }
    
            const response = await fetch(`${host}/api/updateproduct/${userId}/${productId}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    product_name,
                    product_price,
                    product_quantity
                })
            });
    
            const result = await response.json();
            if (response.ok) {
                console.log("Product updated successfully:", result);
            } else {
                console.error("Failed to update product:", result.message);
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };
    const deleteProduct = async (productId) => {
        try {
            const userId = localStorage.getItem("user_id");
            if (!userId) {
                console.error("User ID not found in localStorage");
                return;
            }
    
            const response = await fetch(`${host}/api/deleteproduct/${userId}/${productId}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                console.log(`Product ${productId} deleted successfully`);
                setGetInventory(getInventory.filter(item => item.product_id !== productId)); // Remove from state
            } else {
                console.error("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };



return (
    <Notecontext.Provider value={{getInventory,getallinventory ,additems ,updateProduct,deleteProduct}}>
        {props.children}
    </Notecontext.Provider>
);
};

export default Notestate;
