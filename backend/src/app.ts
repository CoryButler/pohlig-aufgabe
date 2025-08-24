import express from 'express';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes';
import { setupSwagger } from './utils/swagger';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Swagger Documentation
setupSwagger(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/patients', patientRoutes);

// Error handler
app.use(errorHandler);

export default app;