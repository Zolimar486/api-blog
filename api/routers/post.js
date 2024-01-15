const router = require('express').Router()

const Post = require('../models/Post')

const {cloudinary} = require('../utils/cloudinary')

router.post('/', async(req,res) => {

    const {title, desc, photo, username} = req.body;

    try{

       if(photo) {
         const uploadRes= await cloudinary.uploader.upload(photo, {
            upload_preset:"recall"
         })

         if(uploadRes){
            const newPost= new Post({
                title,
                desc,
                username,
                photo: uploadRes

            })

            const savePost = await newPost.save()
            res.status(200).json(savePost)


          }
       }


    }catch(err){
        res.status(500).json(err)
    }
})


router.put('/:id', async(req,res) => {
   try{
    const post = await Post.findById(req.params.id)

    if(req.body.username === post.username){
        try{

            const updatePost = await Post.findByIdAndUpdate(req.params.id, {
                $set:req.body
            }, {new: true})

            res.status(200).json(updatePost)

        }catch(err){
            res.status(500).json(err)
        }

    }else{
        res.status(404).json("You can only update your Post")
    }

   }catch(err){
    res.status(500).json(err)
   }
})

router.delete('/:id', async(req,res)=> {
    try{
        const post = await Post.findById(req.params.id)
        
      if(req.body.username === post.username){
        try{
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json("The Post has been Delete")

        }catch(err){
            res.status(500).json(err)
        }

     }else{
        res.status(404).json("You can only delete your Post")
     }

    }catch(err){
        res.status(500).json(err)
    }
    
})

router.get('/:id', async (req, res) => {
    const postId = req.params.id;
    console.log('Requested Post ID:', postId);
  
    try {
      const post = await Post.findById(postId);
  
  
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  });

router.get('/', async (req, res) => {
    const username = req.query.user;

    try {
        let posts;

        if (username) {
            posts = await Post.find({ username }).select("title desc username photo createdAt");
        } else {
            posts = await Post.find().select("title desc username photo createdAt");
        }

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
});


module.exports= router;