import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { api } from "../lib/axios";
import { authOptions } from "./api/auth/[...nextauth]";

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



export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )
  
  const products = await api.get('/products')

  return{
    props:{
      products: products.data,
      session
    }
  }
}