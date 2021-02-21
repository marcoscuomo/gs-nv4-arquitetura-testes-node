import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/erros/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface IRequestDTO {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {

    constructor(private usersRepository: IUserRepository){}

    public async execute({name, email, password}: IRequestDTO): Promise<User> {

        // const usersRepository = getRepository(User);

        // Verifica se o email do usuário já está cadastrado
        const checkUserExists = await this.usersRepository.findyByEmail(email);

        if(checkUserExists){
            throw new AppError('Email adress already used');
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        // await this.usersRepository.save(user);

        return user;

    }
}

export default CreateUserService;
