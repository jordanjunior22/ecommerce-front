"use client"
import React, { useState } from 'react'

export default function ProductImages({images}) {
    const [activeImage , setActiveImage] = useState(images?.[0]);

    return (
    <div className='bg-gray-100 rounded-md p-4 flex flex-col items-center'>
        <div className='cart-box max-h-[200px]'>
            <img className='image-details' src={activeImage}/>
        </div>
        <div className='image-buttons'>
            {images.map(image =>(
            <div key={image} className='image-button' onClick={()=>setActiveImage(image)}>
                <img src={image} alt=''/>
            </div>
            ))}
        </div>

    </div>

  )
}
