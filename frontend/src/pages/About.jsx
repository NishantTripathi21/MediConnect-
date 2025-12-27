import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='text-text-main'>
        <div className='text-center text-2xl pt-10 text-text-dim'>
            <p>ABOUT <span className='text-text-main font-semibold'>US</span></p>
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-12 items-center'>
            <div className='w-full md:max-w-[360px] rounded-2xl overflow-hidden bg-bg-surface border border-border-soft group'>
                <img 
                    className='w-full opacity-90 saturate-[.4] group-hover:saturate-100 group-hover:opacity-100 transition-all duration-700' 
                    src={assets.about_image} 
                    alt="About MediConnect" 
                />
            </div>
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-text-dim leading-relaxed'>
                <p>Welcome To <span className='text-primary font-medium'>MediConnect</span>, Your Trusted Partner In Managing Your HealthCare Needs Conveniently And Efficiently.
                    At MediConnect, We Understand The Challenges Individuals Face When It Comes To Scheduling Doctor Appointments And Managing Their Health Records.
                </p>
                <p>MediConnect Is Committed To Excellence In Healthcare Technology.
                    We Continuously Strive To Enhance Our Platform, Integrating The Latest Advancements To Improve User Experience And Deliver Superior Service.
                    Whether You're Booking Your First Appointment Or Managing Ongoing Care, MediConnect Is Here To Support You Every Step Of The Way.
                </p>
                <b className='text-text-main text-base'>Our Vision</b>
                <p>Our Vision At MediConnect Is To Create A Seamless HealthCare Experience For Every User.
                    We Aim To Bridge The Gap Between Patients And HealthCare Providers, Making It Easier For You To Access The Care You Need, When You Need It.
                </p>
            </div>
        </div>

        <div className='text-xl my-8'>
            <p>WHY <span className='text-text-main font-semibold'>CHOOSE US</span></p>
        </div>

        <div className='flex flex-col md:flex-row mb-20 border border-border-soft rounded-xl overflow-hidden'>
            <div className='flex-1 border-b md:border-b-0 md:border-r border-border-soft px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-bg-surface hover:text-primary transition-all duration-300 text-text-dim cursor-pointer group'>
                <b className='text-text-main group-hover:text-primary transition-colors'>EFFICIENCY:</b>
                <p>Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.</p>
            </div>
            <div className='flex-1 border-b md:border-b-0 md:border-r border-border-soft px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-bg-surface hover:text-primary transition-all duration-300 text-text-dim cursor-pointer group'>
                <b className='text-text-main group-hover:text-primary transition-colors'>CONVENIENCE:</b>
                <p>Access To A Network Of Trusted HealthCare Professionals In Your Area.</p>
            </div>
            <div className='flex-1 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-bg-surface hover:text-primary transition-all duration-300 text-text-dim cursor-pointer group'>
                <b className='text-text-main group-hover:text-primary transition-colors'>PERSONALIZATION:</b>
                <p>Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.</p>
            </div>
        </div>
    </div>
  )
}

export default About