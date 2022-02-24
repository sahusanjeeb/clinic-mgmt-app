import  mongoose  from "mongoose";
import log from './logger.js'


/* database connection */ 
const DB = 'mongodb+srv://sanjibsahuaaa:236953cc@cluster0.nglsh.mongodb.net/clinicdb?retryWrites=true&w=majority'
mongoose.connect(DB)
.then(()=>{log.info(`connected to the mongodb`);})
.catch((err)=>{log.error(err.message);})