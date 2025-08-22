import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import patientRoutes from './routes/patientRoutes';
import { authenticateToken } from './middleware/authentication';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Public Routes
app.use('/', authRoutes);

// Protected Routes
app.use(authenticateToken);
app.use('/patients', patientRoutes);

// Error handler
app.use(errorHandler);

export default app;