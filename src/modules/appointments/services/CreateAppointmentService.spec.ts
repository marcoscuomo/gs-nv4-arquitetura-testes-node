import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentRepository);

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '2332'
        });

        expect(appointment).toHaveProperty('id');
        expect((await appointment).provider_id).toBe('2332');
    });

    // it('should not be able to create two appointments on the same time', () => {
    //     expect(1+2).toBe(3);
    // });
});
