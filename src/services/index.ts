import { User } from '@/entities/user/user.entity';
import AppDataSource from '@/typeorm/data-source';
import { UserService } from './user/user.service';

// USER
const userRepo = AppDataSource.getRepository(User);
const userService = new UserService(userRepo);

export { userService };
