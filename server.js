const SERVER_PORT = 3000;

// Initiating Express app
const express = require('express');
const app = express();

// For JSON parsing of body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Loading config file
const fs = require('fs');
const rawConfig = fs.readFileSync('../config.json')
const config = JSON.parse(rawConfig)

// Initiating Twilio Client
const ACCOUNT_SID = config.twilio_account_info.account_sid;
const AUTH_TOKEN = config.twilio_account_info.auth_token;

const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);


// Sending a Message via Twilio
app.post('/sendMessage', (req, res) => {

    const data = req.body
    client.messages.create({
        body: data["messageBody"],
        from: data["from"],
        to: data["to"]
    })
    .then(message => {
        res.send(`Successfully sent message: ${message.sid}`)
    })
    .catch(err => {
        res.send(`An error occurred`)
    })
})

// Running the server
app.listen(SERVER_PORT, () => {
    console.log(`App listening on port ${SERVER_PORT}`)
})