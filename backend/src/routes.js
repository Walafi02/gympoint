import { Router } from 'express';

import sessionController from './app/controllers/sessionController';

const routes = new Router();

routes.post('/session', sessionController.store);

export default routes;
