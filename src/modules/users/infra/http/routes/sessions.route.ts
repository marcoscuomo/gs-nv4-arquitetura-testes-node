import { Router } from 'express';

import AutenticateUserService from '@modules/users/services/AutenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const usersRepository = new UsersRepository();
    const { email, password } = request.body;

    const autenticateUserService = new AutenticateUserService(usersRepository);

    const { user, token } = await autenticateUserService.execute({
        email,
        password
    });

    // @ts-expect-error
    delete user.password;

    return response.json({ user, token });
});

export default sessionsRouter;
