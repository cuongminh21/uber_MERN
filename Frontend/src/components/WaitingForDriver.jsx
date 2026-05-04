import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={()=>{props.setWaitingForDriver(false)}}>
        <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
      </h5>
      <div className='flex items-center justify-between'>
        <img className='h-12' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8zMDUxZTYwMi0xMGJiLTRlNjUtYjEyMi1lMzk0ZDgwYTljNDcucG5n" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname + " " +props.ride?.captain.fullname.lastname}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-600'>Matuti Suzuki Alto</p>
          <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
        </div>
      </div>
      <div className='flex gap-2 justify-between items-center flex-col'>
        <div className='w-full mt-5'>
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
      </div>
    </div>
  )
}

export default WaitingForDriver