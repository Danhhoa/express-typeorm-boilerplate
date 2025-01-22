import { User } from '@/modules/user/user.entity';
import { BaseService } from '@/shared/base/base.service';
import dataSource from '@/typeorm-connection/data-source';
import { snakeToCamel } from '@/shared/utilities/converter';
import { Like } from 'typeorm';

class UserService extends BaseService<User> {
    async allStudent() {
        // const users: User[] = await this.repository.query("select * from user")
        const users = await this.repository.findOneBy({
            email: Like(''),
        });

        return {
            ...users,
            rows: snakeToCamel(users.rows),
        };
    }
}

const userService = new UserService(dataSource.getRepository(User));

export default userService;
