import express from "express";

import users from "../Models/user";

import bcrypt from "bcryptjs";
import  CryptoJS from "crypto-js";
const router1 = express.Router();
router1.post('/', async function (req, res) {
    await users.findOne({
        where: {
            email: req.body.email,
        },
        raw: true
    }).then(async function (users) {
        console.log(users);
        if (!users) {
            res.send('user not found');
        } else {
            console.log(users.password)
            console.log(req.body.password) 
            var bytes  = CryptoJS.AES.decrypt(req.body.password, 'secret key 123');
            var originalText = bytes.toString(CryptoJS.enc.Utf8);

            console.log(originalText);
                
            bcrypt.compare(originalText,users.password , function(err, isMatch) {
               console.log(err)
               console.log(isMatch)
                if (err){
                    res.json({message:false} );
                    
                };

                if(isMatch){

                    users.password=null
                
                    res.json({message:true,users:users});
                   console.log('correct password!')
                }else{
                    res.json({message:false} ); 
                }
                
                //callback(null, isMatch);
             });   
                
        
                
            
        }
    }).catch(error => {
       console.log(error)
    })
});
export default router1;