import fs from 'fs'
import path from 'path'


const postComment = (req,res) => {
    try{
        let data = req.body
        let comment = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'comments.json'), 'utf-8')
        comment = comment ? JSON.parse(comment) : []
        let newComment = {
            file_id: data.file_id,
            user_id: req.cookies.userId,
            comment: data.comment,
            comment_id: comment.length ? comment[comment.length - 1].comment_id + 1 : 1,
            commet_time: new Date().toString()
        }
        comment.push(newComment)
        fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'comments.json'), JSON.stringify(comment, null, 4))
        res.status(201).json({status: 201, message: 'you are comment added'})
    }catch(err){
        res.status(401).json({status: 401, message: err})
    }
}

const deleteCommmet = (req,res) => {
    try {
        let data = req.body
        let comment = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'comments.json'), 'utf-8')
        comment = comment ? JSON.parse(comment) : []
        let comm = comment.findIndex(com => com.comment_id == data.comment_id)
        let coment = comment.find(val => val.comment_id == data.comment_id)
        if(req.cookies.userId == coment.user_id){
            if(comm > -1){
                comment.splice(comm,1)
            }
            fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'comments.json'), JSON.stringify(comment, null, 4))
            res.status(200).json({status: 204, message: 'you are comment deleted'})
        }else{
            res.status(401).json({status: 401, message: "you can't do that"})
        }    
    } catch (err) {
        res.status(401).json({status: 401, message: err})

    }
}


export {
    postComment,
    deleteCommmet
}