import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-border-soft sticky top-0 z-50 bg-bg-main/80 backdrop-blur-md'>
      <div 
        onClick={() => navigate('/')} 
        className='text-2xl font-bold text-primary tracking-tighter cursor-pointer'
      >
        MEDICONNECT
      </div>

      <ul className='md:flex items-start gap-8 font-semibold hidden'>
        <NavLink to='/' className={({ isActive }) => isActive ? 'text-primary' : 'text-text-dim hover:text-text-main transition-all'}>
          <li className='py-1 tracking-wider'>HOME</li>
        </NavLink>
        <NavLink to='/doctors' className={({ isActive }) => isActive ? 'text-primary' : 'text-text-dim hover:text-text-main transition-all'}>
          <li className='py-1 tracking-wider'>ALL DOCTORS</li>
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => isActive ? 'text-primary' : 'text-text-dim hover:text-text-main transition-all'}>
          <li className='py-1 tracking-wider'>ABOUT</li>
        </NavLink>
        <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-primary' : 'text-text-dim hover:text-text-main transition-all'}>
          <li className='py-1 tracking-wider'>CONTACT</li>
        </NavLink>
      </ul>

      <div className='flex items-center gap-4 '>
        {
          token && userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 h-8 rounded-full border border-border-soft object-cover opacity-90 saturate-[.4] group-hover:saturate-100 group-hover:opacity-100 transition-all duration-300' src={userData.image} alt="" />
              <img className='w-2.5 opacity-60' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-full right-0 pt-4 text-base font-medium z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-bg-surface border border-border-soft rounded-xl flex flex-col gap-2 p-3 shadow-2xl'>
                  <p onClick={() => navigate('/my-profile')} className='px-4 py-2 hover:bg-bg-muted rounded-lg text-text-main cursor-pointer transition-all text-sm'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='px-4 py-2 hover:bg-bg-muted rounded-lg text-text-main cursor-pointer transition-all text-sm'>My Appointments</p>
                  <p onClick={logout} className='px-4 py-2 hover:bg-red-500/10 hover:text-danger rounded-lg text-text-main cursor-pointer transition-all text-sm'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-bg-main px-7 py-2.5 rounded-full font-bold hidden md:block hover:bg-primary-muted transition-all active:scale-95 shadow-lg shadow-primary/10'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden invert opacity-80' src={assets.menu_icon} alt="" />

        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-50 overflow-hidden bg-bg-main transition-all duration-300`}>
          <div className='flex items-center justify-between px-5 py-6 border-b border-border-soft'>
            <div className='text-xl font-bold text-primary tracking-tighter'>MEDICONNECT</div>
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 invert opacity-80' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-4 mt-10 px-5 text-xl font-semibold text-text-main'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-8 py-3 rounded-full hover:bg-bg-surface transition-all'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-8 py-3 rounded-full hover:bg-bg-surface transition-all'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-8 py-3 rounded-full hover:bg-bg-surface transition-all'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-8 py-3 rounded-full hover:bg-bg-surface transition-all'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar