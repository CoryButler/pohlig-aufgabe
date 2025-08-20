import { Request, Response, NextFunction } from 'express';
import { patients, Patient } from '../models/patient';

const msg_patient_not_found: string = 'Patient not found';

// Create an patient
export const createPatient = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { birthdate, firstName, lastName, sex } = req.body;
    const newPatient: Patient = { id: Date.now(), birthdate: birthdate, firstName: firstName, lastName: lastName, sex: sex };
    patients.push(newPatient);
    res.status(201).json(newPatient);
  }
  catch (error) {
    next(error);
  }
};

// Read all patients
export const getPatients = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(patients);
  }
  catch (error) {
    next(error);
  }
};

// Read single patient
export const getPatientById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const patient = patients.find((i) => i.id === id);
    if (!patient) {
      res.status(404).json({ message: msg_patient_not_found });
      return;
    }
    res.json(patient);
  }
  catch (error) {
    next(error);
  }
};

// Update an patient
export const updatePatient = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { birthdate, firstName, lastName, sex } = req.body;
    const patientIndex = patients.findIndex((i) => i.id === id);
    if (patientIndex === -1) {
      res.status(404).json({ message: msg_patient_not_found });
      return;
    }
    patients[patientIndex].birthdate = birthdate;
    patients[patientIndex].firstName = firstName;
    patients[patientIndex].lastName = lastName;
    patients[patientIndex].sex = sex;
    res.json(patients[patientIndex]);
  }
  catch (error) {
    next(error);
  }
};

// Delete an patient
export const deletePatient = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const patientIndex = patients.findIndex((i) => i.id === id);
    if (patientIndex === -1) {
      res.status(404).json({ message: msg_patient_not_found });
      return;
    }
    const deletedPatient = patients.splice(patientIndex, 1)[0];
    res.json(deletedPatient);
  }
  catch (error) {
    next(error);
  }
};