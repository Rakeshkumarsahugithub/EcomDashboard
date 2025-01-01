import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchKey, setSearchKey] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const result = await axios.get("http://localhost:5000/products", { withCredentials: true });
            setProducts(result.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/products/${id}`, { withCredentials: true });
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

 
    const searchHandle = async () => {
        if (searchKey) {
          try {
            const result = await axios.get(`http://localhost:5000/search/${searchKey}`, { withCredentials: true });
            setProducts(result.data.data); // Access "data" from API response
          } catch (error) {
            console.error("Error searching products:", error);
          }
        } else {
          fetchProducts(); // Load all products if search key is empty
        }
      };
    

    return (
              <div className="productli">
        <h1>Product List</h1>
        {/* <input type="text" className="searchh" placeholder="Search Product" onChange={searchHandlee}></input> */}
     <input type="text" className="searchh" placeholder="Search Product" value={searchKey} onChange={(e) => setSearchKey(e.target.value)}></input>
      <button id="serbtn" onClick={searchHandle}>Search</button>
        <ul>
            <li>Serial No</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Company</li>
            <li>Operation</li>
        </ul>
       
        {
           products.length > 0 ? products.map((product, index) => 
                <ul key={product._id}>
                    <li>{index+1}</li>
                    <li>{product.name}</li>
                    <li>{product.price}</li>
                    <li>{product.category}</li>
                    <li>{product.company}</li>
                    {/* <button className="prdbtnn" onClick={()=>{deleteProduct(item._id)}}>Delete</button>
                    <button className="prdbtnn" ><Link to="/Update">Update</Link></button> */}
                    <li>
                    <button onClick={()=>{deleteProduct(product._id)}}>DELETE</button>
                    <button><Link to={`/Update/${product._id}`}>UPDATE</Link></button>
                    </li>
                </ul>
            ) : <h2>No Result Found!</h2>
        }
    </div>
    );
};

export default ProductList;
