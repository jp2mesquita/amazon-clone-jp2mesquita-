import { CheckCircleIcon } from "@heroicons/react/solid";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Success(){

  const router = useRouter()

  return(
    <div className="bg-gray-100 h-screen">

      <Head >
        <title>Success | Amazon 2.0</title>
      </Head>

      <Header />
      
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-600 h-10"/>
            <h1 className="text-3xl">
              Thank You, your order has been confirmed
            </h1>
          </div>
          <p>
            Thank you for shopping with us. We&apos;ll send a confirmation ons your item has shipped. If you would like to check the status of your order(s) please press the link below. 
          </p>
          <button 
            onClick={() => router.push('/orders')}
            className="button mt-8"
          >
            Go to My orders
          </button>
        </div>
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

  return{
    props:{
      session
    }
  }
}