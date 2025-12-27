import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const navItemClass = ({ isActive }) => 
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${
      isActive 
      ? 'bg-white/5 border-r-4 border-primary text-white' 
      : 'text-gray-400 hover:bg-white/5'
    }`

  return (
    <div className='min-h-screen bg-black border-r border-white/10'>
      {aToken && (
        <ul className='mt-5'>
          <NavLink to={'/admin-dashboard'} className={navItemClass}>
            <img className='w-5 brightness-200' src={assets.home_icon} alt='' />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink to={'/all-appointments'} className={navItemClass}>
            <img className='w-5 brightness-200' src={assets.appointment_icon} alt='' />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>
          <NavLink to={'/add-doctor'} className={navItemClass}>
            <img className='w-5 brightness-200' src={assets.add_icon} alt='' />
            <p className='hidden md:block'>Add Doctor</p>
          </NavLink>
          <NavLink to={'/doctor-list'} className={navItemClass}>
            <img className='w-5 brightness-200' src={assets.people_icon} alt='' />
            <p className='hidden md:block'>Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className='mt-5'>
          <NavLink to={'/doctor-dashboard'} className={navItemClass}>
            <img className='w-5 brightness-200' src={assets.home_icon} alt='' />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink to={'/doctor-appointments'} className={navItemClass}>
            <img className='w-5 brightness-200' src={assets.appointment_icon} alt='' />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>
          <NavLink to={'/doctor-profile'} className={navItemClass}>
            <img className='w-5 brightness-200' src={assets.people_icon} alt='' />
            <p className='hidden md:block'>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar