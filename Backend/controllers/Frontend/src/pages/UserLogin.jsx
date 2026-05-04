import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandle = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUser)
    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-2' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1280px-Uber_logo_2018.png" alt="" />
        <form onSubmit={(e) => submitHandle(e)}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            className='bg-[#eee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required type="email" placeholder='email@example.com' />
          <h3 className='text-lg  font-medium mb-2'>Enter Password</h3>
          <input
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            className='bg-[#eee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required type="password" placeholder='password' />
          <button
            className='bg-[#111] mb-3 font-semibold text-white rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          >Login</button>
        </form>
        <p className='text-center'>
          New here? <Link className='text-blue-600' to='/signup'>Create new Account</Link>
        </p>
      </div>
      <div>
        <Link to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center mb-5 font-semibold text-white rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>

    </div>
  )
}

export default UserLogin