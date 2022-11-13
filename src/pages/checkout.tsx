import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from 'react-currency-formatter'
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { unstable_getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import Head from "next/head";
 

const stripePromise = loadStripe(process.env.NEXT_STRIPE_PUBLIC_KEY)


export default function Checkout(){

  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)
  const {data: session} = useSession()

  async function handleCreateCheckouSession(){
    const stripe = await stripePromise



    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items: items,
      email: session?.user?.email
    })

    const { checkoutSessionUrl } = checkoutSession.data
    // const result = await stripe?.redirectToCheckout({
    //   sessionId: checkoutSession.data.id
    // })
    if (checkoutSessionUrl?.error) alert(checkoutSessionUrl.error.message)
    
    window.location.href = checkoutSessionUrl
 
  }

  return(
    <div className="bg-gray-100">

      <Head >
        <title>Checkout | Amazon 2.0</title>
      </Head>

      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image 
            src='https://links.papareact.com/ikj'
            alt=''
            width={1020}
            height={250}
            className='object-contain'
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              
              {items.length === 0 ? 'Your amazon basket is empty' : 'Shopping Basket'}

            </h1>

            {
              items.map( (item, index ) => (
                <CheckoutProduct
                  key={index}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                  description={item.description}
                  category={item.category}
                  image={item.image}
                  hasPrime={item.hasPrime}
                />
              ))
            }
          </div>
        </div>

        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length >0 &&(
            <>
              <h2 className="whitespace-nowrap">Subtotal ({items.length} items):{' '}
                <span className="font-bold">
                  <Currency quantity={total}/>
                </span>
              </h2>

              <button
                role='link'
                onClick={() => handleCreateCheckouSession()}
                disabled={!session} 
                className={`button mt-2 ${!session && 'from-gray-400 to-gray-600 border-gray-200 text-gray-200 cursor-not-allowed'}`}
               >
                {!session  ? 'Sign in to chekcout' : 'Proceed to checkout'}
              </button>
            </>
          ) }
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