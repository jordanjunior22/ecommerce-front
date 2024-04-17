import { Product } from "@/models/Product";
import {Order} from "@/models/Order"
const stripe = require('stripe')(process.env.STRIPE_SK);

import mongoose from "mongoose";
export async function POST(Request) {
    mongoose.connect(process.env.MONGO_URL);
    const {name,email,city,postalCode,streetAddress,country,products} = await Request.json();
    const productsIds = products.split(',');
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({_id:uniqueIds});
    
    let line_items = [];
    for (const productId of uniqueIds){
        const productInfo = productsInfos.find(p => p._id.toString() === productId);
        const quantity = productsIds.filter(id => id === productId)?.length || 0;
        if(quantity > 0 && productInfo){
            line_items.push({
                quantity,
                price_data:{
                    currency: 'USD',
                    product_data: {name:productInfo.title},
                    unit_amount: productInfo.price * 100,
                }
            });
        }

    }
    
    const orderDoc = await Order.create({
        line_items,name,email,city,postalCode,streetAddress,country,paid:false,
    })
    

 const session = await stripe.checkout.sessions.create({
    line_items,
    mode:'payment',
    customer_email: email,
    success_url:process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url:process.env.PUBLIC_URL + '/cart?canceled=1',
    metadata: {orderId:orderDoc._id.toString()}
 })

    return Response.json({url:session.url});
}