import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='text-text-main'>

      <div className='text-center text-2xl pt-10 text-text-dim'>
        <p>CONTACT <span className='text-text-main font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-12 mb-28 text-sm'>
        <div className='w-full md:max-w-[360px] rounded-2xl overflow-hidden bg-bg-surface border border-border-soft group'>
          <img 
            className='w-full opacity-90 saturate-[.4] group-hover:saturate-100 group-hover:opacity-100 transition-all duration-700' 
            src={assets.contact_image} 
            alt="Contact MediConnect" 
          />
        </div>
        
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-bold text-lg text-text-main tracking-wide uppercase'>OUR OFFICE</p>
          <p className='text-text-dim leading-relaxed'>54709 Willms Station <br /> Suite 350, Washington, USA</p>
          <p className='text-text-dim leading-relaxed'>Tel: (415) 555-0132 <br /> Email: mediconnect@gmail.com</p>
          
          <p className='font-bold text-lg text-text-main tracking-wide uppercase mt-4'>CAREERS AT MEDICONNECT</p>
          <p className='text-text-dim leading-relaxed'>Learn more about our teams and job openings.</p>
          
          <button className='border border-border-soft px-8 py-4 text-sm font-bold rounded-lg hover:bg-primary hover:border-primary hover:text-bg-main transition-all duration-500 active:scale-95 shadow-lg hover:shadow-primary/20'>
            Explore Jobs
          </button>
        </div>
      </div>

    </div>
  )
}

export default Contact