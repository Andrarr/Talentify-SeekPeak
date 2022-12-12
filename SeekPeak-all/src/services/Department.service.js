import { Department } from '../model/Departments.model.js';
import { ok, failure } from '../utils/ServiceRespose.util.js';

export class DepartmentService {
    static createDepartment = async (dep) => {
        if (dep) {
            await Department.create(dep);
            return ok('Department has been created!');
        } else {
            return failure('Department field is required for creating a department!', 422);
        }
    };

    static allDepartments = async () => {
        const departments = await Department.find({});
        return ok(departments);
    };

    static findById = async (id) => {
        const department = await Department.find({ id: id });
        return ok(department);
    };

    static updateById = async (id, update) => {
        await Department.findByIdAndUpdate({ _id: id }, update);
        return ok(`Department with id: ${id} has been updated!`);
    };
    static deleteById = async (id) => {
        await Department.findByIdAndRemove({ _id: id });
        return ok(`Department with id: ${id} has been deleted`);
    };
}
