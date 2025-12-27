import React, { useEffect, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='m-5 w-full max-w-6xl text-white'>
      <p className='mb-6 text-2xl font-bold tracking-tight'>All Appointments</p>

      <div className='bg-transparent border border-white/10 rounded-3xl shadow-2xl overflow-hidden'>
        
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1.2fr] items-center py-5 px-8 border-b border-white/10 bg-white/5 text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p className='text-center'>Action</p>
        </div>

        <div className='max-h-[70vh] overflow-y-auto custom-scrollbar'>
          {[...appointments].reverse().map((item, index) => (
            <div key={index} className='flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1.2fr] items-center text-white py-5 px-8 border-b border-white/5 last:border-none hover:bg-white/5 transition-all'>
              <p className='max-sm:hidden text-gray-500 font-medium'>{index + 1}</p>
              
              <div className='flex items-center gap-3'>
                <img src={item.userData.image} className='w-10 h-10 rounded-xl object-cover border border-white/10 shadow-sm' alt="" />
                <p className='font-bold text-sm'>{item.userData.name}</p>
              </div>

              <p className='max-sm:hidden text-gray-300'>{calculateAge(item.userData.dob)}</p>

              <p className='text-gray-400 font-medium text-sm'>
                {slotDateFormat(item.slotDate)} | <span className='text-primary'>{item.slotTime}</span>
              </p>

              <div className='flex items-center gap-3'>
                <img src={item.docData.image} className='w-10 h-10 rounded-xl bg-white/5 object-cover border border-white/10 shadow-sm' alt="" />
                <p className='font-bold text-sm text-gray-200'>{item.docData.name}</p>
              </div>

              <p className='font-bold text-[#14b8a6]'>{currency}{item.amount}</p>

              <div className='flex justify-center'>
                {item.cancelled ? (
                  <p className='text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-500/20 bg-red-500/10 px-4 py-1.5 rounded-full'>
                    Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-500/20 bg-green-500/10 px-4 py-1.5 rounded-full'>
                    Completed
                  </p>
                ) : (
                  <button 
                    onClick={() => cancelAppointment(item._id)} 
                    className='text-white/60 text-[10px] font-black uppercase tracking-widest border border-white/10 bg-white/5 px-4 py-1.5 rounded-full hover:bg-red-500 hover:text-white hover:border-red-500 transition-all active:scale-95 shadow-lg'
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllAppointments