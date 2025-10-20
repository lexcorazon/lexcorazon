import React from 'react'
import SiteLayout from '@/Layouts/SiteLayout'
import { aj } from '@/data/aj'
import useLenis from './hooks/useLenis'

import PortfolioSection from './Components/PortfolioSection'
import DressedByMMSection from './Components/Dressedbymm'
import CollaborationsSection from './Components/CollaborationsSection'
import Trajectory from './Components/Trayectory'
import AboutMe from './Components/Aboutme'
import ClippingSection from './Components/ClippingSection'

export default function AJHome() {
  useLenis()

  return (
    <SiteLayout brand="aj" className="font-roboto bg-white text-black">

      {/* Hero Section */}
      <PortfolioSection />

      {/* Dressed by MM Section */}
      <DressedByMMSection />

      {/* Collaborations Section */}
      <CollaborationsSection />

      {/* Trajectory Section */}
      <Trajectory />

      {/* About Me Section */}
      <AboutMe />

      {/* Clipping Section */}
      <ClippingSection items={aj.prensa || []} />

    
    </SiteLayout>
  )
}
