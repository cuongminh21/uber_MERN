const axios = require('axios');
const captainModel = require('../models/captain.model')

module.exports.getAddressCoordinate = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API; // Replace with your Google Maps API key
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: apiKey
            }
        });

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            if (response.data.status === 'ZERO_RESULTS'){
                throw new Error('No routes found')
            } if (response.data.status === 'REQUEST_DENIED'){
                throw new Error('API key wrong')
            }if (response.data.status === 'OVER_QUERY_LIMIT'){
                throw new Error('Empty quota')
            }if (response.data.status === 'INVALID_REQUEST'){
                throw new Error('Param null')
            }else{
                throw new Error(`Geocoding error: ${response.data.status}`);
            }
            
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required')
    }
    try {
        const apiKey = process.env.GOOGLE_MAPS_API; // Replace with your Google Maps API key
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
                origin: origin,
                destination: destination,
                key: apiKey,
                language: 'vi',
                components: 'country:vn'
            }
        });

        if (response.data.status === 'OK') {   
            // return response.data.rows[0].elements[0];
            return response.data.predictions

        } else {
            if (response.data.status === 'ZERO_RESULTS'){
                throw new Error('No routes found')
            } if (response.data.status === 'REQUEST_DENIED'){
                throw new Error('API key wrong')
            }if (response.data.status === 'OVER_QUERY_LIMIT'){
                throw new Error('Empty quota')
            }if (response.data.status === 'INVALID_REQUEST'){
                throw new Error('Param null')
            }else{
                throw new Error(`Unable to fetch distance and time`);
            }
            
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query are required')
    }
    try {
        const apiKey = process.env.GOOGLE_MAPS_API; // Replace with your Google Maps API key
        //https://maps.googleapis.com/maps/api/geocode/json
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
                input: input,
                key: apiKey,
                language: 'vi',
                components: 'country:vn'
            }
        });

        if (response.data.status === 'OK') {          
                
            return response.data.predictions
        } else {
            if (response.data.status === 'ZERO_RESULTS'){
                throw new Error('No routes found')
            } if (response.data.status === 'REQUEST_DENIED'){
                throw new Error('API key wrong')
            }if (response.data.status === 'OVER_QUERY_LIMIT'){
                throw new Error('Empty quota')
            }if (response.data.status === 'INVALID_REQUEST'){
                throw new Error('Param null')
            }else{
                throw new Error(`Unable to fetch distance and time`);
            }
            
        }
    } catch (error) {
        console.error('Error fetching coordinates:',  error.response?.data || error.message);
        throw error;
    }
};

module.exports.getCaptainsInTheRadius = async (ltd,lng,raidus) => {

    // radius in km
    

    const catptains = await captainModel.find({
        location:{
            $geoWithin:{
                $centerSphere:[[ltd,lng],radius/3963.2]
            }
        }
    })
    return catptains
}

