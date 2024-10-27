import React from 'react';

const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg max-w-xs text-white">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-lg font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">${product.price}</p>
      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
      <div className="flex gap-2">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
        <button
          onClick={() => onBuyNow(product)}
          className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

























import React, { useState } from 'react';

const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-lg font-bold mb-2">${product.price}</p>
      
      <label htmlFor="quantity" className="block mb-2 font-medium">
        Quantity:
      </label>
      <select
        id="quantity"
        value={quantity}
        onChange={handleQuantityChange}
        className="border p-1 mb-4 w-full rounded-md"
      >
        {[...Array(10).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>
            {num + 1}
          </option>
        ))}
      </select>

      <div className="flex space-x-2">
        <button
          onClick={() => onAddToCart(product, quantity)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
        <button
          onClick={() => onBuyNow(product, quantity)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;