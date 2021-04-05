const express = require("express");
const app = express();
const userRoute = require('./routers/user');
const planRoute = require('./routers/plan');
const subscriptionRoute = require('./routers/subscription');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config')
app.use(bodyParser.json());

app.use("/user",userRoute);
app.use("/plan",planRoute);
app.use("/subscription",subscriptionRoute);

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("connected")
})

app.listen(3000);