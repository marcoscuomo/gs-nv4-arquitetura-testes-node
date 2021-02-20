import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';
import AppError from '../erros/AppError';

interface RequestDTO {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {

    public async execute({date, provider_id}: RequestDTO): Promise<Appointment> {

        const appointmentRepository = getCustomRepository(AppointmentRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate){
            throw new AppError('This appointment is already booked');
        }

        // Criamos o objeto, a instância
        const appointment = appointmentRepository.create({provider_id, date: appointmentDate});

        // Salvamos no banco
        await appointmentRepository.save(appointment);

        return appointment;

    }
}

export default CreateAppointmentService;
