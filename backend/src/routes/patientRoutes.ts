import { Router } from 'express';
import {
    createPatient,
    readPatients,
    readPatientById,
    updatePatient,
    deletePatient,
} from '../controllers/patientController';
import { patientSchema } from '../schemas/patient.schema';
import { validate } from '../middleware/validate';

const router = Router();

/**
 * @openapi
 * /patients:
 *   get:
 *     tags:
 *       - Patients
 *     summary: Retrieve a list of patients
 *     description: Returns all patients in the system.
 *     responses:
 *       200:
 *         description: A list of patients.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/patient'
 *   post:
 *     tags:
 *       - Patients
 *     summary: Create a new patient
 *     description: Adds a new patient to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/patient'
 *     responses:
 *       201:
 *         description: Patient created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/patient'
 *
 */
router.route('/').get(readPatients)
    .post(validate(patientSchema), createPatient);

/**
 * @openapi
 * /patients/{id}:
 *   get:
 *     tags:
 *       - Patients
 *     summary: Get a patient by ID
 *     description: Returns a single patient by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Patient found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/patient'
 *       404:
 *         description: Patient not found.
 *   put:
 *     tags:
 *       - Patients
 *     summary: Update a patient by ID
 *     description: Updates an existing patient by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/patient'
 *     responses:
 *       200:
 *         description: Patient updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/patient'
 *       404:
 *         description: Patient not found.
 *   delete:
 *     tags:
 *       - Patients
 *     summary: Delete a patient by ID
 *     description: Deletes a patient by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Patient deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/patient'
 *       404:
 *         description: Patient not found.
 */
router.route('/:id')
    .get(readPatientById)
    .put(validate(patientSchema), updatePatient)
    .delete(deletePatient);

export default router;