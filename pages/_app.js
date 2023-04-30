import {createGlobalStyle} from "styled-components";
import "../styles/globals.css"
import CarContextProvider from "@/components/CartContext";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@400;500;600;700&family=Bree+Serif&family=Pacifico&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Updock&display=swap');
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CarContextProvider>
        <Component {...pageProps} />
      </CarContextProvider>
      
    </>
  );
}