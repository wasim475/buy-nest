

const ViewProduct = ({product}) => {
    const {name, image, description, price, category, ratings, created}=product
    return (
        <>
            <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
                <img className="w-full h-48 object-cover object-center" src={product.image} alt={product.name} />
        <div className="p-6">
            <h2 className="text-lg font-bold text-gray-800">{name}</h2>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
            <div className="flex items-center justify-between mt-4">
            <div className="text-lg font-semibold text-gray-700">${price}</div>
            <div className="text-sm text-gray-600">{category}</div>
            </div>
            <div className="flex items-center mt-4">
            <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    className={`h-5 w-5 ${index < product.ratings ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.092 3.36a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.092 3.36c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.54-1.118l1.092-3.36a1 1 0 00-.364-1.118L2.98 8.787c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.092-3.36z" />
                </svg>
                ))}
            </div>
            <div className="ml-2 text-gray-600 text-sm">{ratings} out of 5</div>
            </div>
            <div className="text-gray-500 text-xs mt-2">Created on: {created}</div>
        </div>
            </div>
        </>
    );
};

export default ViewProduct;