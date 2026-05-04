import React, { useEffect, useState } from 'react'
import {LoadScript, GoogleMap, Marker} from '@react-google-maps/api';

const containerStyle={
  width:'100%',
  height:'100%',
}

const center = {
  lat:  10.7769,
  lng: 106.7009
}

const LiveTracking = () => {
  const [currentPosition,setCurrentPosition] = useState(center)
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude,longitude} = position.coords
      setCurrentPosition({
        lat:latitude,
        lng:longitude
      })
    })
    const watchId = navigator.geolocation.watchPosition((position)=>{
      const {latitude,longitude} = position.coords
      setCurrentPosition({
        lat:latitude,
        lng:longitude
      })
    })
    return ()=> navigator.geolocation.clearWatch(watchId)
  },[])

  useEffect(()=>{
    const updatePosition= () =>{
      navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude,longitude} = position.coords
        setCurrentPosition({
          lat:latitude,
          lng:longitude
        })
      })
    }
    updatePosition()
    const intervalId = setInterval(updatePosition,10000)
    // return ()=> clearInterval(intervalId)
  },[])
  return (
    <div className='z-50'>      
      <LoadScript googleMapsApiKey={import.meta.env.GOOGLE_MAPS_API}>
        <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={15}>
          <Marker position={currentPosition} />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default LiveTracking