import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'


const Riding = () => {

    const { socket } = useContext(SocketContext)
    const location = useLocation()
    const navigate = useNavigate()
    const ride = location.state?.ride
    socket.on('ride-ended', () => {        
        navigate('/home')
    })

    useEffect(() => {


    }, [])
    return (
        <div className='h-screen'>

            <Link to='/home' className='h-10 w-10 bg-white items-center justify-center rounded-full fixed block right-2 top-2'>
                <i className='ri-home-5-line text-lg font-medium'></i>
            </Link>
            <div className='h-1/2'>
            <LiveTracking/>
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8zMDUxZTYwMi0xMGJiLTRlNjUtYjEyMi1lMzk0ZDgwYTljNDcucG5n" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>{ride?.captain.fullname.firstname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>Matuti Suzuki Alto</p>
                    </div>
                </div>
                <div className='flex gap-2 justify-between items-center flex-col'>
                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-5 border-b-2'>
                            <i className='ri-map-pin-2-fill text-lg'></i>
                            <div className=''>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <i className='ri-currency-line text-lg'></i>
                            <div className=''>
                                <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash on</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {
                    ride && (
                        <div>
                            <h2>Ride ID: {ride.id}</h2>
                            <p>Pickup Location: {ride.pickup}</p>
                            <p>Destination: {ride.destination}</p>
                        </div>
                    )

                } */}
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-'>Make a payment</button>
            </div>
        </div>
    )
}

export default Riding