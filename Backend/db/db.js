const mongoose = require('mongoose')
function connectToDb() {
    mongoose.connect(`${process.env.Db_CONNECT}/uber-video`
        // , {
        //     useNewUrlParser: true,
        //     useUnifiedTopology:true
        // }
    ).then(() => {
        console.log('Connect to DB')
    }).catch(err => console.log(err))
}

module.exports = connectToDb