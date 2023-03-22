const express = require('express'),
      router = express.Router(),
      Notes = require('../schema/notes.model');

// define the home page route
router.post('/',  async (req,res)=>{
    const {title,content,user_id} = req.body;
    if(!title){
        res.status(422).json({message:"erro"});
    }

    const notebook = {
        title,
        content,
        user_id
    }

    try{
        const newNotebook = await Notes.create(notebook);
        res.status(201).json({status:true, message:"iserido com sucesso", notebook:newNotebook})
    }catch (err){
        res.status(500).json({status:false, message:err});
    }
})
router.get('/:user', async (req,res)=>{
    const user = req.params.user;
    
    try{
        const notes = await Notes.findById({user_id:user});
        res.status(201).json(notes)

    }catch(err){
        res.status(501).json({message:err})

    }
})
router.get('/:user/:id', async (req,res)=>{
    const id = req.params.id;
    const user = req.params.user;

    try{
        const notes = await Notes.findOne({_id:id, user_id:user});
        res.status(201).json(notes)

    }catch(err){
        res.status(501).json({message:err})

    }
})
router.patch('/:id', async (req,res)=>{
    const id = req.params.id;
    const {title, content} = req.body;
    const notebook = {
        title,
        content
    }

    try{
        await Notes.updateOne({_id:id},notebook)
        res.status(201).json(notebook)

    }catch(err){
        res.status(501).json({message:err})

    }
})
router.delete('/:id', async (req,res)=>{
    const id = req.params.id;

    try{
        await Notes.deleteOne({_id:id})
        res.status(201).json(notebook)

    }catch(err){
        res.status(501).json({message:err})

    }
})

module.exports = router;
