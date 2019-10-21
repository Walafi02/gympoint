import { Router } from 'express';

import sessionController from './app/controllers/sessionController';
import studentsController from './app/controllers/studentsController';
import plansController from './app/controllers/PlansController';
import registrationController from './app/controllers/RegistrationController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/session', sessionController.store);

routes.use(authMiddleware);

routes.post('/students', studentsController.store);
routes.put('/students/:id_student', studentsController.update);

routes.get('/plans', plansController.index);
routes.post('/plans', plansController.store);
routes.put('/plans/:id_plan', plansController.update);
routes.delete('/plans/:id_plan', plansController.delete);

routes.get('/registration', registrationController.index);
routes.post('/registration', registrationController.store);
routes.put('/registration/:id_registration', registrationController.update);
routes.delete('/registration/:id_registration', registrationController.delete);

export default routes;
