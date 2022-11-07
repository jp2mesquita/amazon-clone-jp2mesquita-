import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon
} from '@heroicons/react/outline'

export default function Header(){
  return(
    <header>
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items center flex-grow sm:flex-grow-0">
          <Image 
            src='https://links.papareact.com/f90'
            alt=''
            width={150}
            height={40}
            quality={100}
            className='object-contain cursor-pointer'
          />
        </div>

        <div>
          <input 
            type="text" 
          />
        </div>
      </div>
      <div></div>
    </header>
  )
}