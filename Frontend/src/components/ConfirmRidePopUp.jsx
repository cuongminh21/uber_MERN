import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ConfirmRidePopUp = (props) => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const submitHanler = async (e) => {
        e.preventDefault()
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
            params:{
                rideId: props.ride._id,
                otp:otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
        })

        if(response.status === 200){
            props.setConfirmRidePopUp(false)
            props.setRidePopUp(false)
            navigate('/captain-riding',{state:{ride:props.ride}})
        }
    }
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => { props.setRidePopUp(false) }}>
                <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3BsYXlcLzBiN2Y0ZTliLWY1OWMtNDAyNC05ZjA2LWIzZGMxMjg1MGFiNy0xOTIwLTEwODAuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9fX0=" alt="" />
                    <h2 className='text-xl font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex gap-2 justify-between items-center flex-col mt-3'>
                <div className='w-full'>
                    <div className='flex items-center gap-5 border-b-2'>
                        <i className='ri-map-pin-user-fill text-lg'></i>
                        <div className=''>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 border-b-2'>
                        <i className='ri-map-pin-2-fill text-lg'></i>
                        <div className=''>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <i className='ri-currency-line text-lg'></i>
                        <div className=''>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash on</p>
                        </div>
                    </div>
                </div>
                <div className=' w-full mt-6'>
                    <form onSubmit={submitHanler}>
                        <input value={otp} onChange={(e)=>{
                            setOtp(e.target.value)
                        }} type="text" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />
                        <button className='w-full text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
                        <button onClick={() => {
                            props.setConfirmRidePopUp(false)
                            props.setRidePopUp(false)
                        }} className='w-full mt-1 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default ConfirmRidePopUp