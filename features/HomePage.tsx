import Culture from '@/components/Culture'
import Hero from '@/components/Hero'
import JoinUs from '@/components/JoinUs'
import Missions from '@/components/Missions'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

function HomePage() {
  return (
    <div>
      <Hero />
      <JoinUs />
      <Missions />
      <Culture />
    </div>
  )
}

export default HomePage
