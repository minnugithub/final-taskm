import express from "express";
const router4= express.Router();
import Tasks from '../models/task'  
// const Tasks= require('../models/task')
 
 // getting all 
  router4.get('/', async(req,res) =>{ 
    try{ 
      console.log("hit")
      const tasks = await Tasks.find();
       res.json(tasks);
       
     }catch (err)
     { res.json({message:err}); 
     } 
   });

 // getting w r t associate uid
 
 router4.get("/:associate", async (req, res) => {
  try {
    const task = await Tasks.find({associate:req.params.associate})
    ;
    res.json(task);
  } catch (err) {
    res.json({ message: err });
  }
});

 // getting task  w r t leader uid
 
 router4.get("/leader/:leader", async (req, res) => {
  try {
    const task = await Tasks.find({leader:req.params.leader})
    ;
    res.json(task);
  } catch (err) {
    res.json({ message: err });
  }
});


 

 // creating task

 router4.post('/',(req,res)=>{ 
     const task = new Tasks({
                taskname:req.body.taskname,
                taskid:req.body.taskid,
                taskdescription:req.body.taskdescription,
                files:req.body.files,
                leader:req.body.leader,
                associate:req.body.associate,
                status:req.body.status,
                approval:req.body.approval

                  });
                   task.save(). then(data =>{ res.json(data); }).catch (err=>{ res.json({message:err}); }) }); 

 // deleting task

 router4.delete('/:taskid', async(req,res) =>{ 
   try{
      const removepost = await Tasks.deleteOne({taskid: req.params.taskid});
       res.json(removepost); }
       catch(err){ res.json({message:err});
       }
       } ); 

       router4.delete('/associate/:associate', async(req,res) =>{ 
        try{
           const removepost = await Tasks.deleteMany({associate: req.params.associate});
            res.json(removepost); }
            catch(err){ res.json({message:err});
            }
            } ); 
      


//updating a user by id

    router4.patch("/taskid/:taskid", async (req, res) => {
    try {
      const task= await Tasks.findOne({ taskid: req.params.taskid });
      console.log("user done",task)
    
      if (req.body.taskname) {
        task.taskname= req.body.taskname;
      }
      if (req.body.taskdescription) {
        task.taskdescription= req.body.taskdescription;
      }
      if (req.body.approval) {
        task.approval= req.body.approval;
      }
      if (req.body.status) {
        task.status= req.body.status;
      }
      console.log(task)
      await task.save((err)=>{if(err){console.log("err",err)}});
      res.json(task);
     
    } catch (err) {
      res.json({ message: err });
    }
  });
  

 export default router4;