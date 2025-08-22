import { Router } from 'express';
import {
    createPatient,
    readPatients,
    readPatientById,
    updatePatient,
    deletePatient,
} from '../controllers/patientController';

const router = Router();

router.route('/').get(readPatients)
    .post(createPatient);

router.route('/:id')
    .get(readPatientById)
    .put(updatePatient)
    .delete(deletePatient);

export default router;