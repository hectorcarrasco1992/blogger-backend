var express = require('express');
var router = express.Router();
const Blogs = require('../models/Blogs')

/* GET home page. */
router.get('/', function(req, res, next) {
  Blogs.find({}).then((blogs)=>{
    res.status(200).json({blogs})
  }).catch(err=>res.status(400).json({error:'uh oh'}))
});

router.post('/addblog',(req,res)=>{
  // validate input
  // if(!req.body.title|| !req.body.author||!req.body.subject||req.body.article){
  //     return res.status(400).json({message:'all in puts must be filled'})
  // }
  //check if blog is unique
  //use the Blogs model and the mongoose method to compare blog in db to input blog  respectively
  Blogs.findOne({word:req.body.word})
  .then((blog)=>{
      
      if(blog){
          return res.status(500).json({message:'blog is already made'})
      }
  })
  const newBlog = new Blogs()
  newBlog.title = req.body.title
  newBlog.author = req.body.author
  newBlog.subject = req.body.subject
  newBlog.article = req.body.article
  
  
  newBlog.save()
  .then((blog)=>{
      res.status(200).json({message:'success blog has been added',blog:blog})
  })
  .catch((err)=>{
      return res.status(500).json({message:'blog not added',err})
  })
  
  .catch((err)=>{
      return res.status(500).json({message:'server error',err})
  })
})

router.get('/findblog/:id',(req,res)=>{
  Blogs.findOne({_id:req.params.id}).then((blog)=>{
    if(blog){
      return res.status(200).json({blog})
    }else {
      return res.status(418).json({message:'no blog found'})
    }
  }).catch(err=>res.status(418).json({message:'we done messed up A-A-ron'}))
})

router.put('/updateblog/:id',(req,res)=>{
  Blogs.findOne({_id:req.params.id})
  .then((blog)=>{
    if(blog){
      blog.title = req.body.title?req.body.title:blog.title
      blog.author = req.body.author?req.body.author:blog.author
      blog.subject = req.body.subject?req.body.subject:blog.subject
      blog.article= req.body.article?req.body.article:blog.article

      blog.save().then((blog)=>{
        res.status(200).json({message:'blog updated',blog})
      }).catch(err=>res.status(418).json({message:'blog not updated'}))
    }
  }).catch(err=>res.status(418).json({message:'space conflux module error',err}))
})

router.delete('/:id',(req,res)=>{
  Blogs.findOneAndDelete({_id:req.params.id})
  .then((blog)=>{
      if(blog){
          return res.status(200).json({message:'blog deleted'})
      }else{
          return res.status(200).json({message:'no blog to delete'})
      }
  }).catch(err => res.status(400).json({message:"blog not deleted",err}))
  
})

module.exports = router
