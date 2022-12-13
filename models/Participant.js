const mongoose = require('mongoose')

const ParticipantSchema = new mongoose.Schema({
    name : {type: String, required: true},
    age: {type: Number, required: true, min: 18, max: 65},
    batch_id: {type: Number, required: true, min: 1, max: 4},
})

const Participant = mongoose.model('participant', ParticipantSchema)
module.exports = Participant