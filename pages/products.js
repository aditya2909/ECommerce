import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Products";
import styled from "styled-components";

const HeadTag = styled.h2`
font-family: 'Baloo Bhai 2', cursive;
padding: 20px 0px;
margin-top: 30px
`;

export default function ProductsPage({products}){
    return (
        <>
            <Header/>
            <Center>
                <HeadTag className="text-2xl font-bold">All Products</HeadTag>
                <ProductsGrid products={products} />
            </Center>
        </>
    );
};

export async function getServerSideProps(){
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    return{
        props: {
            products: JSON.parse(JSON.stringify(products)),
        }
    }
}
