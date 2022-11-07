import Image from "next/image"
import { ProductProps } from "../pages"
import Product from "./Product"

interface Props {
  product: ProductProps[]
}

export default function ProductFeed({product}: Props){

    const products = Object.values(product).flat()


  
  return(
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      

      {products.slice(0,4).map(({ id, title, price, description, category, image}) => (
        <Product 
          key={id}
          id={id}
          title={title}
          category={category}
          description={description}
          image={image}
          price={price}
          
        />
      ))}

      
      <Image 
        src='https://links.papareact.com/dyz'
        alt=''
        height={150}
        width={1980}
        
        className='md:col-span-full'
      />
      
      <div className="md:col-span-2 ">
        {products.slice(4,5).map(({ id, title, price, description, category, image}) => (
          <Product 
            key={id}
            id={id}
            title={title}
            category={category}
            description={description}
            image={image}
            price={price}
            
          />
        ))}
      </div>

      {products.slice(5, products.length).map(({ id, title, price, description, category, image}) => (
        <Product 
          key={id}
          id={id}
          title={title}
          category={category}
          description={description}
          image={image}
          price={price}
          
        />
      ))}

      
    </div>
  )
}
