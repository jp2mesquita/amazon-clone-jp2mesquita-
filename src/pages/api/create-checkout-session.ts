import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";


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

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { items, email } = req.body

  const transformedItems = items.map( (item:  ProductProps) => ({
    price_data: {
      currency: 'usd',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
        description: item.description,
      }
    },
    quantity: 1
  }
  ))

  const images = JSON.stringify(items.map((item: ProductProps )=> item.image))
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_options: [{
      shipping_rate: 'shr_1M2aqeIu8RF89w8brwVXqzjb'
    }],
    shipping_address_collection:{
      allowed_countries: ['US', 'BR']
    },
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.NEXT_HOST}/success`,
    cancel_url: `${process.env.NEXT_HOST}/checkout`,
    metadata:{
      email,
      images: images
    },
  });

  res.status(200).json({ checkoutSessionUrl: session.url })
} 