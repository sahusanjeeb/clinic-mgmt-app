import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import  mongoose  from 'mongoose';
import '../config/connection.js';
import '../models/mainModel.js'
import bodyParser from 'body-parser';
import log from '../config/logger.js';


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
  res.send("Welcome to the CLINIC MANAGEMENT SYSTEM");
});

/* GET all the doctor data */
app.get('/doctors', (req, res) => {
  console.log("connected to doctors")
    Doctor.find({}, function (err, docs) {
            res.json(docs);
            log.info("searched for all the doctor");     
    });
});

/* GET doctors data by name */
app.get('/doctors/name/:name', (req, res) => {
  const dName = req.params.name;
  Doctor.find({name:dName}, function (err, docs) {
          res.json(docs);
          log.info("searched  the doctor by name");
  });
});

/* GET doctors data by speciality */
app.get('/doctors/search/speciality/:speciality', (req, res,) => {
  const dSpeciality = req.params.speciality;
  Doctors.find({speciality:dSpeciality}, function (err, docs) {
          res.json(docs);
          log.info(`searched the doctors by its speciality`);  
  });
});

/* add a new doctors in database */
app.post('/doctors/add',(req,res) => {  
  Doctor.create(req.body,req.params.body).then((ans) => {
      console.log("New Doctor Inserted");
      log.info("Inserted new doctor");
      res.status(200).send({msg:"Doctor added successfully"});
    }).catch((err) => {
      console.log(err.Message);
    });
});

/* update doctors data by id */
app.post('/doctors/update/:id',(req,res) => {  
  Doctor.findByIdAndUpdate(req.params.id,req.body)
    .then((ans) => {
      console.log(" Doctor updated");
      log.info("Update the doctor information");
      res.status(200).send({msg:"Doctor updated successfully"});
    }).catch((err) => {
      console.log(err.Message);
    });
});

/* delete doctors data by id */
app.post('/doctors/delete/:id',(req,res) => {
  Doctor.findByIdAndDelete(req.params.id).then((ans) => {
      console.log("one doctor deleted");
      log.info("One doctor deleted by name");
      res.status(200).send({msg:"Doctor removed successfully"});
    }).catch((err) => {
      console.log(err.Message);
    });
});



export default app;