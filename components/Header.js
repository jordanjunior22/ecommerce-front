"use client"
import React, { useContext } from 'react'
import Link from "next/link"
import { CartContext } from './CartContext';

export default function Header() {
  const {cartProducts} = useContext(CartContext);
  return (
    <header className='bg-gray-700 text-white flex justify-between p-4 text-lg'>
        <Link href={'/'}>Ecommerce</Link>

        <nav className='flex gap-4 text-gray-300'>
            <Link href={'/'}>Home</Link>
            <Link href={'/products'}>All products</Link>
            <Link href={'/categories'}>Categories</Link>
            <Link href={'/account'}>Account</Link>
            <Link href={'/cart'}>Cart ({cartProducts.length})</Link>
        </nav>
    </header>
  )
}
