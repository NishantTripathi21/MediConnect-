import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-hero-gradient rounded-3xl px-6 md:px-10 lg:px-20 overflow-hidden group'>

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                <p className='text-3xl md:text-4xl lg:text-6xl text-text-main font-bold leading-tight'>
                    Book Appointment <br />  
                    <span className='text-primary'>With Trusted Doctors</span>
                </p>
                <div className='flex flex-col md:flex-row items-center gap-4 text-text-dim text-sm font-medium'>
                    <img className='w-28 filter brightness-90 saturate-[.6]' src={assets.group_profiles} alt="" />
                    <p className='leading-relaxed'>
                        Simply browse through our extensive list of trusted doctors, 
                        <br className='hidden sm:block' /> 
                        schedule your appointment hassle-free.
                    </p>
                </div>
                <a href='#speciality' className='flex items-center gap-3 bg-primary px-8 py-4 rounded-full text-bg-main font-bold text-sm m-auto md:m-0 hover:scale-105 hover:bg-primary-muted transition-all duration-300 shadow-lg shadow-primary/10'>
                    Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
                </a>
            </div>

            {/* --------- Header Right --------- */}
            <div className='md:w-1/2 relative'>
                <img 
                    className='w-full md:absolute bottom-0 h-auto rounded-lg opacity-90 saturate-[.4] group-hover:saturate-100 group-hover:opacity-100 transition-all duration-1000' 
                    src={assets.header_img} 
                    alt="" 
                />
            </div>
        </div>
    )
}

export default Header