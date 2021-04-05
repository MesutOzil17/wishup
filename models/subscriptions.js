const mongoose = require('mongoose');

const subscriptionsSchema = mongoose.Schema({
    user_name : {
        type : String,
        required : true
    },
    plan_id : {
        type : String,
        required : true
    },
    start_date : {
        type : String
    }
})

module.exports = mongoose.model('subscriptions',subscriptionsSchema)