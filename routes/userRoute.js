const express = require('express'),
      router = express.Router(),
      Users = require('../schema/user.model');

router.get('/', async (req,res)=>{
    try{
        const users = await Users.find();
        res.status(201).json(users);

    }catch(err){
        res.status(501).json({message:err});
    }
})
router.post("/",async (req,res)=>{
    const {email,password,name} = req.body;
    if(!email || !password || !name){
        res.status(422).json({message:"erro"});
    }
    
    const user = {
        email,
        password,
        name
    }

    try{
        const newUser = await Users.create(user);
        res.status(201).json({status:true, message:"user cadastrado com sucesso", user:newUser})
    }catch (err){
        res.status(500).json({status:false, message:err});
        console.log(err)
    }

})
router.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(422).json({message:"erro"});
    }
    
    const user = {
        email,
        password
    }

    try{
        const response = await Users.findOne({email:email, password:password})
        if(response){
            res.status(201).json({status:true, message:"user logged", user:response})
        }else{
            res.status(400).json({status:false, message:"user not found", user:response})
        }

    }catch (err){
        res.status(500).json({status:false, message:err});
        console.log(err)
    }

})



module.exports = router;