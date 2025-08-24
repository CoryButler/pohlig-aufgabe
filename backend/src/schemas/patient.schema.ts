import * as yup from 'yup';

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