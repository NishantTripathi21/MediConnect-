import React from 'react'
import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5 text-white'>

      <p className='mb-6 text-2xl font-bold tracking-tight'>Appointments Overview</p>

      <div className='bg-transparent border border-white/10 rounded-3xl overflow-hidden shadow-2xl'>
        
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1.5fr] gap-1 py-5 px-8 border-b border-white/10 bg-white/5 text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p className='text-center'>Action</p>
        </div>

        <div className='max-h-[80vh] overflow-y-auto custom-scrollbar'>
          {[...appointments].reverse().map((item, index) => (
            <div key={index} className='flex flex-wrap justify-between sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1.5fr] gap-1 items-center text-white py-5 px-8 border-b border-white/5 last:border-none hover:bg-white/5 transition-all'>
              
              <p className='max-sm:hidden text-gray-500 font-medium'>{index + 1}</p>
              
              <div className='flex items-center gap-3'>
                <img src={item.userData.image} className='w-10 h-10 rounded-xl object-cover border border-white/10' alt="" /> 
                <p className='font-bold text-sm'>{item.userData.name}</p>
              </div>

              <div>
                <p className='inline-block text-[9px] font-black uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full bg-white/5 text-gray-300'>
                  {item.payment ? 'Online' : 'CASH'}
                </p>
              </div>

              <p className='max-sm:hidden text-gray-400'>{calculateAge(item.userData.dob)}</p>

              <p className='text-gray-400 font-medium text-sm'>
                {slotDateFormat(item.slotDate)} | <span className='text-[#14b8a6]'>{item.slotTime}</span>
              </p>

              <p className='font-bold text-[#14b8a6]'>{currency}{item.amount}</p>

              <div className='flex items-center justify-center'>
                {item.cancelled ? (
                  <p className='text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-500/20 bg-red-500/10 px-4 py-1.5 rounded-full'>
                    Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-500/20 bg-green-500/10 px-4 py-1.5 rounded-full'>
                    Completed
                  </p>
                ) : (
                  <div className='flex items-center gap-2'>
                    <button 
                      onClick={() => cancelAppointment(item._id)}
                      className='text-white/60 text-[10px] font-black uppercase tracking-widest border border-white/10 bg-white/5 px-4 py-1.5 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition-all active:scale-95'
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => completeAppointment(item._id)}
                      className='text-[#14b8a6] text-[10px] font-black uppercase tracking-widest border border-[#14b8a6]/20 bg-[#14b8a6]/5 px-4 py-1.5 rounded-lg hover:bg-[#14b8a6] hover:text-black hover:border-[#14b8a6] transition-all active:scale-95'
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments