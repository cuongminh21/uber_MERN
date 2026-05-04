import React, { useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import {UserDataContext} from '../context/UserContext';
import LiveTracking from '../components/LiveTracking';


const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [passenger, setPassenger] = useState(1)
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [fare, setFare] = useState({})
  const [activeField, setActiveField] = useState(null)
  const [vehicleType, setVehicleType] = useState(null)
  const vehiclePanelRef = useRef(null)
  const panelConfirmRideRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const {user} = useContext(UserDataContext)
  const {socket} = useContext(SocketContext)
  const [ride,setRide]= useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    socket.emit("join",{
      userType:'user',
      userId: user._id
    })
  },[user])

  socket.on('ride-confirmed',ride=>{
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(false)
  })

  socket.on('ride-started',ride=>{    
    setWaitingForDriver(false)
    navigate('/riding',{state:{ride}})
  })

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: {
          input: e.target.value
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data);
      
      setPickupSuggestions(response.data)
    } catch (error) {
      console.log(error.errors);
    }
  }

  const handleDestinationChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: {
          input: e.target.value
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    } catch (error) {

    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setPickup('')
    setDestination('')
  }


  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 20,
        opacity: 1
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0px',
        padding: 0,
        opacity: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(panelConfirmRideRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(panelConfirmRideRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])
  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: {
        pickup: pickup,
        destination: destination
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setFare(response.data)
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      params: {
        pickup,
        destination,
        vehicleType
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setVehicleType(response.data)
  }
  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-20 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1280px-Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen'>
        <LiveTracking/>
      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(!panelOpen)
          }} className='absolute opacity-0 top-6 right-6 text-2xl'>
            <i className='ri-arrow-down-wide-line'></i>
            {/* {
              panelOpen ? <i className='ri-arrow-down-wide-line'></i> : <i className='ri-arrow-up-wide-line'></i>
            } */}
          </h5>

          <h4 className='text-3xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => { submitHandler(e) }}>
            <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full'></div>
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={(e) => { handlePickupChange(e) }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' type="text" placeholder='Add a pick up location'
            />
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={(e) => { handleDestinationChange }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder='Enter your destination' />
          </form>
          <button className='bg-black text-white px-4 py-2 rounded-lg mt-2 w-full'>
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className='bg-white h-0 opacity-0'>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 p-3 bg-white py-10 px-3 translate-y-full pt-12'>
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}></VehiclePanel>
      </div>
      <div ref={panelConfirmRideRef} className='fixed w-full z-10 bottom-0 p-3 bg-white py-6 px-3 translate-y-full pt-12'>
        <ConfirmRide
          createRide={createRide}
          fare={fare}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          passenger={passenger}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 p-3 bg-white py-6 px-3 translate-y-full pt-12'>
        <LookingForDriver
          createRide={createRide}
          fare={fare}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 p-3 bg-white py-6 px-3 pt-12'>
        <WaitingForDriver ride={ride} setWaitingForDriver={setWaitingForDriver} setVehicleFound={setVehicleFound} waitingForDriver={waitingForDriver}/>
      </div>
    </div>
  )
}

export default Home