import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    }

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className='text-text-main'>
            <p className='pb-3 mt-12 text-lg font-bold border-b border-border-soft'>My appointments</p>
            <div>
                {appointments.map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-6 border-b border-border-soft'>
                        <div className='bg-bg-surface border border-border-soft rounded-xl overflow-hidden group h-fit'>
                            <img className='w-36 opacity-90 saturate-[.4] group-hover:saturate-100 group-hover:opacity-100 transition-all duration-700' src={item.docData.image} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-text-dim'>
                            <p className='text-text-main text-lg font-bold'>{item.docData.name}</p>
                            <p className='text-primary font-medium'>{item.docData.speciality}</p>
                            <p className='text-text-main font-semibold mt-2'>Address:</p>
                            <p>{item.docData.address.line1}</p>
                            <p>{item.docData.address.line2}</p>
                            <p className='mt-2'>
                                <span className='text-text-main font-semibold'>Date & Time:</span>
                                <span className='ml-1 text-primary'>{slotDateFormat(item.slotDate)} | {item.slotTime}</span>
                            </p>
                        </div>

                        <div className='flex flex-col gap-3 justify-end text-sm text-center'>
                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                <button onClick={() => setPayment(item._id)} className='text-bg-main sm:min-w-48 py-2.5 rounded-lg bg-primary hover:brightness-110 transition-all font-bold'>Pay Online</button>
                            )}

                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                <div className='flex flex-col gap-2'>
                                    <button onClick={() => appointmentStripe(item._id)} className='sm:min-w-48 py-2 border border-border-soft rounded-lg bg-white flex items-center justify-center'><img className='max-w-16 h-5' src={assets.stripe_logo} alt="Stripe" /></button>
                                    <button onClick={() => appointmentRazorpay(item._id)} className='sm:min-w-48 py-2 border border-border-soft rounded-lg bg-white flex items-center justify-center'><img className='max-w-20 h-5' src={assets.razorpay_logo} alt="Razorpay" /></button>
                                </div>
                            )}

                            {!item.cancelled && item.payment && !item.isCompleted && (
                                <button className='sm:min-w-48 py-2.5 border border-cyan-500/30 rounded-lg text-cyan-400 bg-cyan-500/10 font-bold cursor-default'>Paid</button>
                            )}

                            {item.isCompleted && (
                                <button className='sm:min-w-48 py-2.5 border border-emerald-500/30 rounded-lg text-emerald-400 bg-emerald-500/10 font-bold cursor-default'>Completed</button>
                            )}

                            {!item.cancelled && !item.isCompleted && (
                                <button onClick={() => cancelAppointment(item._id)} className='text-text-dim sm:min-w-48 py-2.5 border border-border-soft rounded-lg hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all font-medium'>Cancel appointment</button>
                            )}

                            {item.cancelled && !item.isCompleted && (
                                <button className='sm:min-w-48 py-2.5 border border-rose-500/20 rounded-lg text-rose-400 bg-rose-500/10 font-bold cursor-default'>Appointment cancelled</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments