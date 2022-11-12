import { User } from "../model/users.js";

export class UserService {
    
    static findUserById = async (id) => {
        return await User.findOne({ _id: id });
    }
    static updateUserRole = async (role) => {
        return await User.updateOne({ role: role })
    }
}
