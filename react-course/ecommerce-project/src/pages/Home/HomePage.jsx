import Header from '../../Components/Header' 
import { useEffect, useState } from 'react'
import './HomePage.css'
import axios from 'axios'
import ProductGrid from './Product-Grid'

function HomePage({cart}) {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    
    fetchProducts()
  }, [])

  return (
    <>
      <title>Ecommerce Project</title>
      <Header cart={cart}/>

      <div className="home-page">
        <ProductGrid products={products} />
      </div>
    </>
  )
}

export default HomePage