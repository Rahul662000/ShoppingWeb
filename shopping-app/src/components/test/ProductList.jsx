import React from 'react';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {ACCOUNT_TYPE} from '../../utils/constants'
import {toast} from 'react-hot-toast'
import { addToCart } from '../../slices/cartSlice'

const ProductList = () => {

  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const products = [
    { id: 1, name: "Product 1", price: 29.99, image: "https://via.placeholder.com/150", description: "High-quality product with superior features." },
    { id: 2, name: "Product 2", price: 49.99, image: "https://via.placeholder.com/150", description: "Made with durable materials and great design." },
    { id: 3, name: "Product 3", price: 19.99, image: "https://via.placeholder.com/150", description: "Perfect for daily use and very affordable." },
    { id: 4, name: "Product 4", price: 39.99, image: "https://via.placeholder.com/150", description: "Stylish and comfortable for all-day wear." },
    { id: 5, name: "Product 5", price: 24.99, image: "https://via.placeholder.com/150", description: "Lightweight and durable for outdoor activities." },
    { id: 6, name: "Product 6", price: 59.99, image: "https://via.placeholder.com/150", description: "Premium product with top-notch performance." },
    { id: 7, name: "Product 7", price: 34.99, image: "https://via.placeholder.com/150", description: "Efficient and easy to use for all ages." },
    { id: 8, name: "Product 8", price: 79.99, image: "https://via.placeholder.com/150", description: "Elegant design with advanced technology." },
    { id: 9, name: "Product 9", price: 14.99, image: "https://via.placeholder.com/150", description: "Affordable and reliable for everyday use." },
    { id: 10, name: "Product 10", price: 44.99, image: "https://via.placeholder.com/150", description: "Great value for money and well-built." }
  ];

  const handleAddToCart = (product) => {
    console.log(`Added ${product.name} to cart.`);
    // Add cart functionality here, e.g., dispatch(addToCart(product))
    if(user && user?.accountType === ACCOUNT_TYPE.SELLER){
      toast.error("You are an Seller. You can't buy a course.")
      return
    }

    // Check if the user is logged in
    if (!token) {
      toast.error("You must log in to add items to the cart.");
      navigate("/login");
      return;
    }

    if(token){
      dispatch(addToCart(product))
      return
    }
    // setConfirmationModal({
    //   text1:"You are not Logged in!",
    //   text2:"Please Login to add to cart",
    //   btn1text:"Login",
    //   btn2text:"Cancel",
    //   btn1Handler:()=>navigate("/login"),
    //   btn2Handler:()=>setConfirmationModal(null),
    // })
  };

  const handleBuyNow = (product) => {
    console.log(`Purchased ${product.name}.`);
    // Add buy now functionality here, e.g., direct to checkout
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      ))}
    </div>
  );
};

export default ProductList;