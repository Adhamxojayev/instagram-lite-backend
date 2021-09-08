import { read,write } from '../lib/readAndWrite.js'
import path from 'path'
import fs from 'fs'

function POST_avatar(req,res) {
	try {	
		let avatar_images = read( 'avatar' )
		let avatar_id = avatar_images.length ? avatar_images[ avatar_images.length-1 ].avatar_id + 1 : 1
		let have = avatar_images.find(el => el.userId == req.cookies.userId || 2)
		if(have) {
			let fileName = path.basename(have.file_link)
			fs.unlinkSync(path.join( process.cwd(),'src','upload_posts','avatar',fileName ))
			have.file_link = 'http://localhost:8080/avatar/' + req.files.fileName
		}
		else {
			let newAvatar = {
				userId:req.cookies.userId ?? 2,
				avatar_id,
				file_link:'http://localhost:8080/avatar/' + req.files.fileName
			}
			avatar_images.push(newAvatar)
		}
		res.status(200).json({
			status:200,
			message:'avatar image upload' 
		})
		write('avatar',avatar_images)
	} catch(e) {
		res.status(500).json({
			status:500,
			message:e.message
		})
	}
}

export {
	POST_avatar
}