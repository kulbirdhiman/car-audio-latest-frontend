import React from 'react'
import HeroSection from '../components/home/HeroSection'
import WhatWeOffer from '@/components/home/WhatWeOffer'
import SteeringMatchFinder from '@/components/home/SterringWheel'
import Accessories from '@/components/home/Accessories'
import AudioSection from '@/components/home/AudioSection'
import NewArrivals from '@/components/home/newArrivals'
const page = () => {
  return (
    <div>
      <div>
        <HeroSection />
      </div>
      <div>
        <WhatWeOffer />
      </div>
      <div>
      <SteeringMatchFinder />
      </div>
      <Accessories />
      <AudioSection />
      <NewArrivals />
      
    </div>
  )
}

export default page