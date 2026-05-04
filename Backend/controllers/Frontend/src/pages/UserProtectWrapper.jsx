import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [isLoading, setIsLoading] = useState(true)
    const { user,setUser } = useContext(UserDataContext)
   
    useEffect(() => {
        if (!token ||!user) {
            setIsLoading(false)
            navigate('/login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setUser(response.data)     
                navigate('/home')                               
            }
        }).catch(err => {            
            navigate('/login')
    
        }).finally(()=>{
            // ✔ luôn tắt loading
            setIsLoading(false)
        })
    }, [token,user])

    if (isLoading) {
        return (
            <div>isLoading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper