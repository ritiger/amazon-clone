const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51IV7AWAC7NytXs4VaO7CwMz6AnIvRgw1iidUYu0hU1Tc0" +
    "QeUpHZ5DY3UYN2ATQZxuzTP2rg9ODoburR82ihqW2Sc00XAGas4bU"
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("안녕"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
    console.log(" payment.js에서 가져온 total의 양은 다음과 같다!!  ", total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })

})

exports.api = functions.https.onRequest(app);

/*
http://localhost:5001/clone-test-c0f8e/us-central1/api */
