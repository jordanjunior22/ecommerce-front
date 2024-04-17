"use client"
import React, { createContext, useEffect, useState } from 'react'
export const CartContext = createContext({});

export function CartContextProvider({children}) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState([]);


    useEffect(()=>{
        if(cartProducts?.length> 0){
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }else {
            ls?.setItem('cart', '[]'); // Set cart to an empty array in localStorage
        }
    },[cartProducts]);

    useEffect(()=>{
        if(ls && ls.getItem('cart')){
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    },[])

    function AddProducts(productId){
        setCartProducts(prev=>[...prev, productId])
    }
    function RemoveProducts(productId){
        setCartProducts(prev =>{
            const pos = prev.indexOf(productId)
            if(pos !== -1){
                return  prev.filter((value,index)=> index !== pos);
            }
            return prev;
        })
    }
    return (
      <>
        <CartContext.Provider value={{cartProducts,setCartProducts,AddProducts,RemoveProducts}} >
            {children}
        </CartContext.Provider>    
      </>

  )
}
