"use client"
import React, { useContext, useEffect, useState } from 'react'
import Header from '@/components/Header'
import { CartContext } from '@/components/CartContext'
import axios from 'axios'
export default function Page() {
    const {cartProducts,AddProducts,RemoveProducts} = useContext(CartContext)
    const [products, setProducts] = useState([]);
    const [name,setName] = useState([])
    const [email, setEmail] = useState([])
    const [city, setCity] = useState([])
    const [postalCode, setPostalCode] = useState([])
    const [streetAddress, setStreetAddress] = useState([])
    const [country, setCountry] = useState([])
    const [isSucces, setIsSuccess] = useState(false)


    async function onSubmit(event) {
        event.preventDefault();
        const orderData = {
            name,
            email,
            city,
            postalCode,
            streetAddress,
            country,
            products: cartProducts.join(',')
        };
        try {
            const response = await axios.post('/api/checkout', orderData);
            window.location = response.data.url // Handle response from server as needed
        } catch (error) {
            console.error('Error submitting order:', error);
            // Handle error
        }
    }

    useEffect(()=>{
        if(typeof window !== 'undefined' && window.location.href.includes('success')){
            setIsSuccess(true);
        }
    })
    useEffect(()=>{
        if (cartProducts.length > 0){
            axios.post('/api/cart', {ids:cartProducts})
            .then(response =>{
                setProducts(response.data)
            })
        }else{
            setProducts([]);
        }
    },[cartProducts])

    function AddProductQty(id){
        AddProducts(id);
    }
    function SubProducQty(id){
        RemoveProducts(id);
    }

    let total = 0;
    for(const productId of cartProducts) {
        const price = products.find(p=> p._id === productId)?.price || 0;
        total +=price; 
    }


    if(isSucces){
        return (
            <>
                <Header/>
                <h1 className='flex items-center justify-center bg-green-100 p-6 m-4'>Thank You You Order Has Been Recieved</h1>
            </>
        );
    }

    return (
    <div>
        <Header />
        <div className='wrapper p-6'>
   
            <div className='cart-box'>
            <h2>Cart</h2>
                {!cartProducts?.length &&(
                    <div>Your Cart Is Empty</div>
                )}
                {cartProducts?.length > 0 &&(

                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>
                                    <div  className='cart-image'>
                                        <img src={product.images[0]} alt=""/>
                                    </div>
                                    {product.title}
                                </td>
                                <td>
                                    <button onClick={()=> SubProducQty(product._id)} className='px-4 py-1 mr-4 bg-black text-white'>-</button>
                                    {cartProducts.filter(id => id === product._id).length}
                                    <button onClick={()=> AddProductQty(product._id)} className='px-4 py-1 ml-4 bg-black text-white'>+</button>
                                </td>
                                <td>$ {cartProducts.filter(id => id === product._id).length * product.price}</td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td></td>
                            <td>${total}</td>
                        </tr>
                    </tbody>
                </table>
                )}
            </div>
            <form  onSubmit={onSubmit} className='cart-box'>
                {!!cartProducts?.length &&(
                <div className='cart-box'>
                    <h2>Order Information</h2>
                    <input type='text' placeholder='Name' value={name} onChange={ev=> setName(ev.target.value)}/>
                    <input type='text' placeholder="Email" value={email} onChange={ev=> setEmail(ev.target.value)}/>
                    <div className='flex gap-1' >
                        <input type='text' placeholder="City" value={city} onChange={ev=> setCity(ev.target.value)}/>
                        <input type='text' placeholder="Postal Code" value={postalCode} onChange={ev=> setPostalCode(ev.target.value)}/>
                    </div>
                    <input type='text' placeholder="Street Address" value={streetAddress} onChange={ev=> setStreetAddress(ev.target.value)}/>
                    <input type='text' placeholder="Country" value={country} onChange={ev=>setCountry(ev.target.value)}/>
                    <input type='hide' name='products' value={cartProducts.join(',')}/>
                    <button type='submit' className='btn-primary bg-black'>Continue to payment</button>
                </div>
                 )}
            </form>

        </div>
    </div>
  )
}
