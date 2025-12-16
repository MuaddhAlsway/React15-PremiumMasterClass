import { formatMoney } from '../../utils/money'
import axios from 'axios'
import Product from './product'
import { useState } from 'react'

function ProductGrid({products, loadCart}) {


  return (
    <div className="products-grid">
          {products.map((product) => {
            const [quantity,setQuntity] = useState(1)
            return (
             <Product key={product.id } product={product} loadCart={loadCart}/>
            )
          })}
        </div>
  )
}

export default ProductGrid