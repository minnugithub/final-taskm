import express  from "express";
import Log  from "../models/activitylog";
const router6 = express.Router();

router6.post('/logging', function (req,res){
  
  const log = new Log({
    action:req.body.action,
    createdby:req.body.createdby,
    time:new Date()
    
  })

log.save().then(response =>{
  console.log(response)
  if(response){
  res.send({message:"stored successfully"})
  }
}).catch((err)=>{
  res.send({message:"Error occured"})
})
})
export default router6;