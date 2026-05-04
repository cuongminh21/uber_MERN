import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
//  const [userData, setUserData] = useState({})
  const navigate = useNavigate()
  const {user,setUser} = useContext(UserDataContext)

  const submitHandle = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)  
      if(response.status === 201){
        const data = response.data
        setUser(data.user)      
        localStorage.setItem('token',data.token)
        navigate('/home')
      }
    // setUserData(newUser)
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-2' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1280px-Uber_logo_2018.png" alt="" />
        <form onSubmit={(e) => submitHandle(e)}>
          <h3 className='text-lg w-1/2 font-medium mb-2'>What's your name</h3>
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
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
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
          <button
            className='bg-[#111] mb-3 font-semibold text-white rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          >Create Account</button>
        </form>
        <p className='text-center'>
          Already have a account? <Link className='text-blue-600' to='/login'>Login here</Link>
        </p>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>
          The site is protected by reCAPCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>
        </p>
      </div>

    </div>
  )
}

export default UserSignup