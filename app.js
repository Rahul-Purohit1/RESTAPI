const express = require("express")
const app = express()
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended:true}))

const _ = require("lodash")

const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/wikiDB")

const articleSchema = {
   
    title : String,
    content : String
}

const articleModel = new mongoose.model("articles",articleSchema)

const field1 = new articleModel({
 
    title:"Npm",
    content:"It is the node package manner"
    //Raj
})
const field2 = new articleModel({
   
    title:"SQL",
    content:"structured Query Language"
})

articleModel.insertMany([field1,field2],function(err){
    if(!err){
     console.log("successfully added")
    }
    else{
        console.log(err)
    }
})


//////////////it is for all route////////////////////////////and also It is the Example of Chained Route  format " app.route("/routename").get().delete();"/////////////////////////////////

app.route("/articles")

.get(function(req,res){
    articleModel.find({},function(err,foundarticle){
        if(!err){res.send(foundarticle)}
        else{
            res.send(err)
        }
    })
})

.post(function(req,res){
    const postItem = new articleModel({
        title:req.body.title,
        content:req.body.content
    })
    postItem.save(function(err){
       if(!err){res.send("successfully Added")} 
       else{
        console.log(err)
       }
    });
  
})

.delete(function(req,res){
    articleModel.deleteMany(function(err){
        if(!err){
            res.send("Deleted successfully")
        }
        else{
           res.send(err)
        }
    })
});

////////////////////////////////////IT is for specific route ////////////////////////
app.route("/articles/:articleTitle")

.get(function(req,res){
    // title:req.params.articleTitle
    articleModel.find({},function(err,result){
        if(!err){
           res.send(result)
        }
        else{
           res.send(result)
        }
    })
})
.post(function(req,res){

    const postItem = new articleModel({
                title:req.body.title,
                content:req.body.content
            })
            postItem.save(function(err){
                if(!err){
                    res.send("successfully Added")
                }
                else{
                    res.send(err)
                }
            });
    
})

  
//updateMany udapteOne replaceOne all working fine here
.put(function(req,res){
    articleModel.updateOne(
        {title:req.params.articleTitle},
        {title:req.body.title,content:req.body.content},
        function(err)
        {if(!err){res.send("succesfully updated")}
         else{res.send(err)}
        })
})

.patch(function(req,res){
   articleModel.updateOne(
        {title:req.params.articleTitle},
        {$set:req.body},
        function(err){
            if(!err){res.send("Succesfully updated")}
            else{
                res.send(err)
            
            }
         } 
    )
    
})

.delete(function(req,res){
    articleModel.deleteOne(
        {title:req.params.articleTitle},
        function(err){
        if(!err){
            res.send("successfully deleted")
        }
    })
})






app.listen(3000,function(req,res){
    console.log("server is running on port 3000")
})



// This both below are similar 

// model.update(
//     {<parameter>},
//     {title:req.body.title,content:req.body.content}
//     <callback fun>
// )
// model.update(
//     {<parameter>},
//     {$set:req.body}
//     <callback fun>
//   )