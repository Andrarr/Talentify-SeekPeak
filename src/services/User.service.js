import { User } from '../model/Users.model.js';
import { ok, failure } from '../utils/ServiceRespose.util.js';

export class UserService {
    static findUserById = async (id) => {
        return await User.findOne({ _id: id });
    };
    static updateUserRole = async (req) => {
        if (!req.body.role || !req.body.name) {
            return failure(`Name of user & update role must be provided`, 401);
        }
        if (req.params.id && req.body.role && req.body.name) {
            const { id } = req.params;

            const user = await UserService.findUserById(id);

            if (!user) {
                return failure('No user found!', 404);
            }
            if (req.body.name != user.name) {
                return failure('Name and id of user do not match to an existing user!', 401);
            } else {
                await User.updateOne({ role: req.body.role });
                return ok(`${user.name}'s role has been updated to '${req.body.role}'!`);
            }
        }
    };

    static createAdmin = async (req) => {
        const salt = await bcrypt.genSalt();
        const { email, name, surname, birthday, country, gender, password, department, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, salt);

        const adminRegistered = {
            email: email,
            name: name,
            surname: surname,
            birthday: birthday,
            country: country,
            gender: gender,
            password: hashedPassword,
            department: department,
            role: role,
        };

        await User.create(adminRegistered);

        return ok('A team-leader has been created');
    };
}
