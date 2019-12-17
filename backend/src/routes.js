import { Router } from 'express';

import sessionController from './app/controllers/sessionController';
import studentSessionController from './app/controllers/studentSessionController';
import studentsController from './app/controllers/studentsController';
import plansController from './app/controllers/PlansController';
import registrationController from './app/controllers/RegistrationController';
import checkinController from './app/controllers/CheckinController';
import helpOrdersController from './app/controllers/HelpOrdersController';
import helpResponseController from './app/controllers/HelpResponseController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/session', sessionController.store);

// rotas do aluno
routes.post('/session/students', studentSessionController.store);
routes.post('/students/:student_id/help-orders', helpOrdersController.store);
routes.get('/students/:student_id/help-orders', helpOrdersController.index);

routes.get('/students/:student_id/checkins', checkinController.index);
routes.post('/students/:student_id/checkins', checkinController.store);

routes.use(authMiddleware);

// rotas do admin
routes.get('/students/help-orders', helpResponseController.index);
routes.post('/help-orders/:id_help_order/answer', helpResponseController.store);

routes.get('/students/:id?', studentsController.index);
routes.post('/students', studentsController.store);
routes.put('/students/:id_student', studentsController.update);
routes.delete('/students/:id', studentsController.delete);

routes.get('/plans/:id?', plansController.index);
routes.post('/plans', plansController.store);
routes.put('/plans/:id_plan', plansController.update);
routes.delete('/plans/:id_plan', plansController.delete);

routes.get('/registration/:id?', registrationController.index);
routes.post('/registration', registrationController.store);
routes.put('/registration/:id_registration', registrationController.update);
routes.delete('/registration/:id_registration', registrationController.delete);

export default routes;
