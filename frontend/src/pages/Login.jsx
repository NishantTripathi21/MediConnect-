import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const handleDemoLogin = () => {
    setState('Login')
    setEmail('Demo@mediconnect.com')
    setPassword('Demo@123')
    toast.info('User demo credentials filled!')
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center text-text-main'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 bg-bg-surface border border-border-soft rounded-2xl text-sm shadow-2xl'>
        <p className='text-2xl font-bold text-text-main'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p className='text-text-dim'>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        
        {state === 'Sign Up' && (
          <div className='w-full '>
            <p className='font-medium mb-1'>Full Name</p>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className='bg-bg-muted border border-border-soft rounded-lg w-full p-2.5 outline-none focus:border-primary transition-all text-text-main' 
              type="text" 
              required 
            />
          </div>
        )}

        <div className='w-full '>
          <p className='font-medium mb-1'>Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='bg-bg-muted border border-border-soft rounded-lg w-full p-2.5 outline-none focus:border-primary transition-all text-text-main' 
            type="email" 
            required 
          />
        </div>

        <div className='w-full '>
          <p className='font-medium mb-1'>Password</p>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='bg-white/5 border border-border-soft rounded-lg w-full p-2.5 outline-none focus:border-primary transition-all text-text-main' 
            type="password" 
            required 
          />
        </div>

        <button className='bg-primary text-bg-main w-full py-3 mt-4 rounded-lg text-base font-bold hover:bg-primary-muted transition-all active:scale-95 shadow-lg shadow-primary/10'>
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        {state === 'Sign Up'
          ? <p className='text-text-dim mt-2'>Already have an account? <span onClick={() => setState('Login')} className='text-primary font-semibold underline cursor-pointer'>Login here</span></p>
          : <p className='text-text-dim mt-2'>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary font-semibold underline cursor-pointer'>Click here</span></p>
        }

        {/* --- HR / Interviewer Quick Access --- */}
        <div className='w-full mt-6 pt-6 border-t border-border-soft'>
          <p className='text-[10px] font-black uppercase tracking-[0.2em] text-text-dim text-center mb-4'>Quick Access</p>
          <div 
            onClick={handleDemoLogin}
            className='flex justify-between items-center bg-bg-muted border border-border-soft p-3 rounded-xl cursor-pointer hover:bg-bg-surface hover:border-primary/50 transition-all group'
          >
            <span className='text-xs font-bold text-text-dim group-hover:text-text-main'>User Demo Account</span>
            <span className='text-[10px] bg-primary/10 text-primary px-2 py-1 rounded font-black uppercase'>Auto Fill</span>
          </div>
        </div>

      </div>
    </form>
  )
}

export default Login