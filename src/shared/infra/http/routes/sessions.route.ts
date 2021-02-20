import { Router } from 'express';

import AutenticateUserService from '../services/AutenticateUserService';

const sessionsRouter = Router();


sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const autenticateUserService = new AutenticateUserService();

    const { user, token } = await autenticateUserService.execute({
        email,
        password
    });

    // @ts-expect-error
    delete user.password;

    return response.json({ user, token });
});

export default sessionsRouter;
