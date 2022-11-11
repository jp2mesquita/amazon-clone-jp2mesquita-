import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon
} from '@heroicons/react/outline'
import  {signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";


export default function Header(){
  const  {data: session} = useSession()

  const router = useRouter()
  const items = useSelector(selectItems)
  
  return(
    <header>
      <div className="flex items-center bg-amazon_blue  flex-grow py-2">
        <div className="mt-2 px-4 flex items-center flex-grow sm:flex-grow-0">
          <Image 
            onClick={ () => router.push('/')}
            src='https://links.papareact.com/f90'
            alt=''
            width={100}
            height={30}
            quality={100}
            className='object-contain cursor-pointer'
          />
        </div>

        <div className="hidden items-center h-10 rounded-md flex-grow cursor-pointer sm:flex bg-yellow-500 hover:bg-yellow-600">
          <input 
            type="text" 
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
          />
          <SearchIcon className="h-14 p-4"/>
        </div>

        <div className="text-white flex items-center text-xs gap-6 mx-6 whitespace-nowrap ">
          <div 
            className="link" 
            onClick={!session ? () => signIn() : () => signOut()}
          >
            <p className="font-extrabold md:text-sm">
              {session ? `Hello ${session.user?.name}` : 'Sign In'} 
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div onClick={ () => router.push('/orders')} className="link">
            <p className="font-extrabold md:text-sm">Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div 
            onClick={() => router.push('/checkout')}
            className="relative link flex items-center"
          >
            <span
              className="absolute top-0 right-0 md:right-10 w-4 h-4 text-center text-black font-bold  bg-yellow-500 rounded-full"
            >
              {items.length}
            </span>
            <ShoppingCartIcon 
              className="h-10"
            />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
          </div>
        </div>
      </div>

      <div className="flex items-center bg-amazon_blue-light text-white gap-3 p-2 pl-6 whitespace-nowrap overflow-hidden">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today&apos;s Deals</p>
        <p className="link hidden lg:inline-flex">Eletronics</p>
        <p className="link hidden lg:inline-flex">Food  & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>



      </div>
    </header>
  )
}