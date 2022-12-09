import { Applicant } from "../model/applicants.js";
import { ObjectId } from "mongodb";
import { Event } from "../events/events.js";
import { approved } from "../events/approvedApplication.event.js";
import { notApproved } from "../events/approvedApplication.event.js";
import { User } from "../model/users.js";
// import { applicantValidation } from "../validation/validation.js";

//remove static methods, leave just methods and initialize object

export class ApplicantService {
    static findByEmail = async (email) => {
        return await Applicant.findOne({ email: email })
    }

    static findById = async (id) => {
        let thisApplicant = await Applicant.findOne({ userId: id })
        return thisApplicant
    }

    static findAll = async () => {
        return await Applicant.find({})
    }

    static findByEmailAndPopulateByUser = async (email, department) => {
        return await Applicant.find({ email }).populate('userId').then(function (applicants) {
            let result = []

            if (department) {

                const filteredArray = applicants.filter(x => x.userId.department === department);
                result = filteredArray;

            } else {

                result = applicants
            }
            if (result.length < 1) {
                return []
            }
            return result;
        })
    }

    static filterApplicants = async (query) => {
        console.log(query)
        return await Applicant.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            }, {
                $match:
                    query
            }]
        )
    }


    static findByIdAndUpdateApproved = async (_id, isApproved, auth) => {
        const applicant = await Applicant.findOneAndUpdate({ _id: ObjectId(_id) }, { approvedApplication: isApproved })

        const user = await User.findOne({ _id: ObjectId(applicant.userId) })
        console.log(user)
        const email = user.email
        console.log(email)
        if (applicant && isApproved) {
            Event.emit("approved::user", (email))
        } else if (applicant && !isApproved) {
            Event.emit("declined::user", (email))
        }
        return applicant
    }

    static createApplicant = async (obj) => {

        const applicant = new Applicant(
            {
                userId: obj.userId,
                name: obj.name,
                importedDocs: [{
                    document: "cv",
                    data: obj.pathCV,
                    contentType: "application/pdf"
                },
                {
                    document: "motivationalLetter",
                    data: obj.pathML,
                    contentType: "application/pdf"

                }]
            })

        await applicant.save()
        return applicant
    }
    static filterByDepartment = async (department) => {
        return await Applicant.find({ department: department })
    }
}
