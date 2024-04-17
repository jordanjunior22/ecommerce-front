import React from 'react'
import ProductBox from './ProductBox'

export default function NewProducts({products}) {
    
  return (
    <div className='bg-gray-200 p-5'>
      <div className='grid-div'>
          {products?.length > 0 && products.map(product=>(
            <ProductBox key={product._id} {...product}/>
          ))}
      </div>
    </div>
  )
}
