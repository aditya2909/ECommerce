import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";


export default function NewProduct({products}){
    return(
        <Center>
            <h2 className="text-4xl font-semibold mt-10">New Arrivals</h2>
            <ProductsGrid products={products} />
        </Center>
    );
}