const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const {cloudinary} = require('../utils/cloudinary')

router.put('/:id', async(req,res) => {
    if(req.body.userId === req.params.id){
       if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        const hashed= await bcrypt.hash(req.body.password, salt)
       }

       const {email, password, profilePic}= req.body;

       
       try{

        let user = await User.findById(req.params.id)

          if(profilePic){
            const uploadRes= await cloudinary.uploader.upload(profilePic, {
                upload_preset:"recall",

            })

            if(uploadRes){
                const data = {
                    email,
                    password,
                    profilePic: uploadRes,
                }

                user = await User.findByIdAndUpdate(req.params.id, data, {new: true})
                res.status(200).json(user)
            }
          }

       }catch(err){
        res.status(500).json(err)
       }

    }else{
        res.status(400).json('You can update only your account')
    }
})

router.delete('/:id', async(req,res) => {
    if(req.body.userId === req.params.id){

        try{

            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("The user has been deleted")

        }catch(err){
            res.status(500).json(err)
        }

    }else{
        res.status(404).json("you can only delete your account")
    }
})


router.get('/find', async(req,res) => {
    try{
        const find= await User.find()
        res.status(200).json(find)
        
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports= router;