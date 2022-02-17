import mongoose from "mongoose";  
const Logschema= mongoose.Schema({ 
      action:{  
         type:String  
      },  
      createdby:{       
         type:String   
      },
      time:{
         type:Date
      }
}, {timestamp: true})

const Log = mongoose.model('Activitylog',Logschema)
export default Log;