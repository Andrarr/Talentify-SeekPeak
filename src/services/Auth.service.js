import { User } from '../model/Users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { failure, ok } from '../utils/ServiceRespose.util.js';

const createAccessToken = (id) => {
    return jwt.sign({ id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: '1d',
    });
};

export class AuthService {
    static signIn = async (email, password) => {
        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return failure('You are not registered', 403);
        }
        if (!email || !password) {
            return failure(`Email and Password are required!`, 401);
        }
        if (await bcrypt.compare(password, foundUser.password)) {
            const token = createAccessToken(foundUser._id);
            return ok({ token });
        }
    };

    static signUp = async (req) => {
        try {
            const salt = await bcrypt.genSalt();

            const { email, name, surname, birthday, country, gender, password, department } = req.body;

            const hashedPassword = await bcrypt.hash(password, salt);

            const userRegistered = {
                email: email,
                name: name,
                surname: surname,
                birthday: birthday,
                country: country,
                gender: gender,
                password: hashedPassword,
                department: department,
            };

            const user = await User.create(userRegistered);
            const token = createAccessToken(user._id);

            return ok({ token });
        } catch (err) {
            return failure();
        }
    };
    static logOut = async (id) => {
        jwt.sign({ id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1' });
        return ok('Logged out successfully');
    };
}
