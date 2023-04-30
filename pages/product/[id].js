import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import CartIcon from "@/components/icons/CartIcon";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Products";
import { useContext } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;


export default function ProductPage({product}){
    const {addProducts} = useContext(CartContext);
    return(
        <>
            <Header/>
            <Center>
                <ColWrapper>
                    <div className="bg-white rounded-xl p-7">
                        <ProductImages images={product.images} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{product.title}</h1>
                        <p>{product.description}</p>
                        <PriceRow>
                            <div>
                                <Price>&#8377;{product.price}</Price>
                            </div>
                            <div>
                                <Button primary
                                    onClick={() => addProducts(product._id)} ><CartIcon/>Add to Cart</Button>
                            </div>
                        </PriceRow>
                    </div>
                </ColWrapper>
            </Center>
        </>
    );
};

export async function getServerSideProps(context){
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);
    return{
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}