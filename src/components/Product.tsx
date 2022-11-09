import Image from "next/image"
import { useEffect, useState } from "react"
import { StarIcon } from '@heroicons/react/solid'
import  Currency  from 'react-currency-formatter'
import { addToBasket } from "../slices/basketSlice"

import { ProductProps } from "../pages"
import { useDispatch } from "react-redux"

const MAX_RATING = 5
const MIN_RATING = 1

export default function Product({ id, title, price, description, category, image} : ProductProps){

  const dispath = useDispatch()

  const [hasPrime, setHasPrime] = useState(false)
  const [rating, setRating] = useState(1)

  useEffect(() => {
    const randomBoolean = Math.random() < .5
    const randomNumberBettwen1and5 = Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)

    setRating(randomNumberBettwen1and5)
    setHasPrime(randomBoolean)
  }, [])

  
  function handleAddToBasket(){
    const product = {
      id, 
      title,
      price, 
      description, 
      category, 
      image,
      rating,
      hasPrime
    }

    dispath(addToBasket(product))
  }

  return(
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400 my-3">{category}</p>

      <Image 
        src={image}
        alt=''
        height={200}
        width={200}
        className='object-contain flex mx-auto'
      />
      <h4>{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill('')
          .map( (_, i) => {

            return(
              <StarIcon key={i} className="h-5 text-yellow-500"/>
            )
        })}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
         <Currency quantity={price}  />
      </div>

      {hasPrime && (
        <div className="flex items-center gap-2 -mt-5">
          <Image 
            src='https://links.papareact.com/fdw'
            alt=''
            width={48}
            height={48}
            className='object-contain'
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button 
        onClick={() => handleAddToBasket()}
        className="mt-auto button"
      >
        Add to Basket
      </button>
    </div>
  )
}