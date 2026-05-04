import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(CaptainDataContext)

  const submitHandle = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }
  return (
    <div className='px-5 py-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-2' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1280px-Uber_logo_2018.png" alt="" />
        <form onSubmit={(e) => submitHandle(e)}>
          <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>
          <div className='flex gap-2 mb-6'>
            <input
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value) }}
              className='bg-[#eee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
              required type="text" placeholder='first name' />
            <input
              value={lastName}
              onChange={(e) => { setLastName(e.target.value) }}
              className='bg-[#eee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
              required type="text" placeholder='last name' />
          </div>
          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
          <input
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            className='bg-[#eee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required type="email" placeholder='email@example.com' />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            className='bg-[#eee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
            required type="password" placeholder='password' />
          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              value={vehicleColor}
              onChange={(e) => { setVehicleColor(e.target.value) }}
              className='bg-[#eee] w-1/2 mb-6 rounded-lg px-4 py-2 border text-lg placeholder:text-sm'
              required type="text" placeholder='Vehicle Color' />
              <input
              value={vehiclePlate}
              onChange={(e) => { setVehiclePlate(e.target.value) }}
              className='bg-[#eee] w-1/2 mb-6 rounded-lg px-4 py-2 border text-lg placeholder:text-sm'
              required type="text" placeholder='Vehicle Plate' />
            
          </div>
          <div className='flex gap-4 mb-7'>
          <input
              value={vehicleCapacity}
              onChange={(e) => { setVehicleCapacity(e.target.value) }}
              className='bg-[#eee] w-1/2 mb-6 rounded-lg px-4 py-2 border text-lg placeholder:text-sm'
              required type="number" placeholder='Vehicle Capacity' />
              <select
              value={vehicleType}
              onChange={(e) => { setVehicleType(e.target.value) }}
              className='bg-[#eee] w-1/2 mb-6 rounded-lg px-4 py-2 border text-lg placeholder:text-sm'
              required type="text" placeholder='Vehicle Capacity' 
              >
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
          </div>
          <button
            className='bg-[#111] mb-3 font-semibold text-white rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          >Create Captain Account</button>
        </form>
        <p className='text-center'>
          Already have a account? <Link className='text-blue-600' to='/captain-login'>Login here</Link>
        </p>
      </div>
      <div>
        <p className='text-[10px] mt-6 leading-tight'>
          The site is protected by reCAPCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup