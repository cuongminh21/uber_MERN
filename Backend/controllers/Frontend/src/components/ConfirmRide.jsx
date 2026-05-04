import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => { props.setConfirmRidePanel(false) }}>
        <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>Confirm your ride</h3>
      <div className='flex gap-2 justify-between items-center flex-col'>
        <img className='h-20' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8zMDUxZTYwMi0xMGJiLTRlNjUtYjEyMi1lMzk0ZDgwYTljNDcucG5n" alt="" />
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 border-b-2'>
            <i className='ri-map-pin-user-fill text-lg'></i>
            <div className=''>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 border-b-2'>
            <i className='ri-map-pin-2-fill text-lg'></i>
            <div className=''>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <i className='ri-currency-line text-lg'></i>
            <div className=''>
              <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash on</p>
            </div>
          </div>
        </div>
        <button onClick={() => {
            props.setVehicleFound(true),
            props.setConfirmRidePanel(true),
            props.createRide()
        }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-'>Confirm</button>
      </div>



    </div>
  )
}

export default ConfirmRide