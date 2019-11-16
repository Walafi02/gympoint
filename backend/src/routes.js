import { Router } from 'express';

import sessionController from './app/controllers/sessionController';
import studentsController from './app/controllers/studentsController';
import plansController from './app/controllers/PlansController';
import registrationController from './app/controllers/RegistrationController';
import checkinController from './app/controllers/CheckinController';
import helpOrdersController from './app/controllers/HelpOrdersController';
import helpResponseController from './app/controllers/HelpResponseController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/session', sessionController.store);

routes.post('/students/:id_student/checkins', checkinController.store);
routes.get('/students/:id_student/checkins', checkinController.index);

routes.post('/students/:id_student/help-orders', helpOrdersController.store);
routes.get('/students/:id_student/help-orders', helpOrdersController.index);

routes.use(authMiddleware);

routes.post('/help-orders/:id_help_order/answer', helpResponseController.store);

routes.get('/students/:id?', studentsController.index);
routes.post('/students', studentsController.store);
routes.put('/students/:id_student', studentsController.update);

routes.get('/plans/:id?', plansController.index);
routes.post('/plans', plansController.store);
routes.put('/plans/:id_plan', plansController.update);
routes.delete('/plans/:id_plan', plansController.delete);

routes.get('/registration/:id?', registrationController.index);
routes.post('/registration', registrationController.store);
routes.put('/registration/:id_registration', registrationController.update);
routes.delete('/registration/:id_registration', registrationController.delete);

export default routes;
