import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => { props.setRidePopUp(false) }}>
                <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3BsYXlcLzBiN2Y0ZTliLWY1OWMtNDAyNC05ZjA2LWIzZGMxMjg1MGFiNy0xOTIwLTEwODAuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9fX0=" alt="" />
                    <h2 className='text-xl font-medium capitalize'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
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
                <div className='flex items-center  mt-5 justify-between w-full gap-2'>
                    <button onClick={() => {
                        // props.setRidePopUp(false)
                        props.confirmRide()
                        props.setConfirmRidePopUp(true)
                    }} className='w-full bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg'>Ignore</button>
                    <button onClick={() => { props.setConfirmRidePopUp(true) }} className='w-full bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Accept</button>

                </div>

            </div>



        </div>
    )
}

export default RidePopUp