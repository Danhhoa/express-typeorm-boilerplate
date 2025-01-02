import { User } from '@/entities/user.entity';
import { BaseService } from './base.service';
import dataSource from '@/typeorm-connection/data-source';
import { snakeToCamel } from '@/utilities/converter';

class UserService extends BaseService<User> {
    async allStudent() {
        // const users: User[] = await this.repository.query("select * from user")
        const users = await this.findAndCount()
        
        return {
            ...users,
            rows: snakeToCamel(users.rows)
        }
    }
}

const userService = new UserService(dataSource.getRepository(User));

export default userService;
