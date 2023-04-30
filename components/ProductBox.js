import Link from "next/link";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import styled from "styled-components";

const ProductWrapper = styled.div`
  
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 1.2rem;
  color:inherit;
  text-decoration:none;
  margin:0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content:space-between;
    gap: 5px;
  }
  align-items: center;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;

export default function ProductBox({_id,title,description,price,images}) {
  const {addProducts} = useContext(CartContext);
  const url = '/product/'+_id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt=""/>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            ${price}
          </Price>
          <Button block onClick={() => addProducts(_id)} primary outline>
            <CartIcon/> Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
"https://aditya-next.s3.amazonaws.com/1682520407297.png"