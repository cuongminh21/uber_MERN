const mongoose = require("mongoose")

const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            require:true            
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
            ref: "captain",
            require:true            
    },
    pickup: {
        type: String,
        require:true  
    },
    destination: {
        type: String,
        require:true  
    },
    fare:{
        type: Number,
        require:true  
    },
     status:{
        type:String,
        enum:["pending","accepted","ongoing","complete","cancalled"],
        default:"pending"
     },
     duration:{
        type:Number
     },
     distance:{
        type:Number
     },
     paymentID:{
        type:String
     },
     orderId:{
        type:String
     },
     signature:{
        type:String
     }

})
const rideModel = mongoose.model("ride",rideSchema)
module.exports = rideModel