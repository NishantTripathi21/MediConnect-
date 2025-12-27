import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='m-5 text-white'>
      <h1 className='text-2xl font-bold'>All Doctors</h1>
      <p className='text-gray-400 text-sm mt-1'>Manage doctor availability and profiles.</p>
      
      <div className='w-full grid grid-cols-auto gap-6 gap-y-8 pt-8'>
        {doctors.map((item, index) => (
          <div 
            key={index}
            className='border border-white/10 rounded-2xl overflow-hidden cursor-pointer group hover:translate-y-[-10px] transition-all duration-500 bg-transparent shadow-xl'
          >
            <div className='relative overflow-hidden bg-white/5'>
              <img 
                className='group-hover:scale-105 transition-all duration-500' 
                src={item.image} 
                alt={item.name} 
              />
              {!item.available && (
                <div className='absolute inset-0 bg-black/40 backdrop-grayscale-[0.5] flex items-center justify-center'>
                   <p className='bg-black/60 text-orange-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-orange-500/20'>Unavailable</p>
                </div>
              )}
            </div>

            <div className='p-5'>
              <div className='flex items-center gap-2 text-sm'>
                <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                <p className={`${item.available ? 'text-green-500' : 'text-orange-500'} font-medium`}>
                  {item.available ? 'Available' : 'Offline'}
                </p>
              </div>
              
              <p className='text-white text-xl font-bold mt-2'>{item.name}</p>
              <p className='text-gray-400 text-sm'>{item.speciality}</p>
              
              <div className='mt-4 flex items-center gap-3 pt-4 border-t border-white/5'>
                <input 
                  className='cursor-pointer w-4 h-4 accent-primary'
                  onChange={() => changeAvailability(item._id)} 
                  type="checkbox" 
                  checked={item.available} 
                  id={`avail-${index}`}
                />
                <label htmlFor={`avail-${index}`} className='text-sm text-gray-300 cursor-pointer select-none hover:text-white transition-colors'>
                  Set Availability
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList