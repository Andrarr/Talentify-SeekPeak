import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import { ApplicantService } from './Applicant.service.js';

export const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, callback) => {
        callback(null, uuidv4() + '.jpg');
        req.body = file;
    },
});

export const upload = multer({
    storage: Storage,
    filefilter: (req, file, callback) => {
        if (
            (file.mimetype == 'application/pdf',
            file.mimetype == 'application/x-pdf',
            file.mimetype == 'application/msword',
            file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        ) {
            callback(null, true);
        }
        if (file.mimetype == 'application/zip') {
            callback(null, false);
            return cb(new Error('Invalid upload: fieldname should be different type! '));
        }
    },
}).array('document', 2);

export const uploader = async function (req, res) {
    upload(req, async () => {
        await ApplicantService.createApplicant({
            userId: req.auth.id,
            pathCV: req.files[0].path,
            pathML: req.files[1].path,
        });
    });
};
