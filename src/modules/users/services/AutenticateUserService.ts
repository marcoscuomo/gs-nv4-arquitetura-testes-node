import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/erros/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface IRequestDTO {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class AutenticateUserService {

    constructor(private usersRepository: IUserRepository){}

    public async execute({email, password}: IRequestDTO): Promise<IResponse>{
        // const usersRepository = getRepository(User);

        const user = await this.usersRepository.findyByEmail(email)

        if(!user){
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });

        return {user, token};
    }
}

export default AutenticateUserService;
