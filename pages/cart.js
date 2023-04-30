import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
`;

const HeadTag = styled.h2`
font-family: 'Baloo Bhai 2', cursive;
padding: 20px 0px;
margin-top: 30px
`;

export default function CartPage(){
    const {cartProducts, addProducts, removeProduct, clearCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
        if(cartProducts.length > 0){
            axios.post('/api/cart', {ids:cartProducts}).then(
                response => {
                    setProducts(response.data);
                }
            )
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    useEffect(() => {
        if (typeof window === 'undefined') {
          return;
        }
        if (window?.location.href.includes('success')) {
          setIsSuccess(true);
          clearCart();
        }
      }, []);
    
    function moreOfThisProduct(id){
        addProducts(id);
    }

    function lessOfThisProduct(id){
        removeProduct(id);
    }

    async function goToPayments(){
        const response = await axios.post('/api/checkout',{
            name, email, streetAddress, pinCode, state, city, country, cartProducts
        });
        if(response.data.url){
            window.location = response.data.url;
        }
    }

    let total=0; 
    for (const productId of cartProducts){
        const price = products.find(p => p._id === productId)?.price || 0;
        total = total + price;
    }

    if (isSuccess){
        return(
            <>
                <Header/>
                    <Center>
                        <ColumnsWrapper>
                        <div className="bg-gradient-to-bl from-[#ddd6f3] to-[#faaca8] rounded-md p-12">
                            <h2 className="text-4xl font-bold pb-8">Thank you</h2>
                            <p className="text-xl">We will Email you when your order will be Dispatched.</p>
                        </div>
                        </ColumnsWrapper>
                    </Center>
            </>
        );
    }

    return(
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                <div className="bg-gradient-to-bl from-[#ddd6f3] to-[#faaca8] rounded-md p-8">
                <HeadTag className="text-4xl font-bold">Cart</HeadTag>
                    {!cartProducts?.length && (
                        <div>Your Cart is Empty</div>
                    )}
                    {products?.length > 0 && (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className=" text-left uppercase text-slate-700 text-lg font-semibold">Product</th>
                                    <th className=" text-left uppercase text-slate-700 text-lg font-semibold">Quantity</th>
                                    <th className=" text-left uppercase text-slate-700 text-lg font-semibold">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr className="" key={product}>
                                        <td className="border-t-2 border-solid py-2.5">
                                            <div className="">
                                                <img src={product.images[0]} className="max-h-40 max-w-40" alt="CartProducts" />
                                            </div>
                                            <div className="text-lg sm:text-xl">
                                            {product.title}
                                            </div>
                                        </td>
                                        <td className="border-t-2 border-solid py-2.5">
                                            <div className="flex mx-auto"> 
                                                <button 
                                                    onClick={() => lessOfThisProduct(product._id)} 
                                                    className="bg-gray-300 px-4 text-xl rounded-md">-</button>
                                                <p className="text-xl px-1">{cartProducts.filter(id => id === product._id).length}</p>
                                                <button 
                                                    onClick={() => moreOfThisProduct(product._id)} 
                                                    className="bg-gray-300 px-4 text-xl rounded-md">+</button>
                                            </div>
                                            
                                        </td>
                                        <td className="border-t-2 border-solid py-2.5">
                                        &#8377;{cartProducts.filter(id => id === product._id).length * product.price}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>Total Price</td>
                                    <td></td>
                                    <td>&#8377;{total}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                            
                </div>
                {!!cartProducts?.length && (
                    <div className="bg-gradient-to-bl from-[#ddd6f3] to-[#faaca8] rounded-md p-8">
                        <HeadTag className="text-3xl font-extrabold">Order Information</HeadTag>
                            <Input type="text" placeholder="Name" value={name} name="name"
                            onChange={ev => setName(ev.target.value)}  />
                            <Input type="text" placeholder="Email" value={email} name="email"
                            onChange={ev => setEmail(ev.target.value)}  />
                            <Input type="text" placeholder="Street Address" value={streetAddress} name="streetAddress"
                            onChange={ev => setStreetAddress(ev.target.value)}  />
                            <div className="flex gap-1"> 
                                <Input type="text" placeholder="City" value={city} name="city"
                            onChange={ev => setCity(ev.target.value)}  />
                                <Input type="text" placeholder="Pincode" value={pinCode} name="pinCode"
                            onChange={ev => setPinCode(ev.target.value)}  />
                            </div>
                            <Input type="text" placeholder="State" value={state} name="state"
                            onChange={ev => setState(ev.target.value)}  />
                            <Input type="text" placeholder="Country" value={country} name="country"
                            onChange={ev => setCountry(ev.target.value)}  />
                            <button onClick={goToPayments}
                                className="block w-full text-white text-xl rounded-xl py-2 bg-gradient-to-r from-[#4568dc] to-[#b06ab3]">
                                Continue to Payment
                            </button>
                    </div>
                )} 
                </ColumnsWrapper>
            </Center>
        </>
    );
}

// name
// email
// streetAddress
// city
// pinCode
// state
// country