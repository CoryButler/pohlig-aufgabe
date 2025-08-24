import { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const options: swaggerJSDoc.Options = {
    apis: ['./src/routes/*.ts', './src/models/*.ts'],
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Patient Management API',
            version,
            description: 'A simple Express Patient Management API application documented with Swagger',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
    }
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express): void {
    // Serve Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Serve Swagger JSON
    app.get('/api-docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}