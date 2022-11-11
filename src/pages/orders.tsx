import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import db from "../../firebase";
import Header from "../components/Header";
import {stripe} from '../lib/stripe'
import { authOptions } from "./api/auth/[...nextauth]";
import moment from 'moment'
import ProductProps from '../pages/index'
import { Stripe } from "stripe";
import Order from "../components/Order";

export interface OrderProps{
  id: string
  amount: number
  amountShipping: number
  timestamp: number
  images: string[]
  items: Stripe.LineItem[]
}

export default function Orders(orders: OrderProps[]){

  const ordersList = Object.values(orders).flat()
  
  const {data: session} = useSession()
  return(
    <div>
      <Header />

      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your orders</h1>

        {session ? (
          <h2>{ordersList.length} Orders</h2>
        ) : <h2>Please sign in to see your orders</h2>
        }

        <div className="mt-5 space-y-4">
          {ordersList?.map((order) => (
            <Order
              key={order.id}
              id={order.id}
              amount={order.amount}
              amountShipping={order.amountShipping}
              items={order.items}
              timestamp={order.timestamp}
              images={order.images}
            />
          ))}
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

  if(!session){
    return{
      props:{}
    }
  }
    // Firebase db
  const stripeOrders = await db
  .collection('users')
  .doc(session?.user?.email as string | undefined)
  .collection('orders')
  .orderBy('timestamp', 'desc')
  .get()

  // Stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order: { id: any; data: any; }) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items:(
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100
        })
      ).data
    }))
  )

  

  return{
    props:{
      orders,
      session
    }
  }
}