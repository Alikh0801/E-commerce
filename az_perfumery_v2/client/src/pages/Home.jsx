import React from 'react'
import Hero from '../components/hero/Hero'
import Bestsellers from '../components/bestsellers/Bestsellers'
import WhyUs from '../components/whyUs/WhyUs'

function Home() {
    return (
        <div>
            <Hero />
            <Bestsellers />
            <WhyUs />
        </div>
    )
}

export default Home