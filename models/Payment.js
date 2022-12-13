const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    participant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partcipant'
    },
    batch_id : {
        type: Number,
        min: 1, max: 4
    }
},
{ timestamps: { createdAt: 'created_at' } })

const Payment = mongoose.model('payment', PaymentSchema)
module.exports = Payment