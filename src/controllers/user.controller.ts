import { userService } from '@/services';

export class UserController {
    async allStudent() {
        return await userService.allStudent();
    }
}
