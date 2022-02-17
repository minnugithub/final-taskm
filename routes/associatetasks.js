import express from "express";
const router3= express.Router();
import Tasks from '../models/task' 

router3.post('/searchassociate', async(req,res) =>{ 
  try{ 
    const tasks = await Tasks.find({
      $or:[{taskname:req.body.searchparam},{taskdescription:req.body.searchparam},{leader:req.body.searchparam},{status:req.body.searchparam}],
      associate:req.body.associate
    });
     
     res.json(tasks);
   }catch (err)
   { res.json({message:err}); 
   } 
 });

     

      router3.get('/userdetails/:associate', async(req,res) =>{ 
        try{ 
          const tasks = await Tasks.find({associate:req.params.associate});
           res.json(tasks);
         }catch (err)
         { res.json({message:err}); 
         } 
       });
     
      router3.get('/totalcount/:associate', async(req,res) =>{ 
        try{ 
         
          const tcount = await Tasks.count({associate:req.params.associate});
          console.log("TCOUNT", tcount)
              res.send({
                tcount
              })
         }catch (err)
         { res.json({message:err}); 
         } 
       });
   //new count
   router3.get('/newcount/:associate', async(req,res) =>{ 
    try{ 
     
      const ncount = await Tasks.count({associate:req.params.associate,status:"New"});
      console.log("NCOUNT", ncount)
          res.send({
            ncount
          })
     }catch (err)
     { res.json({message:err}); 
     } 
   });
   //inprogress
   router3.get('/inprogresscount/:associate', async(req,res) =>{ 
    try{ 
     
      const ipcount = await Tasks.count({associate:req.params.associate,status:"In-Progress"});
      console.log("IPCOUNT", ipcount)
          res.send({
            ipcount
          })
     }catch (err)
     { res.json({message:err}); 
     } 
   });
   //completed
   router3.get('/completedcount/:associate', async(req,res) =>{ 
    try{ 
     
      const ccount = await Tasks.count({associate:req.params.associate,status:"Completed"});
      console.log("CCOUNT", ccount)
          res.send({
            ccount
          })
     }catch (err)
     { res.json({message:err}); 
     } 
   });

 
export default router3;