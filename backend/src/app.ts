import express from 'express';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/patients', patientRoutes);

// Error handler
app.use(errorHandler);

export default app;