var express = require('express');

var route = express.Router();

var mongoose = require('mongoose');

var imageModel = mongoose.model('images');


var responseGenerator = require('./../../libs/responsegenerator');

var upload = require('../../s3Upload')



route.post('/upload', function (req, res) {
     
    var dataArray = req.body;
    dataArray.map((img,index)=>{

      img.imageBase64String= new Buffer(img.imageBase64String.split(",")[1],"base64");


    })
 
    upload(dataArray)
    .then((data)=>{ 
        var response = responseGenerator.generate(false , "Images Uploaded SuccesFully" , 200, data ); 
        res.send(response)
        })
    .catch((err)=> {throw err})



    /* Uncomment if you want to store images in mongodb*/



    // var imagesCollection = new imageModel;

    // imagesCollection.images = dataArray;

    // // a.img.contentType = 'image/jpeg';
    // imagesCollection.save(function (err, data) {
    //   if (err) throw err;

    //  // console.error('saved img to mongo');
    // res.send('ok');
    // })

})

route.get('/getImage',function(req,res){
    A.findOne({},function(err,obj){
        if(err) {
        var error = responseGenerator.generate(true , err , 500, null );
        res.send(error);
        }
        var response = responseGenerator.generate(false , 'Succesfully retrived Data' , 200, obj );

        res.send(response);
    })
})

module.exports=route;
