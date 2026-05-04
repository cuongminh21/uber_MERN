import { useGSAP } from '@gsap/react'
import React, { useRef, useState } from 'react'
import { Link,useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import gsap from 'gsap'

const CaptainRiding = () => {
    const [finishRide, setFinishRide] = useState(false)
    const panelFinishRideRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride
    useGSAP(function () {
        if (finishRide) {
            gsap.to(panelFinishRideRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(panelFinishRideRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRide])
    return (
        <div className='h-screen relative flex flex-col justify-end'>

            <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1280px-Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className='h-10 w-10 bg-white items-center justify-center rounded-full  flex right-2 top-2'>
                    <i className='ri-home-5-line text-lg font-medium ri-logout-box-r-line'></i>
                </Link>
            </div>

            
            <div className='h-1/5 p-1  bg-yellow-400' onClick={()=>{
                setFinishRide(true)
            }}>
                <h5 className='p-1 text-center w-full top-0' onClick={() => { }}>
                    <i className='text-3xl text-gray-800 ri-arrow-up-wide-line'></i>
                </h5>
                <div className='flex items-center justify-between p-3'>
                    <h4 className='text-xl font-semibold'>{rideData ? `Ride Id: ${rideData._id}`:''}</h4>
                    <button className='w-full bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
                </div>
            </div>
            
           
            <div ref={panelFinishRideRef} className='fixed w-full z-500 bottom-0 p-3 translate-y-full bg-white py-6 px-3 pt-12'>
                <FinishRide ride={rideData} setFinishRide={setFinishRide}/>
            </div>
            <div className='h-screen fixed top-0 z-[-1] w-screen'>
            <LiveTracking/>
            </div>
        </div>
    )
}

export default CaptainRiding