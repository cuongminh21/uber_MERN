const mongoose = require("mongoose")

// ...existing code...
const blacklistTokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: 86400 } // 24 hours TTL
  })
  
  // optional explicit TTL index (redundant but safe)
  //blacklistTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 })
  
  module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema)
  // ...existing code...