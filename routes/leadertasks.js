import express from "express";
const router2 = express.Router();
import Tasks from '../models/task'
//const Tasks= require('../models/task')
// getting all 
router2.get('/userdetails/:leader', async (req, res) => {
  try {
    const tasks = await Tasks.find({ leader: req.params.leader, taskname: req.params.taskname });
    res.json(tasks);
  } catch (err) {
    res.json({ message: err });
  }
});


router2.post('/searchleader', async (req, res) => {
  try {
    const tasks = await Tasks.find({
      $or: [{ taskname: req.body.searchparam }, { taskdescription: req.body.searchparam }, { associate: req.body.searchparam }, { status: req.body.searchparam }],
      leader: req.body.leader
    });
    res.json(tasks);
  } catch (err) {
    res.json({ message: err });
  }
});
//leader api
//total count
router2.get('/totalcount/:leader', async (req, res) => {
  try {


    const tcount = await Tasks.count({ leader: req.params.leader });
    console.log("TCOUNT", tcount)
    res.json({
      tcount
    })
  } catch (err) {
    res.json({ message: err });
  }
});
//new count
router2.get('/newcount/:leader', async (req, res) => {
  try {

    const ncount = await Tasks.count({ leader: req.params.leader, status: "New" });
    console.log("NCOUNT", ncount)
    res.send({
      ncount
    })
  } catch (err) {
    res.json({ message: err });
  }
});
//inprogress
router2.get('/inprogresscount/:leader', async (req, res) => {
  try {

    const ipcount = await Tasks.count({ leader: req.params.leader, status: "In-Progress" });
    console.log("IPCOUNT", ipcount)
    res.send({
      ipcount
    })
  } catch (err) {
    res.json({ message: err });
  }
});
//completed {name: {$in: ["Amit", "Suman"]}}
router2.get('/completedcount/:leader', async (req, res) => {
  try {

    const ccount = await Tasks.count({ leader: req.params.leader, status: {$in: ["Completed","Done"]} });
    console.log("CCOUNT", ccount)
    res.send({
      ccount
    })
  } catch (err) {
    res.json({ message: err });
  }
});


export default router2;
