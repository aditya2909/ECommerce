import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProduct from "@/components/NewProduct";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default function Home({featuredProduct, newProduct}) {
  return (
    <div>
      <Header/>
      <Featured product={featuredProduct}/>
      <NewProduct products={newProduct} />
    </div>
  )
}

export async function getServerSideProps(){
  const featuredProductId = "644793336a9406ba44877f6a";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProduct = await Product.find({}, null, {sort: {'_id':-1}, limit:12})
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProduct: JSON.parse(JSON.stringify(newProduct)),
    },
  };
}
