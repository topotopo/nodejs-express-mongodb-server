const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
    name: String,
    description: String
}, {
    timestamps: true //When set to true, Mongoose will automatically add new 2 fields: createdAt and updatedAt
})

module.exports = mongoose.model('Todo', TodoSchema)