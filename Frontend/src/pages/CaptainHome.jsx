import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import LiveTracking from '../components/LiveTracking';

const CaptainHome = () => {
  const [ride, setRide] = useState(null)
  const [ridePopUp, setRidePopUp] = useState(false)
  const [confirmRidePopUp, setConfirmRidePopUp] = useState(false)
  const panelRidePopupRef = useRef(null)
  const panelConfirmRidePopupRef = useRef(null)
  const { captain } = useContext(CaptainDataContext)
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    socket.emit("join", {
      userType: 'captain',
      userId: captain._id
    })
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
          })
        })
      }
    }
    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()
    // return ()=> clearInterval(locationInterval)
  }, [captain])

  socket.on('new-ride', (data) => {
    setRide(data)
    setRidePopUp(true)
  })

  async function confirmRide() {
    const token = localStorage.getItem('token')
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captain: captain._id
    })
    socket.emit('confirm-ride', {
      userId: captain._id,
      rideId: ride._id,      
    },{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setRidePopUp(false)
    confirmRidePopUp(true)
  }

  useGSAP(function () {
    if (ridePopUp) {
      gsap.to(panelRidePopupRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(panelConfirmRidePopupRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopUp])

  useGSAP(function () {
    if (confirmRidePopUp) {
      gsap.to(panelConfirmRidePopupRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(panelConfirmRidePopupRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopUp])

  return (
    <div className='h-screen'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1280px-Uber_logo_2018.png" alt="" />
        <Link to='/captain-home' className='h-10 w-10 bg-white items-center justify-center rounded-full  flex right-2 top-2'>
          <i className='ri-home-5-line text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>

      <div className='h-3/5'>
      <LiveTracking/>
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      <div ref={panelRidePopupRef} className='fixed w-full z-10 bottom-0 p-3 translate-y-full bg-white py-6 px-3 pt-12'>
        <RidePopUp
          ride={ride}
          setRidePopUp={setRidePopUp}
          setConfirmRidePopUp={setConfirmRidePopUp}
          confirmRide={confirmRide}
        />
      </div>
      <div ref={panelConfirmRidePopupRef} className='fixed w-full z-10 h-screen top-0 p-3 translate-y-full bg-white pt-12'>
        <ConfirmRidePopUp
        ride={ride}
        setConfirmRidePopUp={setConfirmRidePopUp} setRidePopUp={setRidePopUp} />
      </div>
    </div>
  )
}

export default CaptainHome