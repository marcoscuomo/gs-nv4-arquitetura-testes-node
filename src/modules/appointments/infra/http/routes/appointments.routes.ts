import { Router } from 'express';
import { parseISO } from 'date-fns';
// import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();


appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//     // const appointmentRepository = getCustomRepository(AppointmentRepository);
//     const appointments = await appointmentRepository.find();

//     return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
    const appointmentRepository = new AppointmentRepository();
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(appointmentRepository);

    const appointment = await createAppointmentService.execute({date: parseDate, provider_id});

    return response.json(appointment);
});

export default appointmentsRouter;
