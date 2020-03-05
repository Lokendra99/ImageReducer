var uuidv4 = require('uuid/v4');
var responseGenerator = require('./libs/responsegenerator');

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./s3_config.json');
var s3Bucket = new AWS.S3( { params: {Bucket: 'imageupload11'} } );


function upload (dataArray) {

    return new Promise((resolve, reject) => { 
        var responseData = [];
        dataArray.map((singleImage)=>{
            let userId = uuidv4()
        
            var data = {
              Key: userId, 
              Body: singleImage.imageBase64String,
              ContentEncoding: 'base64',
              ContentType: 'image/jpeg'
            };
    
            s3Bucket.upload (data, function(err, resdata){
                if (err) { 
                  reject(err)
                } else {
                  responseData.push(resdata);
                  if(responseData.length == dataArray.length){
                    resolve(responseData)
                  }
                }
            });
        })

    })


}
module.exports = upload