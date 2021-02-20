import { Router } from 'express';

import AutenticateUserService from '@modules/users/services/AutenticateUserService';

const sessionsRouter = Router();


sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const autenticateUserService = new AutenticateUserService();

    const { user, token } = await autenticateUserService.execute({
        email,
        password
    });

    delete user.password;

    return response.json({ user, token });
});

export default sessionsRouter;
