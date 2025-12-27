import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const handleDemoLogin = (role) => {
    if (role === 'Admin') {
      setState('Admin')
      setEmail('admin@mediconnect.com')
      setPassword('TrustMeBro')
    } else {
      setState('Doctor')
      setEmail('kavita.mehra@mediconnect.in')
      setPassword('Doctor@123')
    }
    toast.info(`${role} credentials filled!`)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center text-white'>
      <div className='flex flex-col gap-6 m-auto items-start p-10 min-w-[340px] sm:min-w-96 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm shadow-2xl'>
        
        <div className='m-auto text-center'>
          <p className='text-3xl font-bold tracking-tight'><span className='text-primary'>{state}</span> Login</p>
          <p className='text-gray-400 text-sm mt-2'>Please sign in to continue</p>
        </div>

        <div className='w-full'>
          <p className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1'>Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='bg-white/5 border border-white/10 rounded-xl w-full p-3 outline-none focus:border-primary focus:bg-white/10 transition-all text-white' 
            type="email" 
            placeholder='admin@mediconnect.com'
            required 
          />
        </div>

        <div className='w-full'>
          <p className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5 ml-1'>Password</p>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='bg-white/5 border border-white/10 rounded-xl w-full p-3 outline-none focus:border-primary focus:bg-white/10 transition-all text-white' 
            type="password" 
            placeholder='••••••••'
            required 
          />
        </div>

        <button className='bg-primary text-white w-full py-3 rounded-xl text-base font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all'>
          Login
        </button>

        <div className='m-auto text-sm'>
          {
            state === 'Admin'
              ? <p className='text-gray-400'>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary font-bold cursor-pointer hover:underline underline-offset-4'>Click here</span></p>
              : <p className='text-gray-400'>Admin Login? <span onClick={() => setState('Admin')} className='text-primary font-bold cursor-pointer hover:underline underline-offset-4'>Click here</span></p>
          }
        </div>

        {/* --- Quick Demo Access Section --- */}
        <div className='w-full pt-6 mt-2 border-t border-white/10'>
          <p className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-center mb-4'>Demo Access</p>
          <div className='flex flex-col gap-3'>
            <div 
              onClick={() => handleDemoLogin('Admin')}
              className='flex justify-between items-center bg-white/5 border border-white/10 p-3 rounded-xl cursor-pointer hover:bg-white/10 hover:border-primary/50 transition-all group'
            >
              <span className='text-xs font-bold text-gray-300 group-hover:text-white'>Admin Account</span>
              <span className='text-[9px] bg-primary/10 text-primary px-2 py-1 rounded font-black uppercase'>Auto Fill</span>
            </div>
            <div 
              onClick={() => handleDemoLogin('Doctor')}
              className='flex justify-between items-center bg-white/5 border border-white/10 p-3 rounded-xl cursor-pointer hover:bg-white/10 hover:border-primary/50 transition-all group'
            >
              <span className='text-xs font-bold text-gray-300 group-hover:text-white'>Doctor Account</span>
              <span className='text-[9px] bg-primary/10 text-primary px-2 py-1 rounded font-black uppercase'>Auto Fill</span>
            </div>
          </div>
        </div>
        
      </div>
    </form>
  )
}

export default Login