// import multer from "multer"


// // const Storage = multer.diskStorage({
// //     destination: "upload",
// //     filename: (req, file, callback) => {
// //         callback(null, file.originalname)
// //     }
// // })
// export const upload = () => {
//     return multer({
//         storage: diskStorage({
//             destination: "upload",
//             filename: (req, file, callback) => {
//                 callback(null, file.originalname)
//             }
//         }),
//         limits: {
//             fileSize: 5 * 1024 * 1024, 
//             files: 2
//         }
//     })
// }