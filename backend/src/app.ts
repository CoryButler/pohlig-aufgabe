import express from 'express';
import patientRoutes from './routes/patientRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('get the index file');
})

app.use('/patients', patientRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;