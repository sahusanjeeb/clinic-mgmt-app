import express from 'express';
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
app.get('/doctors/search', (req, res) => {
    Doctor.find({}, function (err, docs) {
            res.json(docs);
            log.info("searched for all the doctor");     
    });
});

/* GET doctors data by name */
app.get('/doctors/search/name/:name', (req, res) => {
  log.info(`obtain request for searching a doctor by its name ${req.params.name}`)
  const dName = req.params.name;
  Doctor.find({name:dName}, function (err, docs) {
          res.json(docs);
  });
});

/* GET doctors data by speciality */
app.get('/doctors/search/speciality/:speciality', (req, res,) => {
  log.info(`obtain request for searching a doctor by its name ${req.params.name}`)
  const dSpeciality = req.params.speciality;
  Doctor.find({speciality:dSpeciality}, function (err, docs) {
          res.json(docs);
  });
});

/* add a new doctors in database */
app.post('/doctors/add',(req,res) => {  
  log.info(`obtain request for adding a doctor ${req.body.name}`)
  Doctor.create(req.body).then((doc) => {
      res.status(200).send({msg:"Doctor added successfully"});
      log.info(`a new doctor is added to the database with ID ${doc._id}`) 
    }).catch((err) => {
      log.error(err);
    });
});

/* EDIT doctors data by id */
app.post('/doctors/edit/:id',(req,res) => {  
  log.info(`obtain request for deleting a doctor by its ID ${req.body}`)
  Doctor.findByIdAndUpdate(req.params.id,req.body)
    .then((doc) => {
      log.info("Update the doctor information");
      res.status(200).send({msg:"Doctor updated successfully"});
      log.info(`one doctor info is updated to the database with ID ${doc._id}`) 
    }).catch((err) => {
      log.error(err);
    });
});

/* delete doctors data by doctor number */
app.get('/doctors/delete/:doctorNumber', (req, res,) => {
  log.info(`obtain request for deleting a doctor ${req.params.doctorNumber}`)
  Doctor.deleteOne({doctorNumber:req.params.doctorNumber}).then((ans) => {
    log.info("one doctor deleted")
    res.status(200).send({msg:"Doctor removed successfully"});
    log.info(`doctor deleted by its name`)
  }).catch((err) => {
    console.log(err.Message);
    res.status(400).send({msg:"Doctor doesn't exist to remove"});
  
  });
});

/* delete doctors data by id */
// app.post('/doctors/delete/:id',(req,res) => {
//   log.info(`obtain request for deleting a doctor by its ID ${req.params.id}`)
//   Doctor.findByIdAndDelete(req.params.id).then((doc) => {
//     log.info(`one doctor is deleted to the database with ID ${doc._id}`) 
//       log.info("One doctor deleted by id");
//       res.status(200).send({msg:"Doctor removed successfully"});
//     }).catch((err) => {
//       res.status(400).send({msg:"Doctor with the id doesn't exist"});
//     });
// });



export default app;