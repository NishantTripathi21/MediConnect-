import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10 border-t border-border-soft'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-24 text-sm'>

        <div>
          <div className="text-2xl font-bold text-primary tracking-tight mb-5 cursor-default">
            MEDICONNECT
          </div>
          <p className='w-full md:w-2/3 text-text-dim leading-7'>
            A modern, secure healthcare platform designed to provide a calm and frictionless experience for patients and medical professionals alike. Join our network of trusted specialists today.
          </p>
        </div>

        <div>
          <p className='text-text-main font-semibold mb-5 tracking-wider'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-text-dim'>
            <li className='hover:text-primary transition-colors cursor-pointer'>Home</li>
            <li className='hover:text-primary transition-colors cursor-pointer'>About us</li>
            <li className='hover:text-primary transition-colors cursor-pointer'>Delivery</li>
            <li className='hover:text-primary transition-colors cursor-pointer'>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-text-main font-semibold mb-5 tracking-wider'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-text-dim'>
            <li className='hover:text-text-main transition-colors'>+91-99****0041</li>
            <li className='hover:text-text-main transition-colors cursor-pointer'>mediconnect@gmail.com</li>
          </ul>
        </div>

      </div>

      <div className='border-t border-border-soft/50'>
        <p className='py-8 text-xs text-center text-text-dim/60 tracking-widest uppercase'>
          Copyright 2025 @ mediconnect.com - All Right Reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer