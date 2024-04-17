import { Product } from "@/models/Product";
import mongoose from "mongoose";

export async function GET(Request) {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(
      await Product.find({})
    );
}
