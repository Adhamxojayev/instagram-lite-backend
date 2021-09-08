import multer from 'multer'
import path from 'path'

function file_upload() {
	const fileStrogeEngine = multer.diskStorage({
		destination: (req,file,cb)=>{
			cb(null,path.join( process.cwd(),'src','upload_posts' ))
		},
		filename: (req,file,cb)=>{
			const fileName = file.originalname.toLowerCase().split(' ').join('-');
			cb(null,fileName)
			req.files = {fileName,file}
		}
	});
	const upload  = multer({
		storage:fileStrogeEngine,
		fileFilter: (req, file, cb) => {
    		if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "video/mp4" || file.mimetype == "video/mpeg") {
      			cb(null, true);
    		} else {
      			cb(null, false);
      			return cb(new Error('Only .png, .jpg, .mp4,.m4a, .m4p, .m4b, .m4r, .m4v,  and .jpeg format allowed!'));
    		}
  		}
	})
	return upload
}

export default file_upload