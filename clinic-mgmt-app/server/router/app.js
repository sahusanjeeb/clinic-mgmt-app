import express from 'express';
import cors from 'cors';
import  mongoose  from 'mongoose';
import '../db/connection.js';
import '../models/mainModel.js'
import bodyParser from 'body-parser';

//  all collections
const Doctor = mongoose.model("doctors");
const Appointments = mongoose.model("appointments");
const PatientHistory = mongoose.model("patientHistory");
const Patients = mongoose.model("patients");
const Specialities = mongoose.model("specialities");
const TimeSlot = mongoose.model("timeSlot");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send("Hello World");
});

app.get('/doctors', (req, res) => {
  console.log("connected to doctors")
    Doctor.find({}, function (err, docs) {
            res.json(docs);     
    });
});

app.get('/appointments', (req, res) => {
  Appointments.find({}, function (err, docs) {
          res.json(docs); 
  });
});

app.get('/patientHistory', (req, res) => {
  PatientHistory.find({}, function (err, docs) {
          res.json(docs);  
  });
});

app.get('/patients', (req, res) => {
  Patients.find({}, function (err, docs) {
          res.json(docs);   
  });
});

app.get('/specialities', (req, res) => {
  Specialities.find({}, function (err, docs) {
          res.json(docs);   
  });
});

app.get('/timeSlot', (req, res) => {
  TimeSlot.find({}, function (err, docs) {
          res.json(docs);
      
  });
});

// doctor operation - search, add, update, delete
app.get('/doctors/name/:name', (req, res) => {
  const dName = req.params.name;
  Doctor.find({name:dName}, function (err, docs) {
          res.json(docs);
      
  });
});
app.get('/doctors/qualification/:qualification', (req, res) => {
  const dQualification = req.params.qualification;
  Doctor.find({qualification:dQualification}, function (err, docs) {
          res.json(docs);
  });
});

app.post('/doctors/add',(req,res) => {  
  Doctor.create(req.body,req.params.body).then((ans) => {
      console.log("New Doctor Inserted")
      res.status(200).send({msg:"Doctor added successfully"});
    }).catch((err) => {
      console.log(err.Message);
    });
});

app.post('/doctors/update/:id',(req,res) => {  
  Doctor.findByIdAndUpdate(req.params.id,req.body)
    .then((ans) => {
      console.log(" Doctor updated")
      res.status(200).send({msg:"Doctor updated successfully"});
    }).catch((err) => {
      console.log(err.Message);
    });
});

app.post('/doctors/delete/:id',(req,res) => {
  Doctor.findByIdAndDelete(req.params.id).then((ans) => {
      console.log("one doctor deleted")
      res.status(200).send({msg:"Doctor removed successfully"});
    }).catch((err) => {
      console.log(err.Message);
    });
});



export default app;