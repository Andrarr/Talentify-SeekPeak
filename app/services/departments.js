import { Department } from "../model/departments.js"

export class DepartmentService {

    static createDepartment = async (dep) => {
        return await Department.create(dep)
    }

    static allDepartments = async () => {
        return await Department.find({})
    }

    static findById = async (id) => {
        return await Department.find({ id: id })
    }

    static updateById = async (id, update) => {
        return await Department.findByIdAndUpdate({ _id: id }, update)
    }
    static deleteById = async (id) => {
        return await Department.findByIdAndRemove({ _id: id })
    }
}
