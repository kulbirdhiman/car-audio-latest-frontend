import React from 'react'
import HeroSection from '../components/home/HeroSection'
import WhatWeOffer from '@/components/home/WhatWeOffer'
import SteeringMatchFinder from '@/components/home/SterringWheel'
import Accessories from '@/components/home/Accessories'
import AudioSection from '@/components/home/AudioSection'
import NewArrivals from '@/components/home/newArrivals'
const page = () => {
  return (
    <div className='xl:max-w-[1700px] mx-auto'>
     <div >

        <HeroSection />
      </div>
      <div>
        <WhatWeOffer />
      </div>
      <div className='xl:w-13/14 mx-auto'>
      <SteeringMatchFinder />
      </div>
      <Accessories />
      <AudioSection />
      <NewArrivals />
      
    </div>
  )
}

export default page