"use client"
import React, { useContext } from 'react'
import { FaCartPlus } from 'react-icons/fa6'
import { CartContext } from './CartContext'
import Link from 'next/link'
export default function ProductBox({_id,title,description,price,images}) {
  const {AddProducts} = useContext(CartContext)
    return (
    <div className='cart-box max-w-[380px]'>
        <Link href={`/products/${_id}`} className="bg-white p-3 h-[200px] flex items-center justify-center rounded-md">
            <img src={images[0]} alt="" className='box-img'/>
        </Link>
        <h2 className='font-bold text-xl'>{title}</h2>
        <div className='mt-2 flex gap-1 justify-between'>
            <p className='font-bold'>{price}$</p>
            <button onClick={() => AddProducts(_id)} className='btn-primary bg-blue-600 flex items-center gap-2 h-fit'>
                <FaCartPlus className='text-white '/>
            </button>    
        </div>       
    </div>    
  )
}
