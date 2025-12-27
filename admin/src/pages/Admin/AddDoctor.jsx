import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full text-white'>

            <p className='mb-6 text-2xl font-bold'>Add Doctor</p>

            <div className='bg-transparent px-8 py-10 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-y-scroll shadow-2xl custom-scrollbar'>
                
                <div className='flex items-center gap-6 mb-10'>
                    <label htmlFor="doc-img" className='relative group cursor-pointer'>
                        <img className='w-24 h-24 bg-white/5 rounded-2xl object-cover border border-white/10 group-hover:border-primary transition-all' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                        <div className='absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity'>
                           <p className='text-[10px] text-white font-bold tracking-widest'>UPLOAD</p>
                        </div>
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p className='text-gray-400 text-sm leading-relaxed'>Upload doctor <br /> <span className='text-white font-semibold'>profile picture</span></p>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-12'>

                    <div className='w-full lg:flex-1 flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>Doctor Name</p>
                            <input onChange={e => setName(e.target.value)} value={name} className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all placeholder:text-gray-600' type="text" placeholder='Full Name' required />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>Doctor Email</p>
                            <input onChange={e => setEmail(e.target.value)} value={email} className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all placeholder:text-gray-600' type="email" placeholder='Email Address' required />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>Set Password</p>
                            <input onChange={e => setPassword(e.target.value)} value={password} className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all placeholder:text-gray-600' type="password" placeholder='Password' required />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>Experience</p>
                            <select onChange={e => setExperience(e.target.value)} value={experience} className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-white appearance-none cursor-pointer'>
                                {[...Array(10)].map((_, i) => (
                                    <option className='bg-black' key={i} value={`${i + 1} Year`}>{i + 1} Year{i > 0 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>Fees</p>
                            <input onChange={e => setFees(e.target.value)} value={fees} className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all placeholder:text-gray-600' type="number" placeholder='Consultation Fee' required />
                        </div>
                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>Speciality</p>
                            <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-white appearance-none cursor-pointer'>
                                <option className='bg-black' value="General physician">General physician</option>
                                <option className='bg-black' value="Gynecologist">Gynecologist</option>
                                <option className='bg-black' value="Dermatologist">Dermatologist</option>
                                <option className='bg-black' value="Pediatricians">Pediatricians</option>
                                <option className='bg-black' value="Neurologist">Neurologist</option>
                                <option className='bg-black' value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>Degree</p>
                            <input onChange={e => setDegree(e.target.value)} value={degree} className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all placeholder:text-gray-600' type="text" placeholder='Education Degree' required />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>Address</p>
                            <div className='flex flex-col gap-3'>
                                <input onChange={e => setAddress1(e.target.value)} value={address1} className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all placeholder:text-gray-600' type="text" placeholder='Address Line 1' required />
                                <input onChange={e => setAddress2(e.target.value)} value={address2} className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all placeholder:text-gray-600' type="text" placeholder='Address Line 2' required />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-10'>
                    <p className='text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3'>About Doctor</p>
                    <textarea onChange={e => setAbout(e.target.value)} value={about} className='w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-primary transition-all placeholder:text-gray-600 resize-none' rows={5} placeholder='Write a brief description about the doctor...'></textarea>
                </div>

                <button type='submit' className='w-full sm:w-auto bg-primary text-white font-bold px-16 py-4 mt-10 rounded-full hover:bg-opacity-90 transition-all shadow-xl'>
                    Add Doctor
                </button>
            </div>
        </form>
    )
}

export default AddDoctor