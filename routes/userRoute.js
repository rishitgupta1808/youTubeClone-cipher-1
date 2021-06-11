const { json } = require("body-parser");
const express = require("express");
const router = require("express").Router();
const user = require("../models/user");
const crypto = require('crypto')

router.post("/", async (req, res) => {
  console.log(req.body);
  const body = req.body;
  const key = process.env.KEY
  const encoder = crypto.createCipher('aes256',key);
  const encrypted = encoder.update(body.password,'utf-8','hex')  + encoder.final('hex');
  try {
    user.findOne({username:body.username})
    .then(async (result)=>{
      if(result){
        res.status(200).send("UserName already exist");
      }else{
        let newuser = new user({
          name:body.name,
          username : body.username,
          password : encrypted
      })
      let temp = await newuser.save();
  
        res.status(200).json({
        success: true,
        user: temp,
        
      });
      }
    })

  } catch (error) {
    console.log(error)
    };
  })

  router.post("/getUser", async (req, res) => {
    console.log(req.body);
    const body = req.body;
    const key = process.env.KEY
    const encoder = crypto.createCipher('aes256',key);
    const encrypted = encoder.update(body.password,'utf-8','hex')  + encoder.final('hex');
    console.log(encrypted)
    await user.findOne({username : body.username})
    .then((result)=>{
      if(result){
        console.log(result)
          if(encrypted===result.password){
             res.status(200).json({
              success : true, 
              msg:result
              });
          }else{
             res.status(200).json({
               success:false,
               msg:"Password is wrong"
             })
          }
      }else{
        res.status(200).send({
          success:false,
          msg:"User not Found Sign Up First"}
          )
      }
    })
    })

module.exports = router;
