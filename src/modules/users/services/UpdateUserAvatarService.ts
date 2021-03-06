import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import AppError from '@shared/erros/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequestDTO {
    user_id: string;
    avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
        ){}

    public async execute({user_id, avatarFileName}: IRequestDTO): Promise<User>{
        // const userRepository = getRepository(User);

        const user = await this.usersRepository.findById(user_id);

        if(!user){
            throw new AppError('Only authenticated users can change avatar', 401);
        }

        if(user.avatar){
            await this.storageProvider.deleteFile(user.avatar);

            // const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            // const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            // if(userAvatarFileExists){
            //     await fs.promises.unlink(userAvatarFilePath);
            // }
        }

        const filename = await this.storageProvider.saveFile(avatarFileName);

        user.avatar = avatarFileName;
        // await userRepository.save(user);
        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
