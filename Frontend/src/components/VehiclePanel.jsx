import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => { props.setVehiclePanel(false) }}>
                <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
            </h5>

            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
            <div className='flex w-full p-3 mb-2 items-center justify-center gap-2 border-2 border-gray-50 active:border-black rounded-xl'
            onClick={()=>{
                props.setConfirmRidePanel(true)
                props.selectVehicle('car')
            }}
            >
                <img className='h-12' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8zMDUxZTYwMi0xMGJiLTRlNjUtYjEyMi1lMzk0ZDgwYTljNDcucG5n" alt="" />
                <div className='w-1/2 ml-2'>
                    <h4 className='font-medium text-base'>
                        UberGo
                        <span>
                            <i className='ri-user-3-fill'>4</i>
                        </span>
                    </h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{props.fare.car}</h2>
            </div>

            <div className='flex w-full p-3 mb-2 items-center justify-center gap-2 border-2 border-gray-50 active:border-black rounded-xl'
            onClick={()=>{
                props.setConfirmRidePanel(true) 
                props.selectVehicle('moto')
            }}
            >
                <img className='h-12' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n" alt="" />
                <div className='w-1/2 ml-2'>
                    <h4 className='font-medium text-base'>
                        Moto
                        <span>
                            <i className='ri-user-3-fill'>1</i>
                        </span>
                    </h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{props.fare.moto}</h2>
            </div>

            <div className='flex w-full p-3 mb-2 items-center justify-center gap-2 border-2 border-gray-50 active:border-black rounded-xl'
            onClick={()=>{
                props.setConfirmRidePanel(true)
                props.selectVehicle('auto')
            }}
            >
                <img className='h-12' src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="" />
                <div className='w-1/2  ml-2'>
                    <h4 className='font-medium text-base'>
                        UberAuto
                        <span>
                            <i className='ri-user-3-fill'>3</i>
                        </span>
                    </h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{props.fare.auto}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel