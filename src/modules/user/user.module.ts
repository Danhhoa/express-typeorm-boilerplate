import { UserController } from "./user.controller";

class UserModule {
    protected controller: UserController
    constructor() {
        this.controller = new UserController()
    }
}

export default UserModule