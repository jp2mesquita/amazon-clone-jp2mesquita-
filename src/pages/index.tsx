import { GetServerSideProps } from "next";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { api } from "../lib/axios";

export interface ProductProps{
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating?:{
    rate: number,
    count: number
  }
}

export default function Home(products: ProductProps[]) {
  

  return (
    <div className=''>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />

        <ProductFeed product={products}/>
      </main>
    </div>
  )
}



export const getServerSideProps: GetServerSideProps = async () => {

  const products = await api.get('/products')



 
  return{
    props:{
      products: products.data
    }
  }
}