import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get("success")
    const appointmentId = searchParams.get("appointmentId")

    const { backendUrl, token } = useContext(AppContext)

    const navigate = useNavigate()

    const verifyStripe = async () => {
        try {
            const { data } = await axios.post(backendUrl + "/api/user/verifyStripe", { success, appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

            navigate("/my-appointments")
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        if (token && appointmentId && success) {
            verifyStripe()
        }
    }, [token])

    return (
        <div className='min-h-[60vh] flex flex-col items-center justify-center gap-4'>
            <div className='relative flex items-center justify-center'>
                <div className="w-20 h-20 border-4 border-border-soft border-t-primary rounded-full animate-spin"></div>
                <div className='absolute w-20 h-20 border-4 border-transparent border-t-primary rounded-full animate-pulse opacity-50'></div>
            </div>
            <p className='text-text-dim font-medium animate-pulse'>Verifying payment...</p>
        </div>
    )
}

export default Verify