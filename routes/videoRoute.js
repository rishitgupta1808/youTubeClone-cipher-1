const { json } = require("body-parser");
const express = require("express");
const router = require("express").Router();
const user = require("../models/user");
const multer = require('multer')
const ffmpeg = require('fluent-ffmpeg');
const Video = require('../models/video')


const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename:  (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single("file")

router.post("/uploadfiles", async (req, res) => {
    console.log(req.body)
    
    upload(req, res, err => {
        const filePath = 'uploads/' + res.req.file.filename;
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: filePath, fileName: res.req.file.filename })
    })
    })

    router.post("/thumbnail", (req, res) => {

        let thumbsFilePath ="";
        let fileDuration ="";
        console.log(req.body.filePath)
    try{
        ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
            if(err){
                console.log(err)
            }else{
                console.dir(metadata);
                console.log(metadata.format.duration);
                
                fileDuration = metadata.format.duration;
            }
          
        })
    }catch(err){
        console.log(err)
    }
        
    
    
        ffmpeg(req.body.filePath)
            .on('filenames', function (filenames) {
                console.log('Will generate ' + filenames.join(', '))
                thumbsFilePath = "uploads/thumbnails/" + filenames[0];
            })
            .on('end', function () {
                console.log('Screenshots taken');
                return res.json({ success: true, thumbsFilePath: thumbsFilePath ,fileDuration:fileDuration})
            }).on('error',function(err){
               console.log(err)
            })
            .screenshots({
                // Will take screens at 20%, 40%, 60% and 80% of the video
                count: 1,
                folder: 'uploads/thumbnails',
                size:'120x80',
                // %b input basename ( filename w/o extension )
                filename:'thumbnail-%b.png'
            });
    
    });

    router.post("/saveVideo", async (req, res) => {
        console.log(req.body)
        
        let newVideo = new Video(req.body)

       newVideo.save((err,videores)=>{
           if(err){
               res.status(200).json({success:false,err})
           }else{
               res.status(200).json({success:true})
           }
       })
    })
    
    router.get("/getAllVideos", async (req, res) => {
        console.log(req.body)
        
        Video.find({})
        .then(result=>{
            if(result){
                res.status(200).send(result)
            }else{
                res.status(200).json({
                    noData : true
                })
            }
            

        }).catch((err)=>console.log(err))

        
        })
    
        router.post("/eachVideo", async (req, res) => {
            console.log(req.body)
            
            Video.findOne({'_id': req.body.videoId})
            .then(result=>{
                if(result){
                    console.log(result)
                    res.status(200).json({
                        video:result,
                        success:true
                    })
                }else{
                    res.status(200).json({
                        success : false
                    })
                }
                
    
            }).catch((err)=>console.log(err))
    
            
            })


      router.post("/inreaseLike", async (req, res) => {
          console.log(req.body)
          
          Video.updateOne({'_id': req.body.videoId},
          {
              $set:{
                  likes : req.body.likes
              }
          })
          .then(result=>{
             console.log("likes increase")
        }).catch((err)=>console.log(err))
    })

    router.post("/inreaseViews", async (req, res) => {
        console.log(req.body)
        
        Video.updateOne({'_id': req.body.videoId},
        {
            $set:{
                views : req.body.views
            }
        })
        .then(result=>{
            console.log("views increase")
      }).catch((err)=>console.log(err))
  })
        

module.exports = router;
