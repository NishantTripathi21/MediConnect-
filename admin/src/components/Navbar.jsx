import React, { useContext } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-white/10 bg-black sticky top-0 z-10'>
      <div className='flex items-center gap-4 text-xs'>
        <h1 
          onClick={() => navigate('/')} 
          className='text-2xl sm:text-3xl font-black cursor-pointer tracking-tighter text-[#14b8a6]'
        >
          MEDICONNECT
        </h1>
        
        <p className='border px-2.5 py-0.5 rounded-full border-white/20 text-white text-[10px] uppercase tracking-widest bg-white/5'>
          {aToken ? 'Admin' : 'Doctor'} Panel
        </p>
      </div>
      
      <button 
        onClick={() => logout()} 
        className='border border-[#14b8a6] text-[#14b8a6] text-sm px-10 py-2 rounded-full font-bold hover:bg-[#14b8a6] hover:text-black shadow-[0_0_15px_rgba(20,184,166,0.2)] hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all duration-300 active:scale-95'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar