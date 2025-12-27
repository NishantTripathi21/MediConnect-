import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-6 py-20 text-text-main'>
            <h1 className='text-3xl font-bold tracking-tight'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm text-text-dim leading-relaxed'>
                Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </p>
            <div className='flex sm:justify-center gap-6 pt-8 w-full overflow-x-auto no-scrollbar pb-4'>
                {specialityData.map((item, index) => (
                    <Link 
                        to={`/doctors/${item.speciality}`} 
                        onClick={() => scrollTo(0, 0)} 
                        className='flex flex-col items-center gap-3 text-xs cursor-pointer flex-shrink-0 group transition-all duration-500' 
                        key={index}
                    >
                        <div className='w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center rounded-2xl bg-bg-surface border border-border-soft group-hover:border-primary/50 group-hover:bg-bg-muted transition-all duration-500 overflow-hidden shadow-lg group-hover:shadow-primary/5 group-hover:-translate-y-2'>
                            <img 
                                className='w-12 sm:w-16 opacity-90 saturate-[.4] group-hover:saturate-100 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500' 
                                src={item.image} 
                                alt={item.speciality} 
                            />
                        </div>
                        <p className='text-text-dim group-hover:text-primary font-medium tracking-wide transition-colors'>
                            {item.speciality}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu