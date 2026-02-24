
import React from 'react'
import { Button } from '../components/ui/button'
import CompanionCard from '../components/CompanionCard'
import CompanionsList from '../components/CompanionsList'
import CTA from '../components/CTA'

const Page = () => {
  return (
    <main>
      <h1 >Popular Companions</h1>
      <section className='home-section'>
        <CompanionCard 
        id="123"
        name="Nuera the Brainy Explorer"
        topic="Neural Netowrk of the brain"
        subject = "science"
        duration={45}
        color = "#ffda6e"
        
        />
        <CompanionCard 
        id="789"
        name="Verba the vocabulary builder"
        topic="Language learning"
        subject = "English Litrature"
        duration={45}
        color = "#ffda6e"
        
        />
        <CompanionCard 
        id="456"
        name="Countsy the number wisard"
        topic="derivatives and integrals"
        subject = "Maths"
        duration={30}
        color = "#e5d0ff"
        
        />
        

      </section>
      <section className='home-section'>
        <CompanionsList />
        <CTA/>

      </section>
    </main>
  )
}

export default Page