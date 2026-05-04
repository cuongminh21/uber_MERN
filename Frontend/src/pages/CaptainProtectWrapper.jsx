import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectWrapper = ({ children }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [isLoading, setIsLoading] = useState(true)
    const { captain,setCaptain } = useContext(CaptainDataContext);

    useEffect(() => {       
        if (!token || !captain) {
            setIsLoading(false)
            navigate('/captain-login')
        }
                
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
           
            if (response.status === 200) {                
                
                setCaptain(response.data)                
                navigate('/captain-home')
            }
        }).catch(err => {
            //console.log(err);
            localStorage.removeItem('token')
            navigate('/captain-login')
    
        }).finally(()=>{
            // ✔ luôn tắt loading
            setIsLoading(false)
        })

    }, [token, captain])

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

export default CaptainProtectWrapper