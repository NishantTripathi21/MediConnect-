import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='text-text-main'>
      <p className='text-text-dim'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button 
          onClick={() => setShowFilter(!showFilter)} 
          className={`py-1 px-3 border border-border-soft rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-bg-main' : 'text-text-main'}`}
        >
          Filters
        </button>
        
        <div className={`flex-col gap-4 text-sm text-text-dim ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {['General Physician', 'Gynecologist', 'Dermatologist', 'Pediatrician', 'Neurologist', 'Gastroenterologist'].map((item) => (
            <p 
              key={item}
              onClick={() => speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)} 
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-border-soft rounded-lg transition-all cursor-pointer hover:bg-bg-surface ${speciality === item ? 'bg-bg-surface border-primary text-primary shadow-lg shadow-primary/10' : ''}`}
            >
              {item}
            </p>
          ))}
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
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
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-success' : "text-text-dim"}`}>
                  <p className={`w-2 h-2 rounded-full animate-pulse ${item.available ? 'bg-success' : "bg-text-dim"}`}></p>
                  <p>{item.available ? 'Available' : "Not Available"}</p>
                </div>
                <p className='text-text-main text-lg font-semibold mt-1'>{item.name}</p>
                <p className='text-text-dim text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors