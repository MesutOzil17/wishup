const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    plan_id : {
        type : String,
        required : true
    },
    validity : {
        type : String,
        default : "Infinite"
    },
    cost : {
        type : Number
    }
})

module.exports = mongoose.model('plan',planSchema)