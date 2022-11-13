import { Department } from "../model/departments.js";
import { DepartmentService } from "../services/departments.js";

export const createDepartments = async (req, res, next) => {
    try {
        if (req.body.department) {
            await DepartmentService.createDepartment(req.body)
            res.send({ message: `Department has been created!` })
        }
        else {
            res.status(422).send({ message: `Department field is required!` })
        }
    } catch (err) {
        next(err)
    }
}

export const allDepartments = async (req, res, next) => {
    try {
        await DepartmentService.allDepartments()
            .then((department) => {
                res.send(department)
            })
    } catch (err) {
        next(err)
    }
}

export const oneDepartment = async (req, res, next) => {
    try {
        const department = await DepartmentService.findById(req.params.depId)
        res.send({ department: department })
    } catch (e) {
        next(e)
    }
}

export const updateDepartment = async (req, res, next) => {
    try {
        await DepartmentService.updateById(req.params.depId, req.body)
        await Department.findOne({ _id: req.params.depId }).then(function (department) {
            return res.json({ message: `Department with id: ${req.params.depId} has been updated!` })
        })
    } catch (e) {
        next(e)
    }
}

export const deleteDepartment = async (req, res, next) => {
    try {
        await DepartmentService.deleteById(req.params.depId)
        res.json({ message: `Department with id: ${req.params.depId} has been deleted!` })
    } catch (e) {
        next(e)
    }
}
