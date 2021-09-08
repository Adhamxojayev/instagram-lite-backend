import { read,write } from '../lib/readAndWrite.js'
import path from 'path'
import fs from 'fs'

function FILE_delete_avatar(req,res) {
	try {
		if( !req.body.avatar_id ) throw  new Error('avatar_id is required')
		let avatar = read( 'avatar' )
		let { avatar_id } = req.body
		let Delete_avatar = avatar.filter( post => post.avatar_id != avatar_id )
		let fileName = avatar.find( post => post.avatar_id == avatar_id )
		fileName = path.basename(fileName.file_link)
		if(avatar.length > Delete_avatar.length){
			write( 'avatar', Delete_avatar )
			fs.unlinkSync(path.join( process.cwd(),'src','upload_posts','avatar',fileName ))
			res.status(200).json({
				status:200,
				message:'post deleted'
			})
		}else {
			res.status(404).json({
				status:404,
				message: 'Not found'
			})
		}
	} catch(e) {
		res.status(500).json({
			status:500,
			message:e.message
		})
	}
}

export {
	FILE_delete_avatar
}