const express = require("express")
const router = express.Router();
const subscriptionSchema = require("../models/subscriptions");
const planSchema = require("../models/plan");

router.post("/", async (req, res) => {
    const subscription = new subscriptionSchema({
        user_name: req.body.user_name,
        plan_id: req.body.plan_id,
        start_date: req.body.start_date
    });
    let cost = 0;
    try {
        const plan = await planSchema.findOne({ plan_id: req.body.plan_id });
        if(plan){
            await subscription.save();
            cost = plan.cost;
            const result = {
            status: "SUCCESS",
            amount: cost > 0 ? `-${cost} debited` : "0 debited"
            }
            res.status(200).json(result);
        }else{
            res.status(404).json({message : "Plan Not Found"})
        }
    } catch (err) {
        const error = {
            status: "FAILURE",
            amount: `+${cost} credited`
        }
        res.status(500).json({message : "Internal Server Error"})
    }
})

router.get("/:user_name/:start_date", async (req, res) => {
    try {
        const sub = await subscriptionSchema.findOne({ user_name: req.params.user_name, start_date: req.params.start_date })
        if(sub){
            let plan = await planSchema.findOne({ plan_id: sub.plan_id });
        let result = {
            plan_id: sub.plan_id,
            days_left: ""
        }
        if (isNaN(plan.validity)) {
            result.days_left = plan.validity
        } else {
            let startDate = new Date(sub.start_date);
            let currentDate = new Date();
            const oneDay = 24 * 60 * 60 * 1000;
            let usedDays = Math.round(Math.abs((currentDate - startDate) / oneDay));
            const daysLeft = plan.validity - usedDays
            if (daysLeft < 0) {
                result.days_left = 0
            } else {
                result.days_left = daysLeft
            }
        }
        res.status(200).json(result);
        }else{
            res.status(404).json({message : "User Not Found"})
        }
    } catch (err) {
        res.status(500).json({message : "Internal Server Error"})
    }
})

router.get("/:user_name", async (req, res) => {
    try {
        const sub = await subscriptionSchema.find({ user_name: req.params.user_name })
        let result = []
        for await (elem of sub){
            let obj = {
                plan_id: elem.plan_id,
                start_date: elem.start_date
            }
            const plan = await planSchema.findOne({ plan_id: elem.plan_id });
            if (isNaN(plan.validity)) {
                obj.valid_till = plan.validity
            } else {
                let startDate = new Date(elem.start_date)
                startDate.setDate(startDate.getDate() + parseInt(plan.validity))
                startDate = new Date(startDate).toISOString().slice(0, 10)
                obj.valid_till = startDate
            }
            result.push(obj)
        }
        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({message : "Internal Server Error"})
    }
})

module.exports = router;