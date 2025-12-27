import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        } 
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-6 my-16 text-text-main'>
            <h1 className='text-3xl font-bold tracking-tight'>Related Doctors</h1>
            <p className='sm:w-1/3 text-center text-sm text-text-dim'>Simply browse through our extensive list of trusted doctors.</p>
            
            <div className='w-full grid grid-cols-auto gap-6 pt-5 px-3 sm:px-0'>
                {relDoc.map((item, index) => (
                    <div 
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                        className='bg-bg-surface border border-border-soft rounded-2xl overflow-hidden cursor-pointer hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group' 
                        key={index}
                    >
                        <div className='aspect-square overflow-hidden bg-bg-muted'>
                            <img 
                                className='w-full h-full object-cover opacity-90 saturate-[.4] group-hover:saturate-100 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100' 
                                src={item.image} 
                                alt={item.name} 
                            />
                        </div>
                        <div className='p-5'>
                            <div className={`flex items-center gap-2 text-xs font-medium mb-2 ${item.available ? 'text-success' : "text-danger"}`}>
                                <span className={`w-2 h-2 rounded-full animate-pulse ${item.available ? 'bg-success' : "bg-danger"}`}></span>
                                <p>{item.available ? 'Available' : "Not Available"}</p>
                            </div>
                            <p className='text-text-main text-lg font-semibold tracking-tight'>{item.name}</p>
                            <p className='text-text-dim text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <button 
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                className='bg-bg-muted border border-border-soft text-text-main px-12 py-3 rounded-full mt-10 hover:bg-bg-surface hover:border-primary/30 transition-all font-medium'
            >
                More
            </button>
        </div>
    )
}

export default RelatedDoctors