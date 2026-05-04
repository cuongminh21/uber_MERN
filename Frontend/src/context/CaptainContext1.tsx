import React, { createContext, useContext, useState, ReactNode } from 'react';

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
    setCaptain: (captain: Captain) => void;
    clearCaptain: () => void;
}

const CaptainContext1 = createContext<CaptainContextType | undefined>(undefined);

export const CaptainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [captain, setCaptainState] = useState<Captain | null>(null);

    const setCaptain = (captain: Captain) => {
        setCaptainState(captain);
    };

    const clearCaptain = () => {
        setCaptainState(null);
    };

    return (
        <CaptainContext1.Provider value={{ captain, setCaptain, clearCaptain }}>
            {children}
        </CaptainContext1.Provider>
    );
};

export const useCaptain = (): CaptainContextType => {
    const context = useContext(CaptainContext1);
    if (!context) {
        throw new Error('useCaptain must be used within a CaptainProvider');
    }
    return context;
};