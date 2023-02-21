const mongoose = require('mongoose');

const Employee = mongoose.model('Employee',{
    id: Number,
    user: String,
    email: String
});


module.exports = {Employee};