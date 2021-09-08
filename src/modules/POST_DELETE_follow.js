import { read,write } from '../lib/readAndWrite.js'

function POST_follow(req,res) {
	try {	
		let { follow_user_id } = req.body
		let follows = read( 'follow' )
		let {userId} = req.cookies.userId || { userId:1 }
		let newFollow = {
			userId,
			follow_user_id
		}
		follows.push( newFollow )
		write( 'follow', follows )
		res.status(200).json({
			status:200,
			message:'subscribed' 
		})
	} catch(e) {
		res.status(500).json({
			status:500,
			message:e.message
		})
	}
}

function DELETE_follow(req,res) {
	try {	
		if( !req.body.follow_user_id ) throw  new Error('follow_user_id is required')
		let { follow_user_id } = req.body
		let follows = read( 'follow' )
		let {userId} = req.cookies.userId || { userId:1 }
		let fl = follows.filter( el => el.follow_user_id != follow_user_id )
		if( follows.length > fl.length ){
			write( 'follow', fl )
			res.status(200).json({
				status:200,
				message:'subscription canceled' 
			})
		}else {
			res.status(404).json({
				status:404,
				message:"Not found" 
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
	POST_follow,
	DELETE_follow
}