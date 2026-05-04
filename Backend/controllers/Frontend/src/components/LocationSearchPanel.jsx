import React from 'react'
import 'remixicon/fonts/remixicon.css'

// const LocationSearchPanel = (props) 
const LocationSearchPanel = (props) => {
    const handleSuggestionClick = (suggestion) => {
        if (props.activeField === 'pickup') {
            props.setPickup(suggestion)
        } else if (activeField === 'destination') {
            props.setDestination(suggestion)
        }
        // props.setVehiclePanel(true)
        // props.setPanelOpen(false)
    }
    // const locations = [
    //     "24B, near kapoor's cafe sherynians coding school bhopal",
    //     "22D, near malholtra's cafe sherynians coding school bhopal",
    //     "20C, near singhai's cafe sherynians coding school bhopal",
    //     "18A, near sharma's cafe sherynians coding school bhopal",
    // ]

    return (
        <div>
            {
                // cách 1 cũ
                // locations.map(function (ele) {
                //     return <div className='flex gap-4 border-2 p-3 rounded-xl items-center my-2 border-gray-50 active:border-black justify-start'>
                //         <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full'>
                //             <i className='ri-map-pin-fill'></i>
                //         </h2>
                //         <h4 className='font-medium'>{ele}</h4>
                //     </div>
                // })
                // locations.map((item, index) => (
                //     <div key={index} onClick={()=>{
                //         // props.setVehiclePanel(true)
                //         props.setPanelOpen(false)
                //         props.setVehiclePanel(true)
                //     }} className='flex gap-4 border-2 p-3 rounded-xl items-center my-2 border-gray-50 active:border-black justify-start'>
                //         <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full'>
                //             <i className='ri-map-pin-fill'></i>
                //         </h2>
                //         <h4 className='font-medium'>{item}</h4>
                //     </div>
                // ))
                props.suggestions.map((ele, idx)=>{
                <div key={idx} onClick={() => {
                    handleSuggestionClick(ele)
                }} className='flex gap-4 border-2 p-3 rounded-xl items-center my-2 border-gray-50 active:border-black justify-start'>
                    <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full'>
                        <i className='ri-map-pin-fill'></i>
                    </h2>
                    <h4 className='font-medium'>{ele}</h4>
                </div>
                })
            }

        </div>
    )
}

export default LocationSearchPanel