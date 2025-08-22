import { Request, Response, NextFunction } from 'express';
import { initPrimaryKey, patients, type Patient } from '../models/patient';
import { stati } from '../config/config';

/*********************/
/* Private variables */
/*********************/

let _primaryKey: number = initPrimaryKey;
const _msg_id_required: string = 'Patient ID is required';
const _msg_missing_field: string = 'Missing required field(s): ';
const _msg_not_found: string = 'Patient not found';

/*********************/
/* Private functions */
/*********************/

/**
 * Build a Patient object from request body
 * 
 * @param {Request} req The request object
 * @returns {Patient} Patient object populated from req.body
 */
function buildPatientFromRequest(req: Request): Patient {
    const { id, birthdate, firstName, lastName, sex, phone, email, address, city, state, zip, country, insurance, pharmacy } = req.body;
    return { id, birthdate, firstName, lastName, sex, phone, email, address, city, state, zip, country, insurance, pharmacy } as Patient;
}

/**
 * Validate the required fields in the request body.
 * 
 * @param req The request object.
 * @param res The response object.
 * @returns True if all required fields are present, otherwise false.
 */
function validFields(req: Request, res: Response): boolean {
    const { birthdate, firstName, lastName, sex } = req.body;
    const missingFields: Array<string> = [];

    if (!birthdate) missingFields.push('birthdate');
    if (!firstName) missingFields.push('firstName');
    if (!lastName) missingFields.push('lastName');
    if (!sex) missingFields.push('sex');

    const isInvalidFields: boolean = missingFields.length > 0;

    if (isInvalidFields) {
        res.status(stati.UNPROCESSABLE_ENTITY).json({
        message: `${_msg_missing_field}${missingFields.join(', ')}`
        });
    }

    return !isInvalidFields;
}

/**
 * Validate the required parameters in the request.
 * 
 * @param req The request object.
 * @param res The response object.
 * @returns True if all required parameters are present, otherwise false.
 */
function validParams(req: Request, res: Response): boolean {
    const isInvalidParams: boolean = !req.params || !req.params.id;

    if (isInvalidParams) {
        res.status(stati.BAD_REQUEST).json({ message: _msg_id_required });
    }

    return !isInvalidParams;
}

/**
 * Validate the patient ID.
 * 
 * @param id The patient ID.
 * @param res The response object.
 * @returns True if the ID is valid, otherwise false.
 */
function validId(id: number, res: Response): boolean {
    const isValidId = patients.some(p => p.id === id);

    if (!isValidId) {
        res.status(stati.NOT_FOUND).json({ message: _msg_not_found });
    }

    return isValidId;
}

/********************/
/* Public functions */
/********************/

// Create a patient
export const createPatient = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // Check for missing fields
        if (!validFields(req, res)) return;

        // Build patient object with next available id
        const patient: Patient = { ...buildPatientFromRequest(req), id: _primaryKey++ };

        patients.push(patient);

        // Respond with the created patient
        res.status(stati.CREATED).json(patient);
    }
    catch (error) {
        next(error);
    }
};

// Read all patients
export const readPatients = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // Respond with all patients
        res.status(stati.OK).json(patients);
    }
    catch (error) {
        next(error);
    }
};

// Read single patient
export const readPatientById = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // Check for missing params
        if (!validParams(req, res)) return;

        const id = parseInt(req.params.id, 10);

        // Check if patient exists
        if (!validId(id, res)) return;

        // Respond with the requested patient
        res.status(stati.OK).json(patients.find(p => p.id === id));
    }
    catch (error) {
        next(error);
    }
};

// Update a patient
export const updatePatient = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // Check for missing params
        if (!validParams(req, res)) return;

        // Check for missing fields
        if (!validFields(req, res)) return;

        const id: number = parseInt(req.params.id, 10);

        // Check if patient exists
        if (!validId(id, res)) return;

        let patient: Patient = patients.find(p => p.id === id);

        // Build patient object with next available id
        patient = { ...buildPatientFromRequest(req), id: _primaryKey++ };

        // Respond with the updated patient
        res.status(stati.OK).json(patient);
    }
    catch (error) {
        next(error);
    }
};

// Delete a patient
export const deletePatient = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // Check for missing params
        if (!validParams(req, res)) return;

        const id: number = parseInt(req.params.id, 10);

        // Check if patient exists
        if (!validId(id, res)) return;

        const index: number = patients.findIndex(p => p.id === id);
        const patient: Patient = patients.splice(index, 1)[0];

        // Respond with the deleted patient
        res.status(stati.OK).json(patient);
    }
    catch (error) {
        next(error);
    }
};