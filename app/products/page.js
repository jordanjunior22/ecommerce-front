
import Header from '@/components/Header'
import React from 'react'
import mongoose from 'mongoose';
import { Product } from '@/models/Product';
import ProductBox from '@/components/ProductBox';

async function getAllProduct(){
    await mongoose.connect(process.env.MONGO_URL);
    const AllProducts = await Product.find({},null,{sort:{'_id':-1}});
    return JSON.parse(JSON.stringify(AllProducts));
  
}
export default async function Page() {
    const products = await getAllProduct();
  
    return (
    <div className='bg-gray-100'>
        <Header/>
        <div className='p-4'>
            <h1 className='font-bold text-2xl py-6'>All Products</h1>
            <div className='grid-div'>
                {products?.length > 0 && products.map(product=>(
                    <ProductBox key={product._id} {...product}/>
                ))}
            </div>
        </div>
        
    </div>
  )
}
