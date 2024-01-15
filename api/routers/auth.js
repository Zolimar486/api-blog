const router= require("express").Router();
const User = require('../models/User')
const bcrypt= require('bcrypt');
const {cloudinary}= require('../utils/cloudinary')

router.post('/register', async(req,res) =>{
    
    const {username, email, password, profilePic} = req.body;

    try{
       
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(req.body.password, salt)

        if(profilePic){
            const uploadRes= await cloudinary.uploader.upload(profilePic, {
               upload_presest:"recall"
            })

            if(uploadRes){
                const newUser = new User({
                    username,
                    email,
                    password:hashed,
                    profilePic: uploadRes,
                })

                const saveUser = await newUser.save();
                res.status(200).json(saveUser)
            }
        }

    }catch(err){

        res.status(500).json(err)
    }

})


router.post('/login', async(req,res) => {
    try{

        const user = await User.findOne({username: req.body.username})
        if(!user){
            return res.status(404).json("Wrong Credential")
        }

       const validated = await bcrypt.compare(req.body.password, user.password)
       if(!validated){
        return res.status(404).json("wrong credential")
       }

       res.status(200).json(user)

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports= router;