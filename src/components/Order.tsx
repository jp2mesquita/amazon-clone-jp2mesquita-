import { OrderProps } from "../pages/orders";
import moment from "moment";
import Currency from 'react-currency-formatter'
import Image from "next/image";

export default function Order(
  {id,
  amount,
  amountShipping,
  items,
  timestamp,
  images}: OrderProps){
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center gap-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-sx">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
        </div>
        <div>
          <p className="text-sx font-bold">TOTAL</p>
          <p>
            <Currency quantity={amount} currency='USD'/> - Next Day Delivery{' '}
            <Currency quantity={amountShipping} currency='USD'/> 
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">{items.length} items</p>

        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-sm whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>

      <div className="p-5 sm:p-10 bg-white">
        <div className="flex gap-6 overflow-x-auto h-28 sm:h-32">
          {images.map( (image, idx) =>(
            <Image 
              key={idx}
              src={image}
              alt=''
              width={130}
              height={200}
              className='object-contain'
            />
          ))}
        </div>
      </div>
    </div>
  )
}