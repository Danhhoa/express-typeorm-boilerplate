import { userService } from '@/services';
import { BaseController } from './base.controller';

export class UserController extends BaseController<typeof userService> {
    constructor() {
        super(userService);
    }
    async allStudent() {
        return this.service.allStudent();
    }
}
