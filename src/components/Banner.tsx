import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function Banner(){
  
  const images = [
    "https://links.papareact.com/gi1",
    "https://links.papareact.com/6ff",
    "https://links.papareact.com/7ma"
  ]

  return(
    <div className="relative">

      <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20'/>

      <Carousel
      autoPlay
      infiniteLoop
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      interval={5000}
      renderThumbs={
        () => images.map((item) => (
          <div key='item'>
            <Image 
              src={item}
              alt=''
              fill
              className='objetc-contain'
            />
          </div>
        ))
      }
      >

        {images.map( (item) =>{
          return(
            <Image 
              key={item}
              src={item}
              alt=''
              width={1080}
              height={460}
              loading='lazy'
              quality={100}
              
              
            />
          )
        })}
      
      </Carousel>
    </div>
  )
}