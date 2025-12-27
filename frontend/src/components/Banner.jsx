import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='flex bg-bg-surface border border-border-soft rounded-2xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 overflow-hidden shadow-2xl relative group'>
            <div className='absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[120px] -z-10'></div>
            
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-text-main leading-tight'>
                    <p>Book Appointment</p>
                    <p className='mt-2 text-primary'>With 100+ Trusted Doctors</p>
                </div>
                <button 
                    onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
                    className='bg-primary text-bg-main font-bold text-sm sm:text-base px-10 py-3.5 rounded-full mt-8 hover:bg-primary-muted hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all active:scale-95'
                >
                    Create account
                </button>
            </div>

            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                <img 
                    className='w-full absolute bottom-0 right-0 max-w-md opacity-90 saturate-[.4] group-hover:saturate-100 group-hover:opacity-100 transition-all duration-700' 
                    src={assets.appointment_img} 
                    alt="" 
                />
            </div>
        </div>
    )
}

export default Banner