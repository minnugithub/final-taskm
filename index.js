
import express from "express";
import router from "./routes/auth";
import router1 from "./routes/login";
import router2 from "./routes/leadertasks";
import router3 from "./routes/associatetasks";
import router4 from "./routes/taskreport";
import router5 from "./routes/taskcreation";
import mongoose  from "mongoose";
import cors from 'cors';
import router6 from "./routes/activitylogging";
const app = express();
app.use(cors({origin:'http://localhost:3000'}));
app.use(express.json());
app.use('/login',router1);
app.use('/add', router);
app.use('/associatetasks',router3 )
app.use('/leadertasks',router2);
app.use('/tasks',router4) 
app.use('/taskcreation',router5)
app.use('/activitylog',router6)
//app.use('/tasks',router2);
 //Routes // listening
mongoose.connect("mongodb://localhost:27017/userdb1",() =>{ console.log("Connected to DB"); });
 app.listen(3001);

