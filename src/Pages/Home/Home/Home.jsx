import { useEffect, useState } from "react";
import ViewProduct from "./ViewProduct";
import { IoSearch } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [productsFC, setProductsFC] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [productsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('desc');

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    useEffect(() => {
        fetch(`https://buy-nest-server.vercel.app/products?page=${currentPage}&limit=${productsPerPage}&sortBy=createdAt&sortOrder=${sortOrder}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setProductsFC(data.products);
                setTotalProducts(data.totalProducts);
            });
    }, [currentPage, sortOrder]);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const userInput = form.searchInput.value;
        const searchData = products.filter((product) => product.name.toLowerCase().includes(userInput.toLowerCase()));
        setProducts(searchData);
    };

    const handlePHL = () => {
        const sortedByPriceLH = products.sort((a, b) => a.price - b.price);
        setProducts([...sortedByPriceLH]);
    };

    const handlePLH = () => {
        const sortedByPriceHL = products.sort((a, b) => b.price - a.price);
        setProducts([...sortedByPriceHL]);
    };

    const handleNewestFirst = () => {
        setSortOrder('desc'); 
    };

    const handleOldestFirst = () => {
        setSortOrder('asc'); 
    };

    const handleCategory = (cat) => {
        const catData = products.filter((product) => product.categor === cat.category);
        setProducts(catData);
    };

    const handlePriceRange = (e) => {
        e.preventDefault();
        const filteredProducts = productsFC.filter(product => {
            const price = product.price;
            return price >= (minPrice || 0) && price <= (maxPrice || Infinity);
        });
        setProducts(filteredProducts);
    };

    const Category = productsFC.filter((product, index, self) => {
        return index === self.findIndex((p) => p.category === product.category);
    });

    return (
        <>
            <section>
                <article>
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
                                <IoSearch />
                            </button>
                        </form>
                    </div>
                </article>
                <article className="flex">
                    <div>
                        <details className="dropdown">
                            <summary className="btn m-1">Sort Products <FaAngleDown /></summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li onClick={handlePHL} className="cursor-pointer mb-1 hover:text-blue-500">Price(Low-High)</li>
                                <li onClick={handlePLH} className="cursor-pointer mt-1 hover:text-blue-500">Price(High-Low)</li>
                                <li onClick={handleNewestFirst} className="cursor-pointer mt-1 hover:text-blue-500">Newest First</li>
                                <li onClick={handleOldestFirst} className="cursor-pointer mt-1 hover:text-blue-500">Oldest First</li>
                            </ul>
                        </details>
                    </div>
                    <div>
                        <details className="dropdown">
                            <summary className="btn m-1">Category <FaAngleDown /></summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                {
                                    Category.map((cat, index) => (
                                        <li key={index} onClick={() => handleCategory(cat)} className="cursor-pointer mb-1 hover:text-blue-500">{cat.category}</li>
                                    ))
                                }
                            </ul>
                        </details>
                    </div>
                    <div>
                        <form onSubmit={handlePriceRange} className="flex items-center max-w-lg mx-auto mt-10">
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
                                placeholder="Min Price"
                            />
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full py-2 px-4 border border-gray-300 rounded-r-md focus:outline-none focus:border-blue-500"
                                placeholder="Max Price"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                Filter
                            </button>
                        </form>
                    </div>
                </article>
                <div className="text-center mx-10 mb-10">
                    <h1 className="text-4xl font-bold mb-5">Products</h1>
                    <p className="text-gray-500">
                        Explore our diverse range of products designed to enhance your lifestyle. From cutting-edge electronics to stylish home decor, each item is carefully curated to meet your needs. Discover the latest in technology, comfort, and style with our comprehensive collection of high-quality products.
                    </p>
                </div>
            </section>

            <section className="grid lg:grid-cols-4 gap-4">
                {
                    products.map((product) => (
                        <ViewProduct
                            key={product._id}
                            product={product}
                        ></ViewProduct>
                    ))
                }
            </section>
            <section className="flex justify-center items-center mt-8">
                <button
                    className="bg-blue-500 text-white px-4 py-2 mx-2 rounded hover:bg-blue-600"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 mx-2 rounded hover:bg-blue-600"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </section>
        </>
    );
};

export default Home;
