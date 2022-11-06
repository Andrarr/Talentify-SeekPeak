import { Applicant } from "../model/applicants.js";
import { ObjectId } from "mongodb";
import { Event } from "../events/events.js";

export class ApplicantService {
    static findByEmail = async (email) => {
        return await Applicant.findOne({ email: email })
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
    static findByIdAndUpdateApproved = async (_id, isApproved) => {
        const applicant = await Applicant.findOneAndUpdate({ _id: ObjectId(_id) }, { approvedApplication: isApproved })
        if (applicant && isApproved) {
            Event.emit("approved::user", (applicant.email))
        } else if (applicant && !isApproved) {
            Event.emit("declined::user", (applicant.email))
        }
        return applicant
    }

    static createApplicant = async (obj) => {
        const applicant = new Applicant(
            {
                email: obj.email,
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

                }], 
                userId: obj.userId
            })

        await applicant.save()
        return applicant
    }
}
