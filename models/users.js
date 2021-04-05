const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_name : {
        type : String,
        required : true
    },
    created_at : {
        type : String
    }
})

module.exports = mongoose.model('users',userSchema)