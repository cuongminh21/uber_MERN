import React, { createContext, useState, useContext } from "react";

export const CaptainDataContext = createContext<CaptainContextType | null>(null);

interface Captain {
    fullname: {
        firstname: String,
        lastname: String
    },
    email: String,
    password: String,
    socketId: String,
    status: String,
    vehicle: {
        color: String,
        plate: String,
        capacity: Number,
        vehicleType: String,
    },
    location:{
        lat:Number,
        lng:Number,
    }
}
interface CaptainContextType {
    captain: Captain | null;
    setCaptain: React.Dispatch<React.SetStateAction<Captain | null>>;
  }

const CaptainContext = ({children}) =>{
    const [captain, setCaptain] = useState<Captain | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const updateCaptain = (captainData) =>{
        setCaptain(captainData)
    }
    const clearCaptain = () => {
        setCaptain(null);
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain,
        clearCaptain
    }
    return(
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    )
}
export default CaptainContext