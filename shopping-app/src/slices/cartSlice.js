import {createSlice} from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';

const initialState = {
    totalItems : localStorage.getItem("totalItems")
        ? JSON.parse(localStorage.getItem("totalItems"))
        : 0,
    cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],

    // price
    total: localStorage.getItem("total")
        ? JSON.parse(localStorage.getItem("total"))
        : 0,
}

// creating slice
const cartSlice = createSlice({
    name:"cart",
    initialState : initialState,
    reducers : {
        setTotalItems(state,value){
            state.totalItems = value.payload;
        },

        // add to cart
        addToCart: (state, action) => {
            const product = action.payload
            const index = state.cart.findIndex((item) => item.id === product.id)
      
            if (index >= 0) {
              // If the course is already in the cart, do not modify the quantity
              toast.error("Course already in cart")
              return
            }
            // If the course is not in the cart, add it to the cart
            state.cart.push(product)
            // Update the total quantity and price
            state.totalItems++
            state.total += product.price
            // Update to localstorage
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            // show toast
            toast.success("Course added to cart")
          },

        // remove from cart
        removeFromCart:(state,action) =>{
            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)

            if(index >= 0){
                // If the course is found in the cart, remove it
                state.totalItems--
                state.total -= state.cart[index].price
                state.cart.splice(index, 1)
                // Update to localstorage
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                // show toast
                toast.success("Course removed from cart")
            }
        },

        // reset cart 
        resetCart: (state) => {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;

            // update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    }
})

export const {addToCart , removeFromCart , resetCart} = cartSlice.actions;
export default cartSlice.reducer;