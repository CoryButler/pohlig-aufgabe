import * as yup from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     patient:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 7804
 *         firstName:
 *           type: string
 *           example: Robert
 *         lastName:
 *           type: string
 *           example: Paulson
 *         birthdate:
 *           type: string
 *           format: date
 *           example: 1986-11-27
 *         sex:
 *           type: string
 *           example: m
 *         phone:
 *           type: string
 *           example: 555-1234
 *         email:
 *           type: string
 *           example: robert.paulson@example.com
 *         address:
 *           type: string
 *           example: 123 Main St
 *         city:
 *           type: string
 *           example: New York
 *         state:
 *           type: string
 *           example: NY
 *         zip:
 *           type: string
 *           example: 10001
 *         country:
 *           type: string
 *           example: USA
 *         insurance:
 *           type: string
 *           example: Aetna
 *         pharmacy:
 *           type: string
 *           example: CVS
 */
export const patientSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  birthdate: yup.string().required('Birthdate is required'),
  sex: yup.string().required('Sex is required'),
  phone: yup.string().optional(),
  email: yup.string().optional(),
  address: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
  zip: yup.string().optional(),
  country: yup.string().optional(),
  insurance: yup.string().optional(),
  pharmacy: yup.string().optional()
});