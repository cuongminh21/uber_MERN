const express = require('express')
const router = express.Router()
const {body,query} = require('express-validator')
const rideController = require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middlewares')

router.post('/create'
    ,authMiddleware.authUser
    ,body('pickup').isString().isLength({ min: 24, max:24 }).withMessage('Invalid pickup address')
    ,body('destination').isString().isLength({ min: 24, max:24 }).withMessage('Invalid destination address')
    ,body('vehicleType').isString().isIn(['auto','car','moto']).withMessage('Invalid vehicle type')
    ,rideController.createRide
)

router.get('/get-fare'
    ,authMiddleware.authUser
    ,query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address')
    ,query('destination').isString().isLength({min:3}).withMessage('Invalid destination address')
    ,rideController.getFare
)

router.get('/confirm'
    ,authMiddleware.authCaptain
    ,body('riderId').isMongoId().withMessage('Invalid ride id')
    // ,body('otp').isString().isLength({min: 6, max:6 }).withMessage('Invalid otp')
    ,rideController.confirmRide
)
router.get('/start-ride'
    ,authMiddleware.authCaptain
    ,query('riderId').isMongoId().withMessage('Invalid ride id')
    ,query('otp').isString().isLength({min: 6, max:6 }).withMessage('Invalid otp')
    ,rideController.startRide
)

router.post('/end-ride'
    ,authMiddleware.authCaptain
    ,body('riderId').isMongoId().withMessage('Invalid ride id')    
    ,rideController.endRide
)

module.exports = router