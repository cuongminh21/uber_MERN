const { validationResult } = require('express-validator')
const rideSerice = require('../services/ride.service')
const mapSerice = require('../services/maps.service')
const {sendMessageToSocketId} = require('../socket')
const rideModel = require('../models/ride.model')

module.exports.createRide = async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({errors:errors.array()})
    }
    const {pickup,destination,vehicleType} = req.body
    try {
        const ride = await rideSerice.createRide({
            user:req.user._id,pickup,destination,vehicleType
        })
        res.status(201).json(ride)

        const pickupCoordinates = await mapSerice.getAddressCoordinate(pickup)
        
        const captainsInRadius = await mapSerice.getCaptainsInTheRadius(pickupCoordinates.lat,pickupCoordinates.lng,2)

        ride.otp = ""

        // const rideWithUser =  await rideModel.findOne({_id:ride._id}).populate('user','phone')
        const rideWithUser =  await rideModel.findOne({_id:ride._id}).populate('user')

        captainsInRadius.map(captain=>{
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data: rideWithUser
            })
        })

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
    
}
module.exports.getFare = async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({errors:errors.array()})
    }
    const {pickup,destination} = req.body
    try {
        const fare = await rideSerice.getFare({
            pickup,destination
        })
        return res.status(200).json(fare)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}
module.exports.confirmRide = async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({errors:errors.array()})
    }
    const {rideId} = req.body
    try {
        const ride = await rideSerice.confirmRide({riderId,captain: req.captain})
        sendMessageToSocketId(rider.user.socketId,{
            event:'rider-confirmed',
            data:ride
        })
        return res.status(200).json(ride)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

module.exports.startRide =  async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({errors:errors.array()})
    }
    const {rideId,otp} = req.query
    try {
        const ride = await rideSerice.startRide({riderId,otp,captainId: req.captain})
        sendMessageToSocketId(rider.user.socketId,{
            event:'rider-started',
            data:ride
        })
        return res.status(200).json(ride)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports.endRide =  async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({errors:errors.array()})
    }
    const {rideId} = req.body
    try {
        const ride = await rideSerice.endRide({riderId,captainId: req.captain})
        sendMessageToSocketId(rider.user.socketId,{
            event:'rider-ended',
            data:ride
        })
        return res.status(200).json(ride)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}