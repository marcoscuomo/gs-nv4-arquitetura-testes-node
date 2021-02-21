import AppError from '@shared/erros/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);

        const user = await createUser.execute({
            name: 'Marcos Souza',
            email: 'marcos@gmail.com',
            password: '12233443'
        });

        expect(user).toHaveProperty('id');
    });

    it('should nor be able to create a new user with same email from another', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);

        await createUser.execute({
            name: 'Marcos Souza',
            email: 'marcos@gmail.com',
            password: '12233443'
        });

        expect(
            createUser.execute({
                name: 'Marcos Souza',
                email: 'marcos@gmail.com',
                password: '12233443'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
