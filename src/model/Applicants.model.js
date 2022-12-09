import mongoose, { Schema } from 'mongoose';

export const applicantsSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        passedTest: { type: Boolean, default: null },
        approvedApplication: { type: Boolean, default: null },
        importedDocs: { type: Object },
    },
    { timestamps: { createdAt: 'created_at' } }
);

export let Applicant = mongoose.model('Applicant', applicantsSchema);
