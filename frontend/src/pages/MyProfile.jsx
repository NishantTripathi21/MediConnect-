import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className='flex justify-center items-start min-h-[80vh] pt-10 pb-20'>
            <div className='max-w-xl w-full flex flex-col gap-4 text-sm bg-bg-surface p-8 sm:p-12 rounded-3xl border border-border-soft shadow-2xl text-text-main'>

                <div className='flex flex-col items-center sm:items-start gap-4'>
                    {isEdit
                        ? <label htmlFor='image' >
                            <div className='inline-block relative cursor-pointer group'>
                                <img className='w-36 h-36 rounded-2xl object-cover opacity-50 saturate-[.4] group-hover:opacity-80 transition-all border-2 border-dashed border-primary' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                                <img className='w-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 group-hover:scale-110 transition-transform' src={image ? '' : assets.upload_icon} alt="" />
                            </div>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                        </label>
                        : <img className='w-36 h-36 rounded-2xl object-cover shadow-lg border border-border-soft' src={userData.image} alt="" />
                    }

                    {isEdit
                        ? <input className='bg-bg-muted border border-border-soft rounded-lg text-3xl font-semibold w-full mt-4 px-3 py-2 outline-none focus:border-primary text-text-main text-center sm:text-left' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                        : <p className='font-bold text-3xl text-text-main mt-4 text-center sm:text-left'>{userData.name}</p>
                    }
                </div>

                <hr className='bg-border-soft h-[1px] border-none my-2' />

                <div>
                    <p className='text-text-dim underline font-medium uppercase tracking-widest text-xs'>CONTACT INFORMATION</p>
                    <div className='grid grid-cols-[1fr_2fr] gap-y-4 mt-5 text-text-main'>
                        <p className='font-semibold'>Email id:</p>
                        <p className='text-primary truncate'>{userData.email}</p>
                        
                        <p className='font-semibold'>Phone:</p>
                        {isEdit
                            ? <input className='bg-bg-muted border border-border-soft rounded px-3 py-1.5 outline-none focus:border-primary' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                            : <p className='text-primary'>{userData.phone}</p>
                        }

                        <p className='font-semibold'>Address:</p>
                        {isEdit
                            ? <div className='flex flex-col gap-2'>
                                <input className='bg-bg-muted border border-border-soft rounded px-3 py-1.5 outline-none focus:border-primary' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                                <input className='bg-bg-muted border border-border-soft rounded px-3 py-1.5 outline-none focus:border-primary' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
                            </div>
                            : <p className='text-text-dim leading-relaxed'>{userData.address.line1} <br /> {userData.address.line2}</p>
                        }
                    </div>
                </div>

                <div className='mt-4'>
                    <p className='text-text-dim underline font-medium uppercase tracking-widest text-xs'>BASIC INFORMATION</p>
                    <div className='grid grid-cols-[1fr_2fr] gap-y-4 mt-5 text-text-main'>
                        <p className='font-semibold'>Gender:</p>
                        {isEdit
                            ? <select className='bg-bg-muted border border-border-soft rounded px-3 py-1.5 outline-none focus:border-primary text-text-main' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                                <option value="Not Selected">Not Selected</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            : <p className='text-text-dim'>{userData.gender}</p>
                        }

                        <p className='font-semibold'>Birthday:</p>
                        {isEdit
                            ? <input className='bg-bg-muted border border-border-soft rounded px-3 py-1.5 outline-none focus:border-primary text-text-main' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                            : <p className='text-text-dim'>{userData.dob}</p>
                        }
                    </div>
                </div>

                <div className='mt-10 flex justify-center sm:justify-start'>
                    {isEdit
                        ? <button onClick={updateUserProfileData} className='bg-primary text-bg-main px-12 py-3 rounded-full font-bold hover:brightness-110 transition-all shadow-xl shadow-primary/20 active:scale-95'>Save Settings</button>
                        : <button onClick={() => setIsEdit(true)} className='border-2 border-primary text-primary px-12 py-3 rounded-full font-bold hover:bg-primary hover:text-bg-main transition-all active:scale-95'>Edit Profile</button>
                    }
                </div>

            </div>
        </div>
    ) : null
}

export default MyProfile