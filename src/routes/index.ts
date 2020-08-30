import { Router } from 'express';
import appointmentRoutes from './appointments.routes'
const routes = Router();


routes.get('/', (request, response) =>
  response.json({ message: 'hello world' }),
);
routes.use('/appointments',appointmentRoutes)
export default routes;
