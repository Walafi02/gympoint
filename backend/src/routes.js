import { Router } from 'express';

import sessionController from './app/controllers/sessionController';
import studentsController from './app/controllers/studentsController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/session', sessionController.store);

routes.use(authMiddleware);

routes.post('/students', studentsController.store);
routes.put('/students/:id_student', studentsController.update);

export default routes;
