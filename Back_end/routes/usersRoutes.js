const express = require('express');
const userRouter = express.Router();
const User = require('../models/userModel');

userRouter.get('/',  async (req,res)=>{
    try{
        const users = await User.find()
        res.status(200).json(users)
    } catch(err){
        res.status(400).json({msg:err.message})
    }
})

userRouter.get('/:id',  async (req,res)=>{
    try{
        const { id } = req.params;
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch(err){
        res.status(400).json({msg:err.message})
    }
})

userRouter.post('/', async (req, res)=>{
    try{
        const newUser = new User(req.body);
        await newUser.save()
        res.status(201).json({msg:'new user added', newUser})
    }catch(err) {
        res.status(400).json({msg:`hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: ${err.message} `});
    }
});

userRouter.put('/:id', async (req, res)=>{
    const { id } = req.params;
    const updatedDate = req.body
    const user = await User.findByIdAndUpdate(id, updatedDate, {new:true});
    try{
      res.status(200).json({msg:"data updated", user});
    } catch(error) {
      res.status(400).json({msg:error.message})
    }
});
  
userRouter.delete('/:id', async (req, res)=>{
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    try{
        res.status(200).json({msg:"data deleted"});
    } catch(error) {
        res.status(400).json({msg:error.message})
    }
});

  
  
module.exports = userRouter
  