"use client"
import React, { useContext, useEffect, useState } from 'react';
import Header from '@/components/Header';
import ProductImages from '@/components/ProductImages';
import { CartContext } from '@/components/CartContext';
import axios from 'axios';

export default function Page({ params }) {
  const [product, setProduct] = useState(null);
  const { AddProducts } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/products');
        const fetchedProducts = response.data;
        
        if (params.id && fetchedProducts) {
          const foundProduct = fetchedProducts.find(product => product._id === params.id);
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            console.error(`Product with id ${params.id} not found`);
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchData();
  }, []);
  


  return (
    <div>
      <Header />
      <div className='details'>
        {product && (
          <>
            <ProductImages images={product.images} />
            <div>
              <h1 className='font-bold text-2xl'>{product.title}</h1>
              <p>{product.description}</p>
              <div className='flex gap-10 mt-1 items-center'>
                <p className='font-bold'>{product.price}$</p>
                <button
                  className='btn-primary bg-blue-600 text-white rounded-md px-3 py-4'
                  onClick={() => AddProducts(product._id)}
                >
                  Add to Card
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
  
}
