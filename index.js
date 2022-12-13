const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const Participant = require('./models/Participant')
const Payment = require('./models/Payment')

const PORT = process.env.PORT || 3500;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/yogaclass"

const app = express()

mongoose.set('strictQuery', true)
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log("Connected to DB")
    }
})

app.use(bodyParser.json())
const options = {
    origin: 'http://localhost:3000',
}
app.use(cors(options))

const completePayment = (req, res) => {
    console.log("Payment successful!")
}

app.get('/', (req, res) => {
    res.send("<h1>Hello</h1>")
})

app.post('/makePayment', async (req, res) => {
    console.log(req)
    try {
        const participant = new Participant({
            name: req.body.name,
            age: req.body.age,
            batch_id: req.body.batch
        })

        await participant.save();

        const payment = new Payment({
            participant_id: participant._id,
            batch_id: req.body.batch
        })

        await payment.save() 

        completePayment()

        console.log(req.body)

        res.status(201).send("Enrolled Successfully! ✅")
    } catch(err) {
        console.log(err)
        res.status(400).send("Enrollment failed :(")
    }
})

app.get('/participants', async (req, res) => {
    const participants = await Participant.find({})
    res.status(200).send(JSON.stringify(participants))
}) 

app.get('/batch/:batch_id', async (req, res) => {
    const participants = await Participant.find({batch_id: req.params.batch_id})
    console.log(participants)
    res.status(200).send(JSON.stringify(participants))
})

app.listen(PORT, () => console.log("Listening on Port:" + PORT))