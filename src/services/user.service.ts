import { User } from '@/entities/user.entity';
import { BaseService } from './base.service';
import dataSource from '@/typeorm-connection/data-source';

class UserService extends BaseService<User> {
    async allStudent() {
        return this.repository.query("select * from users")
    }
}

const userService = new UserService(dataSource.getRepository(User));

export default userService;
