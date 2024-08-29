import { User } from '@/entities/user/user.entity';
import { BaseService } from '../base.service';

export class UserService extends BaseService<User> {
    async allStudent() {
        return this.findAndCount();
    }
}
