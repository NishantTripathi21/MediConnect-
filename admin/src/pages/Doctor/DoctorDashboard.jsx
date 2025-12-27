import React from 'react'
import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className='m-5 text-white'>

      <div className='flex flex-wrap gap-5'>
        <div className='flex items-center gap-6 bg-transparent p-6 min-w-72 rounded-3xl border border-white/10 shadow-lg hover:border-white/20 transition-all'>
          <img className='w-14 bg-white/5 p-3 rounded-2xl' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-3xl font-bold text-[#14b8a6]'>{currency} {dashData.earnings}</p>
            <p className='text-gray-400 font-medium tracking-wide'>Earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-6 bg-transparent p-6 min-w-72 rounded-3xl border border-white/10 shadow-lg hover:border-white/20 transition-all'>
          <img className='w-14 bg-white/5 p-3 rounded-2xl' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-3xl font-bold'>{dashData.appointments}</p>
            <p className='text-gray-400 font-medium tracking-wide'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-6 bg-transparent p-6 min-w-72 rounded-3xl border border-white/10 shadow-lg hover:border-white/20 transition-all'>
          <img className='w-14 bg-white/5 p-3 rounded-2xl' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-3xl font-bold'>{dashData.patients}</p>
            <p className='text-gray-400 font-medium tracking-wide'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-transparent mt-10 rounded-3xl border border-white/10 overflow-hidden shadow-2xl'>
        <div className='flex items-center gap-3 px-8 py-6 border-b border-white/10 bg-white/5'>
          <img className='w-6 brightness-200' src={assets.list_icon} alt="" />
          <p className='font-bold text-xl tracking-tight'>Latest Bookings</p>
        </div>

        <div className='pt-2 pb-2'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-8 py-5 gap-4 hover:bg-white/5 transition-all border-b border-white/5 last:border-none' key={index}>
              <img className='rounded-xl w-12 h-12 object-cover border border-white/10' src={item.userData.image} alt="" />
              <div className='flex-1'>
                <p className='text-white font-bold text-lg'>{item.userData.name}</p>
                <p className='text-gray-400 text-sm'>Booking on <span className='text-gray-300'>{slotDateFormat(item.slotDate)}</span></p>
              </div>
              
              <div className='flex items-center justify-end min-w-48'>
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

export default DoctorDashboard