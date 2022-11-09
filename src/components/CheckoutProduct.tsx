import { StarIcon } from "@heroicons/react/solid"
import Image from "next/image"
import Currency  from 'react-currency-formatter'
import { useDispatch } from "react-redux"
import { addToBasket, removeFromBasket } from '../slices/basketSlice'

interface ProdcutProps{
  id: number
  title: string
  price: number 
  rating: number,
  description: string 
  category: string 
  image: string
  hasPrime: boolean
}


export default function CheckoutProduct({  
  id,
  title,
  price, 
  rating,
  description,
  category,
  image,
  hasPrime  } : ProdcutProps ){ 

  const dispath = useDispatch()

  function handleAddItemToBasket(){
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

  function handleRemoveItemFromBasket(){
    dispath(removeFromBasket({ id }))
  }

  return(
    <div className="grid grid-cols-5">
      <Image 
        src={image}
        alt=''
        height={200}
        width={200}
        className='object-contain'
      />

      <div className="col-span-3 mx-5">
        <p>{title}</p>

        <div className="flex">
          {Array(rating)
            .fill('')
            .map( (_, i) => {

              return(
                <StarIcon key={i} className="h-5 text-yellow-500"/>
              )
          })}
        </div>

        <p className="text-justify line-clamp-3 text-xs my-2">{description}</p>

        <Currency quantity={price} />

        {hasPrime && (
          <div className="flex items-center gap-2 ">
            <Image 
              src='https://links.papareact.com/fdw'
              alt=''
              width={48}
              height={48}
              loading="lazy"
              className='object-contain'
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-2 my-auto justify-self-end">
        <button
          onClick={ () => handleAddItemToBasket()}
          className="button"
        > 
          Add one to Basket
        </button>
        <button 
          onClick={ () => handleRemoveItemFromBasket()}
          className="button"
        > 
          Remove to Basket
        </button>

      </div>
    </div>
  )
}