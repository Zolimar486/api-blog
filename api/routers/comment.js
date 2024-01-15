const router = require("express").Router()

const Comment = require('../models/Comment')

router.post('/', async(req,res) => {
    try{
        const newComment= new Comment(req.body)
        
        const saveComment= await newComment.save();
        res.status(200).json(saveComment)

    }catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id', async(req,res)=> {

   try{
     const comment = await Comment.findById(req.params.id)

     if(req.body.username  === comment.username){
        try{

          const update = await Comment.findByIdAndUpdate(req.params.id, {
             $set:req.body
          }, {new: true})

          res.status(200).json(update)

        }catch(err){
            res.status(500).json(err)
        }
    }
    

   }catch(err){
    res.status(404).json(err)
   }
   

})

router.delete('/:id', async(req,res)=> {
    
    try{

        const comment = await Comment.findById(req.params.id)

        if(req.body.username  === comment.username){
            try{
    
                await Comment.findByIdAndDelete(req.params.id)
                res.status(200).json("The Comment has been deleted")
    
            }catch(err){
                res.status(500).json(err)
            }
        }
    

    }catch(err){
        res.status(404).json(err)
    }

})

router.get('/', async(req,res)=> {
    try{

        const find= await Comment.find().sort({createdAt: -1})
        res.status(200).json(find)

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports= router;