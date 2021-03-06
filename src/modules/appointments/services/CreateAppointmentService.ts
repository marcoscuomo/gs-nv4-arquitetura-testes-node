import { startOfHour } from 'date-fns';
// import { getCustomRepository } from 'typeorm';
import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository'
import AppError from '@shared/erros/AppError';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {

    constructor(
        @inject('AppointmentRepository')
        private appointmentRepository: IAppointmentRepository
    ) {

    }

    public async execute({date, provider_id}: IRequestDTO): Promise<Appointment> {

        // const appointmentRepository = getCustomRepository(AppointmentRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate){
            throw new AppError('This appointment is already booked');
        }

        // Criamos o objeto, a instância
        const appointment = await this.appointmentRepository.create({provider_id, date: appointmentDate});

        return appointment;

    }
}

export default CreateAppointmentService;
