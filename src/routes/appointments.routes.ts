import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateRepositoryService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);
appointmentRouter.get('/', async (request, response) => {
  const appointmentRepositories = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepositories.find();
  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;
    const parseDate = parseISO(date);
    const createAppointment = new CreateRepositoryService();

    const appointment = await createAppointment.execute({
      provider_id,
      date: parseDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default appointmentRouter;
