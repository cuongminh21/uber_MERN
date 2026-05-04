const mapsService = require('../services/maps.service')
const { validationResult } = require('express-validator')

module.exports.getCoordiantes  = async (req,res,next)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {address} = req.query
    try {
        const coordinates = await mapsService.getAddressCoordinate(address)
        res.status(200).json(coordinates)
    } catch (error) {
        res.status(404).json({message:'Coordinates not found'})
    }
}

module.exports.getDistanceTime= async (req,res,next)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {origin,destination} = req.query
    try {
        const distanceTime = await mapsService.getDistanceTime(origin,destination)
        res.status(200).json(distanceTime)
    } catch (error) {
        res.status(404).json({message:'Coordinates not found'})
    }
}

module.exports.getAutoCompleteSuggestions= async (req,res,next)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       
        return res.status(400).json({ errors: errors.array() })
    }
    const {input} = req.query
    try {
        const suggestions = await mapsService.getAutoCompleteSuggestions(input)
        console.log("suggestions:", suggestions)
        res.status(200).json(suggestions)
    } catch (error) {
        console.log("ERROR:", error.response?.data || error.message)
        res.status(404).json({message:'Suggestions not found'})
    }
}



