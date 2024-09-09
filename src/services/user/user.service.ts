import { User } from '@/entities/user/user.entity';
import { BaseService } from '../base.service';
import dataSource from '@/typeorm/data-source';

class UserService extends BaseService<User> {
    async allStudent() {
        return this.findAndCount();
    }
}

const userService = new UserService(dataSource.getRepository(User));

export default userService;
