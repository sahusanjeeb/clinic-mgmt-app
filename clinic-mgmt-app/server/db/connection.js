import  mongoose  from "mongoose";

/* database connection */ 

const DB = 'mongodb+srv://sanjibsahuaaa:236953cc@cluster0.nglsh.mongodb.net/clinicdb?retryWrites=true&w=majority'
mongoose.connect(DB)
.then(()=>{console.log("connection successful");})
.catch((err)=>{console.log("no conection");})