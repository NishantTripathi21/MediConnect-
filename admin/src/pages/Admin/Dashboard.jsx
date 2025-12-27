import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5 text-white'>
      
      <div className='flex flex-wrap gap-5'>
        <div className='flex items-center gap-6 bg-transparent p-6 min-w-72 rounded-3xl border border-white/10 shadow-lg hover:border-white/20 transition-all'>
          <img className='w-14 bg-white/5 p-3 rounded-2xl' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-3xl font-bold'>{dashData.doctors}</p>
            <p className='text-gray-400 font-medium tracking-wide'>Doctors</p>
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

      <div className='bg-transparent mt-10 rounded-3xl border border-white/10 overflow-hidden'>
        <div className='flex items-center gap-3 px-8 py-6 border-b border-white/10 bg-white/5'>
          <img className='w-6 brightness-200' src={assets.list_icon} alt="" />
          <p className='font-bold text-xl tracking-tight'>Latest Bookings</p>
        </div>

        <div className='pt-2 pb-2'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-8 py-5 gap-4 hover:bg-white/5 transition-all border-b border-white/5 last:border-none' key={index}>
              <img className='rounded-full w-12 h-12 object-cover border border-white/10' src={item.docData.image} alt="" />
              <div className='flex-1'>
                <p className='text-white font-bold text-lg'>{item.docData.name}</p>
                <p className='text-gray-400 text-sm'>Booking on <span className='text-gray-300'>{slotDateFormat(item.slotDate)}</span></p>
              </div>
              
              <div className='flex items-center justify-end min-w-32'>
                {item.cancelled ? (
                  <p className='text-orange-400 text-[10px] font-bold uppercase tracking-widest border border-orange-500/20 bg-orange-500/5 px-3 py-1 rounded'>
                    Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 text-[10px] font-bold uppercase tracking-widest border border-green-500/20 bg-green-500/5 px-3 py-1 rounded'>
                    Completed
                  </p>
                ) : (
                  <button
                    onClick={async () => {
                      await cancelAppointment(item._id)
                      getDashData()
                    }}
                    className='text-red-400 text-xs font-semibold uppercase tracking-wider border border-red-500/20 bg-red-500/5 px-4 py-2 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-all'
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

export default Dashboard