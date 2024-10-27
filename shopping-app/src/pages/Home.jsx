import React from 'react'
import { Link } from 'react-router-dom'
import ProductList from '../components/test/ProductList'

const Home = () => {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center my-6">Product Catalog</h1>
      <ProductList />
    </div>
  )
}

export default Home