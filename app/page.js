import Header from "@/components/Header";
import Featured from "@/components/Featured";
import mongoose from 'mongoose'
import { Product } from "@/models/Product";
import NewProducts from "@/components/NewProducts";

async function getFeaturedProduct(){
  const featuredProductId = "66142554a406d3798748f2bb";
  await mongoose.connect(process.env.MONGO_URL);
  const featuredProduct = await Product.findById(featuredProductId);
  return JSON.parse(JSON.stringify(featuredProduct))
}

async function getNewProduct(){
  await mongoose.connect(process.env.MONGO_URL);
  const newProducts = await Product.find({}, null, {sort:{'_id':-1}, limit:10});
  return JSON.parse(JSON.stringify(newProducts));

}
export default async function Home() {
  const featuredProduct = await getFeaturedProduct();
  const newProduct = await getNewProduct();

  return (
    <div>
      <Header/>
      <Featured product={featuredProduct}/>
      <NewProducts products={newProduct}/>
    </div>
  );
}
