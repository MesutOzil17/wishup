const express = require("express")
const router = express.Router();
const userSchema = require("../models/users");

router.put("/:user_name",async (req,res)=>{
    let now = new Date();
    let date = [
        now.getFullYear(),
        '-',
        now.getMonth() + 1,
        '-',
        now.getDate(),
        ' ',
        now.getHours(),
        ':',
        now.getMinutes(),
        ':',
        now.getSeconds()
      ].join('');
    const user = new userSchema({
        user_name : req.params.user_name,
        created_at : date
    });
    try{
        await user.save();
        res.status(200).json({message : "SUCCESS"});
    }catch(err){
        res.status(500).json({message : "Internal Server Error"})
    }
})

router.get("/:user_name",async (req,res)=>{
    try{
        const user = await userSchema.findOne({user_name : req.params.user_name});
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({message : "User Not Found"})
        }
    }catch(err){
        res.status(500).json({message : "Internal Server Error"})
    }
})

module.exports = router;