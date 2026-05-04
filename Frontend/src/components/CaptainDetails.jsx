import React,{useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainDetails = () => {
  const context = useContext(CaptainDataContext)
  if (!context) return null

const { captain } = context
  
  return (
    <>
        <div className='flex items-center justify-between'>
          <div className='flex gap-3 items-center justify-start'>
            <img className='h-10 w-10 rounded-full object-cover' src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
            <h4 className='text-lg font-medium capitalize'>{captain?.fullname?.firstname + " " + captain?.fullname?.lastname}</h4>
          </div>
          <div className=''>
            <h4 className='text-xl font-semibold'>
              ₹295.20
            </h4>
            <p className='text-sm text-gray-600'>Earned</p>
          </div>

        </div>
        <div className='flex p-3 mt-6 bg-gray-50 rounded-xl justify-center fill-taupe-50 items-start'>
          <div className='text-center'>
            <i className='text-3xl mb-2 font-thin ri-timer-2-line'></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className='text-3xl mb-2 font-thin ri-speed-up-line'></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className='text-3xl mb-2 font-thin ri-booklet-line'></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
        </div>
    </>
  )
}

export default CaptainDetails