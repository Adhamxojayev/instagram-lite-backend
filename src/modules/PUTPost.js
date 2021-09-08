import { read,write } from '../lib/readAndWrite.js'

function FILE_put(req,res) {
	try {
		if( !req.body.file_id ) throw  new Error('file_id is required')
		if( !req.body.post_title || !req.body.post_description ) throw  new Error('post_title or post_description is required')
		let posts = read( 'posts' )
		let { post_title,post_description,file_id } = req.body
		let post = posts.find( post => post.file_id == file_id )
		if(post){
			if(post_title) post.post_title = post_title
			if(post_description) post.post_description = post_description
			write( 'posts', posts )
			res.status(200).json({
				status:200,
				message:'post updated'
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
	FILE_put
}