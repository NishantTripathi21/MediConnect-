import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className='min-h-[80vh] flex items-center justify-center p-5'>
            <div className='w-full max-w-5xl flex flex-col md:flex-row gap-8 text-white'>
                
                <div className='flex justify-center'>
                    <img 
                        className='bg-white/5 w-full sm:max-w-72 md:max-w-80 rounded-3xl border border-white/10 shadow-2xl object-cover h-fit' 
                        src={profileData.image} 
                        alt={profileData.name} 
                    />
                </div>

                <div className='flex-1 border border-white/10 rounded-[2.5rem] p-10 bg-white/5 backdrop-blur-sm shadow-2xl'>

                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                        <div>
                            <p className='text-4xl font-bold tracking-tight'>{profileData.name}</p>
                            <div className='flex items-center gap-3 mt-2'>
                                <p className='text-gray-400 text-lg font-medium'>{profileData.degree} - {profileData.speciality}</p>
                                <span className='py-1 px-4 border border-white/10 text-[10px] font-bold uppercase rounded-full bg-white/5 tracking-widest text-primary'>
                                    {profileData.experience} EXP
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='mt-10'>
                        <p className='text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3'>Professional Summary</p>
                        <div className='text-base text-gray-300 leading-relaxed'>
                            {
                                isEdit
                                    ? <textarea 
                                        onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} 
                                        className='w-full bg-white/5 border border-white/10 rounded-2xl outline-none p-5 focus:border-primary transition-all resize-none' 
                                        rows={5} 
                                        value={profileData.about} 
                                      />
                                    : <p className='bg-white/[0.02] p-6 rounded-2xl border border-white/5'>{profileData.about}</p>
                            }
                        </div>
                    </div>

                    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
                        <div className='bg-white/[0.02] p-6 rounded-2xl border border-white/5'>
                            <p className='text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3'>Consultation Fee</p>
                            <p className='text-2xl font-black text-white'>
                                {currency} {
                                    isEdit 
                                    ? <input 
                                        type='number' 
                                        className='bg-white/5 border border-white/10 rounded-xl px-4 py-1 outline-none focus:border-primary w-28 text-xl font-bold' 
                                        onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} 
                                        value={profileData.fees} 
                                      /> 
                                    : <span>{profileData.fees}</span>
                                }
                            </p>
                        </div>

                        <div className='bg-white/[0.02] p-6 rounded-2xl border border-white/5'>
                            <p className='text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3'>Clinic Location</p>
                            <div className='text-sm text-gray-300 font-medium'>
                                {isEdit ? (
                                    <div className='flex flex-col gap-3'>
                                        <input className='bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary w-full' type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} />
                                        <input className='bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary w-full' type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} />
                                    </div>
                                ) : (
                                    <p className='leading-relaxed'>
                                        {profileData.address.line1} <br />
                                        {profileData.address.line2}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-between pt-8 mt-10 border-t border-white/10'>
                        <div className='flex items-center gap-3'>
                            <input 
                                className='w-5 h-5 accent-primary cursor-pointer' 
                                type="checkbox" 
                                onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
                                checked={profileData.available} 
                                id="availability"
                            />
                            <label className={`text-sm font-black uppercase tracking-widest cursor-pointer ${profileData.available ? 'text-green-500' : 'text-orange-400'}`} htmlFor="availability">
                                {profileData.available ? 'Instant Booking Active' : 'Currently Offline'}
                            </label>
                        </div>

                        <div>
                            {
                                isEdit
                                    ? <button onClick={updateProfile} className='px-12 py-3.5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all'>Update Details</button>
                                    : <button onClick={() => setIsEdit(true)} className='px-12 py-3.5 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/5 transition-all backdrop-blur-md'>Edit Profile</button>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DoctorProfile