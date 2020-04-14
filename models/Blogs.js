const mongoose = require('mongoose')

const Blogs  = new mongoose.Schema({
    title:{type:String,default:'',lowercase:true},
    author:{type:String,default:"",lowercase:true},
    subject:{type:String,default:'',lowercase:true},
    article:{type:String,default:'',lowercase:true},

})

module.exports = mongoose.model('blogs',Blogs)