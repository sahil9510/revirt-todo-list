const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    userId : {type: Number , required: true},
    title : {type: String, required: true},
    completed : {type: Boolean , required: true}
})

module.exports = mongoose.model('Task',taskSchema)