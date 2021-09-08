import { read,write } from '../lib/readAndWrite.js'
import path from 'path'
import fs from 'fs'

function FILE_delete(req,res) {
	try {
		if( !req.body.file_id ) throw new Error('file_id is required')
		let posts = read( 'posts' )
		let { file_id } = req.body
		let Delete_post = posts.filter( post => post.file_id != file_id )
		let fileName = posts.find( post => post.file_id == file_id )
		fileName = path.basename(fileName.file_link)
		if(posts.length > Delete_post.length){
			write( 'posts', Delete_post )
			fs.unlinkSync(path.join( process.cwd(),'src','upload_posts',fileName ))
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
	FILE_delete
}