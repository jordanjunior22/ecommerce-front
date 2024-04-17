"use client"
import React, { useContext } from 'react';
import Link from 'next/link';
import { FaCartPlus } from "react-icons/fa6";
import { CartContext } from './CartContext';

export default function Featured({ product }) {
  const {AddProducts} = useContext(CartContext);

  function AddToCart() {
    AddProducts(product._id);
  }

  return (
    <div className='p-4 bg-gray-700 flex gap-5 items-center'>
      <div className='left-side flex flex-col justify-center'>
        <h1 className='text-white text-5xl font-semibold mb-4'>{product.title}</h1>
        <p className='text-gray-300'>{product.description}</p>
        <div className='flex mt-4 gap-4 text-xl'>
          <Link href={`/products/${product._id}`} className='btn-primary bg-gray-700 border border-white'>Read More</Link>
          <button className='btn-primary bg-blue-600 flex items-center gap-2' onClick={AddToCart}>
            <FaCartPlus className='text-white'/>
            Add to Cart
          </button>
        </div>
      </div>
      <div className='image-container'>
        <img src={`${product.images[0]}`} alt='image'/>
      </div>
    </div>
  );
}
