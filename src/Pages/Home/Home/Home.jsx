import { useEffect, useState } from "react";
import ViewProduct from "./ViewProduct";
import { IoSearch } from "react-icons/io5";




const Home = () => {
    const [products, setProducts]= useState([])
    useEffect(()=>{
        fetch("https://buy-nest-server.vercel.app/products")
        .then((res)=>res.json())
        .then((data)=>setProducts(data))
    },[])

    const handleSearch = (e)=>{
        e.preventDefault()
        const form = e.target;
        const userInput = form.searchInput.value;
        console.log(userInput);

    }
   
    return (
       <>
        <section>
            <div>
                <form onSubmit={handleSearch} className="flex items-center max-w-lg mx-auto mt-10">
            <input
                type="text"
                name="searchInput"
                className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
                placeholder="Search for products..."
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              <IoSearch/>
            </button>
                </form>
            </div>
        <div className="text-center mx-10 mb-10">
            <h1 className="text-4xl font-bold mb-5">Products</h1>
            <p className="text-gray-500">
            Explore our diverse range of products designed to enhance your lifestyle. From cutting-edge electronics to stylish home decor, each item is carefully curated to meet your needs. Discover the latest in technology, comfort, and style with our comprehensive collection of high-quality products.
            </p>
        </div>
        </section>
          
        <section className="grid lg:grid-cols-4 gap-4">
        {
                products.map((product)=>(
                   <ViewProduct 
                   key={product._id}
                    product={product}
                   ></ViewProduct> 
                ))
            }
        </section>
       </>
    );
};

export default Home;