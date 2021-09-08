import { read,write } from '../lib/readAndWrite.js'

function POST_POSTS(req,res) {
	try {	
		let posts = read( 'posts' )
		let file_id = posts.length ? posts[ posts.length-1 ].file_id + 1 : 1
		let newPost = {
			userId:req.cookies.userId || 1,
			file_id,
			file_link:'http://localhost:8080/' + req.files.fileName
		}
		posts.push(newPost)
		write('posts',posts)
		res.cookie('file_id',file_id)
		res.status(200).json({
			status:200,
			message:'file upload' 
		})
	} catch(e) {
		res.status(500).json({
			status:500,
			message:e.message
		})
	}
}

function FILE_posts(req,res) {
	try {
		if(!req.cookies.file_id ) throw new Error('video not uploaded')
		let posts = read( 'posts' )
		let { post_title,post_discrition } = req.body
		let file_id = req.cookies.file_id
		let post = posts.find( post => post.file_id == file_id )
		if(post){
			post.post_title = post_title
			post.post_discrition = post_discrition
			post.post_time = new Date().toString()
			write( 'posts', posts )
			res.status(200).json({
				status:200,
				message:'post title and description added'
			})
		}else throw new Error('try again')
	} catch(e) {
		res.status(500).json({
			status:500,
			message:e.message
		})
	}
}

export {
	POST_POSTS,
	FILE_posts
}