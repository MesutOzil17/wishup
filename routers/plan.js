const express = require("express")
const router = express.Router();
const planSchema = require("../models/plan");

router.post("/",async (req,res)=>{
    try{
        await planSchema.insertMany(req.body);
        res.status(200).json({message : "SUCCESS"});
    }catch(err){
        res.status(500).json({message : "Internal Server Error"})
    }
})

module.exports = router;