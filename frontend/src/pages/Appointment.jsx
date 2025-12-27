import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {

        setDocSlots([])

        let today = new Date()

        for (let i = 0; i < 7; i++) {

            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date(currentDate)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0) 
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {

        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className='text-text-main'>

            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col sm:flex-row gap-6 pt-10'>
                <div className='bg-bg-surface border border-border-soft rounded-2xl overflow-hidden group w-full sm:max-w-72'>
                    <img className='w-full opacity-90 saturate-[.4] group-hover:saturate-100 group-hover:opacity-100 transition-all duration-700' src={docInfo.image} alt="" />
                </div>

                <div className='flex-1 bg-bg-surface border border-border-soft rounded-2xl p-8 py-7 mx-2 sm:mx-0 mt-[-80px] sm:mt-0 shadow-xl'>
                    <p className='flex items-center gap-2 text-3xl font-bold text-text-main'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
                    <div className='flex items-center gap-2 mt-1 text-text-dim'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-3 border border-border-soft text-xs rounded-full bg-bg-muted'>{docInfo.experience}</button>
                    </div>

                    <div>
                        <p className='flex items-center gap-1 text-sm font-semibold text-text-main mt-4 uppercase tracking-wider'>About <img className='w-3 opacity-70' src={assets.info_icon} alt="" /></p>
                        <p className='text-sm text-text-dim max-w-[700px] mt-2 leading-relaxed'>{docInfo.about}</p>
                    </div>

                    <p className='text-text-dim font-medium mt-6'>Appointment fee: <span className='text-primary text-lg'>{currencySymbol}{docInfo.fees}</span> </p>
                </div>
            </div>

            {/* Booking slots */}
            <div className='sm:ml-80 sm:pl-4 mt-12 font-medium'>
                <p className='text-text-main tracking-wide uppercase text-sm'>Select Booking Slot</p>
                <div className='flex gap-3 items-center w-full overflow-x-auto no-scrollbar mt-6'>
                    {docSlots.length && docSlots.map((item, index) => (
                        item.length > 0 &&
                        <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-[4rem] rounded-2xl cursor-pointer transition-all duration-300 ${slotIndex === index ? 'bg-primary text-bg-main shadow-lg shadow-primary/20' : 'bg-bg-surface border border-border-soft text-text-dim hover:border-primary/50'}`}>
                            <p className='text-xs font-bold'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p className='text-lg font-bold mt-1'>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-auto no-scrollbar mt-6'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-medium flex-shrink-0 px-6 py-2.5 rounded-full cursor-pointer transition-all duration-300 ${item.time === slotTime ? 'bg-primary text-bg-main shadow-md' : 'bg-bg-surface border border-border-soft text-text-dim hover:text-text-main hover:border-text-dim'}`}>
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button onClick={bookAppointment} className='bg-primary text-bg-main text-sm font-bold px-14 py-4 rounded-full my-10 hover:bg-primary-muted hover:shadow-xl hover:shadow-primary/10 transition-all active:scale-95'>Book an appointment</button>
            </div>

            {/* Listing Related Doctors */}
            <div className='border-t border-border-soft mt-10 pt-10'>
                <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
            </div>
        </div>
    ) : null
}

export default Appointment