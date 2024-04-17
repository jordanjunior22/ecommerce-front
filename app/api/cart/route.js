import {Product} from "@/models/Product";
import mongoose from "mongoose";

export async function POST(Request) {
    mongoose.connect(process.env.MONGO_URL);
    const {ids} = await Request.json();
    return Response.json(
      await Product.find({ _id:ids})
    );
  }