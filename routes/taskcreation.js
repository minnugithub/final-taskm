
import {uploadFiles, getListFiles, download} from '../controllers/upload';
// const uploadController = require("../controllers/upload");
import express, { response } from "express";
import Tasks from '../models/task'
import Nodemailer from 'nodemailer'
import users from '../models/user'
import Log from "../models/activitylog";
// const Tasks= require('../models/task')

const router5 = express.Router();

function logging(action, createdby) {
  const log = new Log({action,createdby})
  log.save().then(response=>
    {console.log(response)})
}
//email
export const createmail= (to,cc,subject,text)=> {
let transporter=Nodemailer.createTransport({
  service:'gmail',
  host:'smtp.gmail.com',
  auth:{
    user:"tmail7034@gmail.com",
    pass:"tmail123"
  }
})
var message = {
  from:"tmail7034@gmail.com",
  to,
  cc,
  subject,
  text
};

transporter.sendMail(message,(err,info)=>{
  if(err)
  {
    logging("email not sent to "+ message.to ,message.from )
    console.log("error in sending mail",err)
    return response.status(400).json({
      message:`error in sending mail ${err}`
    })
  }
  else{
    logging("email sent to"+ message.to,message.from )
    console.log("sucessfully send the mail",info)
  }
  return res.json({
    message:info
  })
})
}

// getting all

router5.get('/', async (req, res) => {
    try {
    const tasks = await Tasks.find();
    res.json(tasks);
    } catch (err) {
    res.json({ message: err });
   }
  });

router5.get("/:taskid", async (req, res) => {
   try {
     const task = await Tasks.findOne({ taskid: req.params.taskid })
      ;
     res.json(task);
   } catch (err) {
     res.json({ message: err });
   }

});

router5.post('/create', async (req, res) => {
  console.log(req.body);
  const task = new Tasks({

    taskname: req.body.data.taskname,

    taskid: req.body.data.taskid,

    taskdescription: req.body.data.description,

    files: req.body.data.file ? req.body.data.file : "",

    leader: req.body.data.leader ? req.body.data.leader : "",

    associate: req.body.data.associate ? req.body.data.associate : "",

    status: req.body.data.status,

    approval: req.body.approval ? req.body.approval : ""



  });
  console.log(task);
  const Email = await users.findOne({
    where:{uid:task.associate}
  })
  console.log(Email.email)
  
  task.save()
  .then(() =>{
    
   const to=Email.email
   const cc=""
   const subject="Regarding Task"
   const text= "A new task in " + task.taskname + " is assigned to you"
    createmail(to,cc,subject,text)
  }
  )
  .then(data => { res.json(data); }).catch(err => { res.json({ message: err }); })
});


router5.patch("/:taskid", async (req, res) => {
  try {

    const task = await Tasks.findOne({ taskid: req.params.taskid });

    const user = await users.findOne({where:{uid:task.associate}})
    const leader = await users.findOne({where:{uid:user.addedby}})
    console.log("task", task)
    console.log("user", user)
    console.log("leader", leader)
   
    if (req.body.status) {
      task.status = req.body.status;
    }
    await task.save((err) => {

   const to=leader.email
   const cc=user.email
   const subject="Regarding Status change of task"
   const text= user.name + "has updated status as" + task.status
   console.log("rstyukhl")
    createmail(to,cc,subject,text)

       if (err) { console.log("err", err) } });

    res.json(task);

  } catch (err) {

    res.json({ message: err });

  }

});

//Getting TaskID
router5.get("/:taskid", async (req, res) => {

  try {

    const task = await Taskss.find({ taskid: req.params.taskid })

      ;

    res.json(task);

  } catch (err) {

    res.json({ message: err });

  }

});

//});

  router5.post("/upload", uploadFiles);
  router5.get("/files", getListFiles);
  router5.get("/files/:name", download);



export default router5;
