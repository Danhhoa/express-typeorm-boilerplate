import { BaseController } from '@/shared/base/base.controller';
import userService from './user.service';

export class UserController extends BaseController<typeof userService> {
    constructor() {
        super(userService);
    }
    async allStudent() {
        return this.service.allStudent();
    }
}
